enum THICKNESS {
  THIN = "tipis",
  MODERATE = "sedang",
  THICK = "tebal",
}

export const determineBookThickness = (totalPage: number): string => {
  if (totalPage <= 100) {
    return THICKNESS.THIN;
  } else if (totalPage <= 200) {
    return THICKNESS.MODERATE;
  } else {
    return THICKNESS.THIN;
  }
};

export const stringToSlug = (str: string) => {
  // Convert to lowercase
  let slug = str.toLowerCase();

  // Remove special characters, replace spaces with hyphens
  slug = slug.replace(/[^a-z0-9\s-]/g, "");
  slug = slug.replace(/\s+/g, "-");

  // Remove leading and trailing hyphens
  slug = slug.replace(/^-+|-+$/g, "");

  return slug;
};
