import { Request, RequestHandler, Response } from "express";
import prisma from "../lib/prisma";
import { getBookWithFilter } from "../repositories/book.repository";
import { getCategoryById } from "../repositories/category.repository";

export const getCategory: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const category = await prisma.category.findMany();

  res.json({
    message: "success",
    data: category,
  });
};

export const postCategory: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { name } = req.body;

  const category = await prisma.category.create({
    data: { name },
  });

  res.json({
    message: "success",
    data: {
      id: category.id,
      name: category.name,
    },
  });
};

export const patchCategory: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { name } = req.body;
  const { id } = req.params;

  await prisma.category.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
    },
  });

  res.json({
    message: "success",
  });
};

export const deleteCategory: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const category = await getCategoryById(Number(id));
    if (!category) {
      return res.status(404).json({
        message: "data not found",
      });
    }

    await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "success",
    });
  } catch (err) {
    res.status(400).json({
      message: "server error",
    });
  }
};

export const getBooksByCategoryId: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const { title, minYear, maxYear, minPage, maxPage, sortByTitle } = req.query;

  const books = await getBookWithFilter({
    title,
    minYear,
    maxYear,
    minPage,
    maxPage,
    sortByTitle,
    category_id: Number(id),
  });

  res.json({
    message: "success",
    data: books,
  });
};
