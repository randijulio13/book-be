import prisma from "../lib/prisma";
import { Book } from "../prisma/generated/client";

export interface BookFilter {
  title: any;
  minYear: any;
  maxYear: any;
  minPage: any;
  maxPage: any;
  sortByTitle: any;
  category_id?: number;
}

export const findBookById = async (id: number) => {
  return await prisma.book.findUnique({
    where: {
      id,
    },
  });
};

export const deleteBookById = async (id: number) => {
  return await prisma.book.delete({
    where: {
      id,
    },
  });
};

export const getBookWithFilter = async (filter: BookFilter) => {
  const where: any = {};
  if (filter.title) {
    where.title = {
      startsWith: "%" + filter.title + "%",
      mode: "insensitive",
    };
  }

  if (filter.minYear || filter.maxYear) {
    where.release_year = {};
  }

  if (filter.minYear) {
    where.release_year.gte = Number(filter.minYear);
  }

  if (filter.maxYear) {
    where.release_year.lte = Number(filter.maxYear);
  }

  if (filter.minPage || filter.maxPage) {
    where.total_pages = {};
  }

  if (filter.minPage) {
    where.total_pages.gte = Number(filter.minPage);
  }

  if (filter.maxPage) {
    where.total_pages.lte = Number(filter.maxPage);
  }

  const orderBy: any = {};
  if (filter.sortByTitle) {
    orderBy.title = filter.sortByTitle;
  }

  return await prisma.book.findMany({
    where,
    orderBy,
  });
};
