export type PaginatedResponse<T> = {
  data: T[];
  currentPage: number;
  nextPage: number | null;
  previousPage: number | null;
  totalItems: number;
  totalPages: number;
};

export type PaginatedResponseShoppingCart<T> = {
  data: T | null;
  currentPage: number;
  nextPage: number | null;
  previousPage: number | null;
  totalItems: number;
  totalPages: number;
};
