import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../../features/initial/screens/HomeScreen';
import { UserProfileScreen } from '../../../features/user/screens/UserProfileScreen';
import { CustomDrawer } from '../../../ui/components/CustomDrawer';
import ProductsScreen from '../../../features/products/screens/ProductsScreen';

export type HomeDrawerParamList = {
  HomeMain: undefined;
  Profile: undefined;
  ProductsScreen: undefined;
};

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

export const HomeDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerPosition: 'right',
      }}
      drawerContent={props => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="HomeMain" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={UserProfileScreen} />
    </Drawer.Navigator>
  );
};
