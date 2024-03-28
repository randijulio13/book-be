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
