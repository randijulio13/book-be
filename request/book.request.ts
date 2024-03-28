import prisma from "../lib/prisma";

interface PostBookRequest {
  title: String;
  description: String;
  release_year: Number;
  price: String;
  total_pages: Number;
  category_id: Number;
}

export const postBookValidate = async (request: PostBookRequest) => {
  const { title, description, release_year, price, total_pages, category_id } =
    request;

  return !(
    !title ||
    !description ||
    !release_year ||
    !price ||
    !total_pages ||
    !category_id
  );
};
