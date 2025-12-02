import axiosInstance from "../../../app/config/network/axiosIntance";

export async function sendFCMToken(token: string): Promise<string> {
  try {
    const response = await axiosInstance.post<{ message: string }>(
      'firebase/save-token',
      { token },
    );

    return response.data.message;
  } catch (error: any) {
    if (error.response) {
      const message =
        error.response.data?.message ||
        `Error ${error.response.status}: ${error.response.statusText}`;
      console.error('Server error:', message);
      throw new Error(message);
    } else if (error.request) {
      console.error('No response from server:', error.request);
      throw new Error('No se pudo conectar con el servidor');
    } else {
      console.error('Unexpected error:', error.message);
      throw new Error('Error inesperado al procesar la solicitud');
    }
  }
}