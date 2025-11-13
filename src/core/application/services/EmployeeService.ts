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
