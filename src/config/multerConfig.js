import multer from "multer";
import path from "path";
import fs from "fs";

const createStorage = (folder) => {
  const uploadPath = path.join("uploads", folder);
  fs.mkdirSync(uploadPath, { recursive: true });

  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, uniqueName);
    },
  });
};

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Solo se permiten imágenes (jpg, png, webp)"), false);
};

export const uploadStorePhoto = multer({
  storage: createStorage("stores"),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const uploadProductPhoto = multer({
  storage: createStorage("products"),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
