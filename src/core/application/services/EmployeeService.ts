import { Employee } from '../../domain/entities/Employee';

const employeeData: Employee[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    telefono: '555-1234',
    address: 'Av. Principal 123',
    totalPurchases: 13299.98,
  },
  {
    id: '2',
    name: 'María García',
    email: 'maria.garcia@email.com',
    telefono: '555-5678',
    address: 'Calle Secundaria 456',
    totalPurchases: 899.99,
  },
  {
    id: '3',
    name: 'Carlos López',
    email: 'carlos.lopez@email.com',
    telefono: '555-9012',
    address: 'Boulevard Central 789',
    totalPurchases: 599.98,
  },
];

export const ClienteService = {
  getAll: (): Employee[] => {
    return employeeData;
  },

  getById: (id: string): Employee | undefined => {
    return employeeData.find(c => c.id === id);
  },

  create: (employee: Omit<Employee, 'id' | 'totalPurchases'>): Employee => {
    const newCliente: Employee = {
      ...employee,
      id: (employeeData.length + 1).toString(),
      totalPurchases: 0,
    };
    employeeData.push(newCliente);
    return newCliente;
  },
};

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
