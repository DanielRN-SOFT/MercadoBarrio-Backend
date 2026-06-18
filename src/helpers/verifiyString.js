export default function verifyString(field, message) {
  if (!field || typeof field !== "string" || !field.trim()) {
    const error = new Error(message);
    error.statusCode = 400;
    throw error;
  }
}
