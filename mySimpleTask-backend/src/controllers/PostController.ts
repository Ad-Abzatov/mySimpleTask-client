import { Request, Response } from "express";
import ApiError from "../error/ApiError";
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

class PostController {
  async getAll (_req: Request, res: Response): Promise<Response | void> {
    try {
      const posts = await prisma.post.findMany();
      return res.send(posts);
    } catch (error) {
      ApiError.badRequest(`Ошибка: ${error}`)
    }
  }

  async getUserRecords (req: Request, res: Response): Promise<Response | void> {
    try {
      const {authorId} = req.params;
      const a = Number(authorId);
      const userRecords = await prisma.post.findMany({where: {authorId: a}});
      return res.send(userRecords);
    } catch (error) {
      ApiError.badRequest(`Ошибка: ${error}`)
    }
  }

  async testRequest (req: Request, res: Response): Promise<Response | void> {
    try {
      // const a = req.params.a;
      // const b = Number(a);
      return res.send(`${req.params.a}`);
    } catch (error) {
      ApiError.badRequest(`Ошибка: ${error}`)
    }
  }

  async create (req: Request, res: Response) {
    const posts = await prisma.post.create({data: {
      title: req.body.title,
      author: {
        connect: {id: req.body.authorId}
      }
    }});
    return res.send(posts);
  }

  async delete (req: Request, res: Response) {
    const posts = await prisma.post.delete({where: {id: parseInt(req.params.postId)}})
    return res.send(posts);
  }

  async update (req: Request, res: Response) {
    const postId = parseInt(req.params.postId);
    const posts = await prisma.post.update({
      where: {
        id: postId,
      },
      data: req.body,
    });
  return res.send(posts);
  }

}

export default PostController
