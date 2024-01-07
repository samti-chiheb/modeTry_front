import * as jose from "jose";

class JWTHandler {
  secret: Uint8Array;
  algorithm = "HS256";
  expirationTime: string;

  constructor() {
    const secret = import.meta.env.VITE_JWT_SECRET;
    const expirationTime = import.meta.env.VITE_JWT_EXP;

    if (!secret || !expirationTime) {
      throw new Error("JWT configuration is missing!");
    }

    this.secret = new TextEncoder().encode(secret);
    this.expirationTime = expirationTime;
  }

  async generateToken(payload: object) {
    const token = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: this.algorithm })
      .setIssuedAt()
      .setExpirationTime(this.expirationTime)
      .sign(this.secret);

    return token;
  }

  async verifyToken(token: string) {
    try {
      const result = await jose.jwtVerify(token, this.secret);
      return result.payload;
    } catch (error: any) {
      if (error.code === "ERR_JWT_EXPIRED") {
        throw new Error("Token has expired");
      }
      throw new Error("Invalid token");
    }
  }

  decodeToken(token: string) {
    const payload = jose.decodeJwt(token);
    return payload;
  }
}

export default JWTHandler;
