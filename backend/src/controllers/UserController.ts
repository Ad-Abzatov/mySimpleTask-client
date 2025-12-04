import { NextFunction, Request, Response } from "express"
import ApiError from "../error/ApiError";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT } from "../../keys";
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

const generateJwt = (id: number, login: string) => {
  return jwt.sign(
    {id, login},
    JWT.JWT_SECRET,
    {expiresIn: '1h'}
  );
}

class UserController {
  async registration (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const {login, password} = req.body;

      const existingUser = await prisma.user.findUnique({
        where: {
          login: login
        }
      })

      if (existingUser) {
        return next(ApiError.badUser('Пользователь существует'))
      }

      const hashedPassword = await bcrypt.hash(password, 5);

      const newUser = await prisma.user.create({
        data: {
          login: login,
          password: hashedPassword,
        }
      });

      res.status(201).json({message: 'Пользователь зарегистрирован', newUser})
  }

  async login (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const {login, password} = req.body;

    const user = await prisma.user.findUnique({
      where: {
        login: login
      }
    })

    if (!user) {
      return next(ApiError.badUser('Пользователь не найден'))
    }

    const passwordResult = await bcrypt.compare(password, user.password);

    if (!passwordResult) {
      return next(ApiError.badUser('Неверный пароль'))
    }

    const token = generateJwt(user.id, user.login);

    res.status(201).json({message: 'Успешный вход', token});
  }

  async check (req: Request, res: Response, _next: NextFunction): Promise<Response | void> {
    const token = generateJwt(res.locals.userId, res.locals.login);
    return res.json({token});
    // const a = res.locals.userId;
    // return res.json({message: "good", a}); // message: "good"
  }

  async header (req: Request, res: Response, _next: NextFunction): Promise<Response | void> {
    const headerName = req.headers.fuck;
    return res.json({headerName});
  }

}

export default UserController
