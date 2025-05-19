import jwt_decode from "jwt-decode";

export function getUserPayloadFromToken(token) {
  try {
    const payload = jwt_decode(token);
    const user = {
      id: payload.id,
      firstName: payload.firstName,
      lastName: payload.lastName,
      documentType: payload.documentType,
      documentNumber: payload.documentNumber,
      phone: payload.phone,
      email: payload.email,
      status: payload.status,
      role: payload.role,
      image: payload.image,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
    };
    return { user };
  } catch (error) {
    return null;
  }
}