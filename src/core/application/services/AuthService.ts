// import { BACKEND_URL } from '../../../../config/env';

// const backendUrl = BACKEND_URL;
const backendUrl = 'http://localhost:8080';

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const url = `${backendUrl}/auth/login`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const text = await response.text();
    let data = null;
    try {
      data = JSON.parse(text);
    } catch (e) {}
    if (!response.ok) {
      throw new Error(data?.message || 'Login failed');
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function sendPasswordResetEmail(email: string) {
  const url = `${backendUrl}/auth/reestablecer-password`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Error al solicitar cambio de contraseña');
  }

  return await response.json();
}

export async function registerUsuario({
  email,
  password,
  nombre,
  estatus = true,
  rolId = 1,
  tiendaId = 1,
}: {
  email: string;
  password: string;
  nombre: string;
  estatus?: boolean;
  rolId?: number;
  tiendaId?: number;
}) {
  try {
    const url = `${backendUrl}/auth/registrarUsuario`;
    const body = {
      nombre,
      correo: email,
      password,
      estatus,
      rolForUsuario: { id: rolId },
      tiendaForUsuario: { id: tiendaId },
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });
    const text = await response.text();
    let data = null;
    try {
      data = JSON.parse(text);
    } catch (e) {
      // No es JSON
    }
    if (!response.ok) {
      throw new Error(data?.message || 'Registro fallido');
    }
    return data;
  } catch (error) {
    throw error;
  }
}
