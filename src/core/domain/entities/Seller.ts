export type SellerInfoRequest = {
    nombre: string;
    email: string;    
    password: string;
}

export type SellerInfoResponsePaginated = Omit<SellerInfoRequest, 'password'> & {
  id: number;
};

export type SellerInfoResponse = {
    token: string;
    rol: string;
    tiendaId: number;
    uuidTienda: string;
    nombre: string;
}