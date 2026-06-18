import jwt from "jsonwebtoken";
import prisma from "../../prismaClient.js";

export const protect = async (req, res, next) => {
  let token;

  // Lee el jwt token de la cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          name: true,
          email: true,
          roleId: true,
        },
      });
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("No autorizado, token fallido !");
    }
  } else {
    res.status(401);
    throw new Error("No autorizado, no hay token!");
  }
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
