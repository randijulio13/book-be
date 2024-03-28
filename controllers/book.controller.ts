import { Request, RequestHandler, Response } from "express";
import prisma from "../prisma";
import { determineBookThickness } from "../utils/utils";
import { validator } from "../validator";
import path from "path";
import url from "url";
import { UPLOAD_PATH } from "../uploads/book.upload";

export const getBook: RequestHandler = async (req: Request, res: Response) => {
  const books = await prisma.book.findMany();

  return res.json({
    message: "success",
    data: books,
  });
};

export const postBook: RequestHandler = async (req: Request, res: Response) => {
  const valid = validator(req);
  if (!valid.isEmpty()) {
    return res.status(422).json({ errors: valid.mapped() });
  }

  const { title, description, release_year, price, total_pages, category_id } =
    req.body;

  const thickness = determineBookThickness(total_pages);

  const image_url = url.format({
    protocol: req.protocol,
    host: req.get("host"),
    pathname: path.join(UPLOAD_PATH, String(req.file?.filename)),
  });

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
  const errors = validator(req).mapped();
  if (Object.keys(errors).length > 0) {
    return res.status(422).json({ errors });
  }

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
  await prisma.book.delete({
    where: {
      id: Number(id),
    },
  });
  res.json({ message: "success" });
};
