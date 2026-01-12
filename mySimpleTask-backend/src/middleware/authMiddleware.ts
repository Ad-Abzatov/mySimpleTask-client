import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { JWT } from "../../keys";

interface IdField {
  id: number | string
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({message: "Нет токена"})
    }

    const decoded = jwt.verify(token, JWT.JWT_SECRET);
    const {id} = decoded as IdField;
    res.locals.userId = id;
    next();
  } catch (e) {
    res.status(401).json({message: "111", e}) // message: "Не авторизован (третий)"
  }
}

export default authMiddleware
