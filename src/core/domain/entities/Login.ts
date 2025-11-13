export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  rol: string;
  uuidTienda: string;
  nombre: string;
};
