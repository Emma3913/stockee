export type ShoppingCartResponse = {
    info: Info;
    items: ProductShoppingCartResponse[];
}

export type Info = {
    totalPagar: number
}

export type ProductShoppingCartResponse = {
    id: number;
    cantidad: number;
    codigoBarras: string;
    descripcion: string;
    precio: number;
    stock: number;
    urlImagen: string;
}

export type AddProductToShoppingCartRequest = {
    codigoBarras: string;
    cantidad: number;
}

export type AddProductToShoppingCartResponse = {
    mensaje: string;
}