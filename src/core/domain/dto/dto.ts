export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  token: string;
  user: {
    id: string;
    username: string;
    email?: string;
    nombre?: string;
    rol?: string;
    // otros campos necesarios
  };
}
