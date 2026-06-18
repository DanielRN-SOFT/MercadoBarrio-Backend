export default function verifyStringFields(fields) {
  Object.entries(fields).forEach(([key, value]) => {
    if (!value || typeof value !== "string" || !value.trim()) {
      const error = new Error(
        `Todos los campos son obligatorios y deben ser texto`,
      );
      error.statusCode = 400;
      throw error;
    }
  });
}
