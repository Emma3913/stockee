export type ProductInfoRequest = {
  codigoBarras: string;
  descripcion: string;
  precio: number;
  stock: number;
  urlImagen?: string | null;
  estatus?: boolean;
  base64Image: string;
};

export type ProductInfoResponse = {
  id: number;
  codigoBarras: string;
  descripcion: string;
  precio: number;
  stock: number;
  urlImagen: string;
  estatus: boolean;
  fechaCreacion: string;
  uuidTienda: string;
  message?: string;
  success?: boolean;
};
