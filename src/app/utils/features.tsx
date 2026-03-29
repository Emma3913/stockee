import { JSX } from 'react';
import { GoogleIcon } from '../../ui/components/GoogleIcons';
import { globalColors } from '../../ui/styles/globalStyles';

type Role = 'ADMIN' | 'SELLER' | 'PROPIETARIO' | 'VENDEDOR';

type Feature = {
  name: string;
  route: string;
  roles: Role[];
  icon: JSX.Element;
  color: string;
};

export const features: Feature[] = [
  {
    name: 'Productos',
    route: 'Products',
    roles: ['PROPIETARIO', 'ADMIN', 'VENDEDOR'],
    icon: <GoogleIcon name="package_2" variant="rounded" size={60} />,
    color: globalColors.quaternary,
  },

  // {
  //   name: 'Reporte ventas',
  //   route: 'SalesReport',
  //   roles: ['ADMIN', 'PROPIETARIO'],
  //   icon: <GoogleIcon name="assignment" variant="rounded" size={60} />,
  //   color: globalColors.tertiary,
  // },
  {
    name: 'Empleados',
    route: 'Selllers',
    roles: ['ADMIN', 'PROPIETARIO'],
    icon: <GoogleIcon name="group" variant="rounded" size={60} />,
    color: globalColors.secondary,
  },
  {
    name: 'Venta',
    route: 'Sales',
    roles: ['PROPIETARIO', 'ADMIN', 'VENDEDOR'],
    icon: <GoogleIcon name="point_of_sale" variant="rounded" size={60} />,
    color: globalColors.primary,
  },
];

export const featuresStock = [
  {
    name: 'Total ventas',
    route: 'Total ventas',
    icon: <GoogleIcon name="attach_money" variant="rounded" size={60} />,
    color: globalColors.tertiary,
  },
  {
    name: 'Inventario',
    route: 'Sales',
    icon: <GoogleIcon name="inventory_2" variant="rounded" size={60} />,
    color: globalColors.quaternary,
  },
];
