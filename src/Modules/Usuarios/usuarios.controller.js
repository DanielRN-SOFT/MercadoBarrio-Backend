import bcrypt from "bcryptjs";
import { UserStatus } from "../../../generated/prisma/index.js";
import prisma from "../../../prismaClient.js";
import verifyFields from "../../helpers/verifyStringFields.js";
import verifyNumberID from "../../helpers/verifyNumberID.js";

export const getUsers = async (req, res, next) => {
  try {
    // Obtenemos la pagina desde el query param, por defecto pagina 1
    const page = req.query.page || 1;
    const limit = parseInt(process.env.PAGINATION_LIMIT) || 10;
    // Si estamos en página 1: skip=0, página 2: skip=10, página 3: skip=20...
    const skip = (page - 1) * limit;

    // Filtros opcionales por query params: ?status=Active&roleId=2&search=juan
    const { status, roleId, search } = req.query;
    const where = {};

    if (status) {
      // Validar que el valor coincida con el enum, para no pasar basura a Prisma
      if (!Object.values(UserStatus).includes(status)) {
        const error = new Error("Estado inválido");
        error.statusCode = 400;
        throw error;
      }
      where.status = status;
    }

    if (roleId) {
      const parsedRoleId = parseInt(roleId);
      verifyNumberID(parsedRoleId);
      where.roleId = parsedRoleId;
    }

    if (search) {
      // MySQL no soporta el argumento `mode` de Prisma (eso es solo para
      // PostgreSQL/MongoDB). En MySQL, `contains` ya es insensible a
      // mayúsculas por defecto si la columna usa una collation *_ci
      // (ej. utf8mb4_general_ci / utf8mb4_unicode_ci), que es lo usual.
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
      ];
    }

    // Ejectuar dos peticiones a la vez, para optimizar la velocidad
    const [total, users] = await Promise.all([
      // FIX: contaba prisma.role.count() en vez de prisma.user.count(),
      // lo que rompía la paginación (total/totalPages reflejaban roles, no usuarios)
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          status: true,
          role: true,
        },
      }),
    ]);
    res.json({
      data: users,
      meta: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    // verificar que el id sea un numero
    verifyNumberID(id);
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        status: true,
        roleId: true,
      },
    });
    if (user) {
      res.json({ data: user });
    } else {
      // FIX: usaba res.status(500) para un "no encontrado", debería ser 404
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, phone, password, roleId } = req.body;

    // Verificar que los campos de texto lleguen y sean string
    verifyFields({ name, email, phone, password });

    const parsedRoleId = parseInt(roleId);
    verifyNumberID(parsedRoleId);

    // Confirmar que el rol exista antes de crear el usuario
    const role = await prisma.role.findUnique({ where: { id: parsedRoleId } });
    if (!role) {
      const error = new Error("El rol indicado no existe");
      error.statusCode = 404;
      throw error;
    }

    // NOTA: ajusta el costo de hash (10) o el esquema de hashing si ya
    // tienes un helper propio para esto en el proyecto
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        roleId: parsedRoleId,
        status: UserStatus.Active,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        status: true,
        roleId: true,
      },
    });

    res
      .status(201)
      .json({ data: newUser, message: "Usuario creado exitosamente" });
  } catch (error) {
    if (error.code === "P2002") {
      error.statusCode = 409;
      error.message = "Ese email ya esta registrado en el sistema";
    }
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const id = parseInt(req.params.id);

    verifyNumberID(id);
    // Verificar que todos los campos si lleguen y sean string
    verifyFields({ name, email, phone });
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      // FIX: el mensaje decía "Rol no encontrado" (copy-paste), y no
      // tenía statusCode, así que caía como 500 en vez de 404
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    }
    const updatedUser = await prisma.user.update({
      data: { name, email, phone },
      where: { id },
    });
    res
      .status(200)
      .json({ data: updatedUser, message: "Usuario editado exitosamente" });
  } catch (error) {
    if (error.code === "P2002") {
      error.statusCode = 409;
      error.message = "Ese email ya esta registrado en el sistema";
    }
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    verifyNumberID(id);
    const user = await prisma.user.findUnique({ where: { id } });
    if (user) {
      const deletedUser = await prisma.user.update({
        data: {
          status: UserStatus.Inactive,
        },
        where: {
          id,
        },
      });
      res.json({
        data: deletedUser,
        message: "Usuario eliminado correctamente",
      });
    } else {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const restoreUser = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    verifyNumberID(id);
    const user = await prisma.user.findUnique({ where: { id } });
    if (user) {
      const restoredUser = await prisma.user.update({
        data: {
          status: UserStatus.Active,
        },
        where: {
          id,
        },
      });
      res.json({
        data: restoredUser,
        message: "Usuario restablecido correctamente",
      });
    } else {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
