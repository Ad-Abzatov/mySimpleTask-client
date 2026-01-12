import { NextFunction, Request, Response } from "express"
import ApiError from "../error/ApiError"

const ErrorHandlingMiddleware = (err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({message: err.message})
  }
  return res.status(500).json({message: "Ошибка"})
}

export default ErrorHandlingMiddleware
