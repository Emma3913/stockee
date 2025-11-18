export const fetchProducts = async (
    uuidTienda: string,
    page: number = 0,
    size: number = 10
) => {
    try {
        const url = `https://unkneaded-deepeningly-sandra.ngrok-free.dev/productos?uuidTienda=${uuidTienda}&page=${page}&size=${size}`;


        const token = "eyJhbGciOiJIUzI1NiJ9.eyJub21icmUiOiJNaXNpZnVzIFByb2dyYW1lciIsInJvbCI6IkFETUlOIiwic3ViIjoibWlzaWZ1c3Byb2dyYW1lcjIzQGdtYWlsLmNvbSIsImlhdCI6MTc2MzQzODE5OCwiZXhwIjoxNzYzNDQxNzk4fQ.bnQ4duTsKdPW4S0ayldLqlsSM6eXpIEPX10eqhM8dGk";

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error(`Error al obtener productos: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetchProducts:", error);
        throw error;
    }
};
