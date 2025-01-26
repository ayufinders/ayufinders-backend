import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Middleware to verify JWT
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1]; // Extract the token after "Bearer "

  try {
    const secretKey = process.env.JWT_SECRET as string; // Ensure JWT_SECRET is defined in your environment variables
    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ success: false, message: "Forbidden: Invalid or expired token" });
    return;
  }
};
