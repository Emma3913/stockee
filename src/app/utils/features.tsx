import { GoogleIcon } from '../../ui/components/GoogleIcons';
import { globalColors } from '../../ui/styles/globalStyles';

export const features = [
  {
    name: 'Productos',
    route: 'Products',
    icon: <GoogleIcon name="package_2" variant="rounded" size={60} />,
    color: globalColors.quaternary,
  },
  {
    name: 'Ventas',
    route: 'Sales',
    icon: <GoogleIcon name="sell" variant="rounded" size={60} />,
    color: globalColors.quaternary,
  },
  {
    name: 'Empleados',
    route: 'Selllers',
    icon: <GoogleIcon name="group" variant="rounded" size={60} />,
    color: globalColors.secondary,
  },
  {
    name: 'Inventario',
    route: 'Inventory',
    icon: <GoogleIcon name="inventory_2" variant="rounded" size={60} />,
    color: globalColors.tertiary,
  },
  {
    name: 'Carrio de compras',
    route: 'ShoppingCart',
    icon: <GoogleIcon name="shopping_cart" variant="rounded" size={60} />,
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
