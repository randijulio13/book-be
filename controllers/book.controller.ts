import prisma from "../lib/prisma";
import { Request, RequestHandler, Response } from "express";
import { determineBookThickness, stringToSlug } from "../utils/utils";
import { postBookValidate } from "../request/book.request";
import { deleteImage, getPublicIdFromUrl, upload } from "../lib/cloudinary";

export const getBook: RequestHandler = async (req: Request, res: Response) => {
  const books = await prisma.book.findMany();

  return res.json({
    message: "success",
    data: books,
  });
};

export const postBook: RequestHandler = async (req: Request, res: Response) => {
  const valid = postBookValidate(req.body);

  if (!valid) {
    return res.status(400).json({ message: "bad request" });
  }

  if (!req.file) return res.json(400).json({ message: "bad request" });

  const { title, description, release_year, price, total_pages, category_id } =
    req.body;

  const category = await prisma.category.findUnique({
    where: {
      id: Number(category_id),
    },
  });

  if (!category) {
    return res.status(400).json({ message: "bad request" });
  }

  let cloudinaryRes: any = await upload(req.file);
  const thickness = determineBookThickness(total_pages);
  let image_url = cloudinaryRes.url;
  console.log({ image_url });

  await prisma.book.create({
    data: {
      title,
      description,
      release_year: Number(release_year),
      price,
      total_pages: Number(total_pages),
      category_id: Number(category_id),
      thickness,
      image_url,
    },
  });

  res.json({
    message: "success",
  });
};

export const updateBook: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const data: { [key: string]: any } = {};

  const fields = [
    "title",
    "description",
    "release_year",
    "price",
    "total_pages",
    "category_id",
  ];

  fields.forEach((field) => {
    if (body[field]) {
      data[field] = body[field];
    }
  });

  if (data.total_pages) {
    data.thickness = determineBookThickness(data.total_pages);
  }
  if (data.release_year) {
    data.release_year = Number(data.release_year);
  }
  if (data.category_id) {
    data.category_id = Number(data.category_id);
  }
  if (data.total_pages) {
    data.total_pages = Number(data.total_pages);
  }

  await prisma.book.update({
    where: {
      id: Number(id),
    },
    data,
  });

  res.json({ message: "success" });
};

export const deleteBook: RequestHandler = async (
  req: Request,
  res: Response
) => {
  let { id } = req.params;
  const book = await prisma.book.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!book) {
    return res.status(404).json({
      message: "data not found",
    });
  }

  await deleteImage(String(getPublicIdFromUrl(String(book?.image_url))));
  await prisma.book.delete({
    where: {
      id: Number(id),
    },
  });

  res.json({ message: "success" });
};
