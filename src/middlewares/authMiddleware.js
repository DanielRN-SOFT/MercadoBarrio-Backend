import jwt from "jsonwebtoken";
import prisma from "../../prismaClient.js";

// protect.js — solo verifica identidad, válido para TODOS los roles
export const protect = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401);
    throw new Error("No autorizado, no hay token!");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true, roleId: true },
    });

    if (!user) {
      res.status(401);
      throw new Error("No autorizado, usuario no encontrado");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("No autorizado, token fallido!");
  }
};

// solo para rutas de tendero
export const attachStore = async (req, res, next) => {
  const store = await prisma.store.findUnique({
    where: { userId: req.user.id },
    select: { id: true },
  });

  if (!store) {
    res.status(403);
    throw new Error("No tienes una tienda asociada");
  }

  req.store = store;
  next();
};
export const isGrocer = async (req, res, next) => {
  const rol_tendero = await prisma.role.findFirst({
    where: {
      name: "Grocer",
    },
  });

  if (!rol_tendero) {
    res.status(500);
    throw new Error("Error en el servidor ese rol no existe");
  }

  const isGrocer = req.user.roleId == rol_tendero.id;
  if (!isGrocer) {
    res.status(401);
    throw new Error("No autorizado, debe ser Tendero");
  }

  next();
};

export const IsAdmin = async (req, res, next) => {
  const rol_admin = await prisma.role.findFirst({
    where: {
      name: "Admin",
    },
  });

  if (!rol_admin) {
    res.status(500);
    throw new Error("Error en el servidor, no existe ese rol");
  }

  const isAdmin = req.user.roleId == rol_admin.id;
  console.log(isAdmin);
  if (!isAdmin) {
    res.status(401);
    throw new Error("No autorizado, debe ser ADMIN");
  }

  next();
};
