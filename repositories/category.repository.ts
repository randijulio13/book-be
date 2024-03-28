import prisma from "../lib/prisma";

export const getCategoryById = async (id: number) => {
  return await prisma.category.findUnique({
    where: {
      id,
    },
  });
};
