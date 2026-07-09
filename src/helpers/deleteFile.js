import fs from "fs";
import path from "path";

const deleteFile = (relativePath) => {
  if (!relativePath) return;
  const fullPath = path.join(process.cwd(), relativePath);
  fs.unlink(fullPath, (err) => {
    if (err && err.code !== "ENOENT")
      console.error("Error eliminando archivo:", err);
  });
};

export default deleteFile;
