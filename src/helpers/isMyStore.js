export function isMyStore(reqID, bdID) {
  if (bdID !== reqID) {
    const error = new Error("No estas autorizado para ver esa informacion");
    error.statusCode = 400;
    throw error;
  }
}
