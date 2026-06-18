export default function isNumber(id) {
  if (isNaN(id)) {
    const error = new Error("El id proporcionado no es válido");
    error.statusCode = 400;
    throw error;
  }
}
