import { body, param } from "express-validator";
import prisma from "../prisma";

export const validateBook = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("release_year").notEmpty().withMessage("Release year is required"),
  body("price").notEmpty().withMessage("Price is required"),
  body("total_pages").notEmpty().withMessage("Total page is required"),
  body("category_id")
    .notEmpty()
    .withMessage("Category ID is required")
    .custom(async (value) => {
      const category = await prisma.category.findUnique({
        where: {
          id: Number(value),
        },
      });
      if (!category) {
        throw new Error("Category not found");
      }
    }),
  body("image").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Image is required");
    }
    return true;
  }),
];

export const validateUpdateBook = [
  param("id").custom(async (value, { req }) => {

    const book = await prisma.book.findUnique({
      where: {
        id: Number(value),
      },
    });

    if (!book) {
      console.log(book)
      throw new Error("Book not found");
    }
  }),
  body("total_pages"),
  body("category_id").custom(async (value) => {
    if(!value) return
    const category = await prisma.category.findUnique({
      where: {
        id: Number(value),
      },
    });
    if (!category) {
      throw new Error("Category not found");
    }
  }),
];
