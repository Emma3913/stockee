export type PaginatedResponse<T> = {
  items: T[];
  currentPage: number;
  nextPage: number | null;
  previousPage: number | null;
  totalItems: number;
  totalPages: number;
};