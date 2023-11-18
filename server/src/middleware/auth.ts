import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as asyncHandler from "express-async-handler";
import { userGroups } from "../config/userGroups";
import { User } from "../entity/User";
import { dataSource } from "../config/connnection";

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
        const user = await dataSource.getRepository(User).findOneBy({
          id: parseInt(decoded.id),
        });
        if (user) {
          next();
        } else {
          res.status(401);
          throw new Error("Unauthorized");
        }
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Unauthorized");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Unauthorized");
    }
  }
);
