import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './RootStackParamList';
// Screens
import InitialScreen from '../../features/initial/screens/InitialScreen';
import LoginScreen from '../../features/auth/screens/LoginScreen';
import RegisterScreen from '../../features/auth/screens/RegisterScreen';
import SellersScreen from '../../features/sellers/screens/SellersScreen'

import HomeScreen from '../../features/initial/screens/HomeScreen';
import ProductsScreen from '../../features/products/screens/ProductsScreen';
import SalesScreen from '../../features/sales/screens/SalesScreen';
import InventoryScreen from '../../features/inventory/screens/InventoryScreen';
import ResetPasswordScreen from '../../features/auth/screens/ResetPasswordScreen';
import AddProductsScreen from '../../features/products/screens/AddProductsScreen';
import { useAuthSessionStore } from '../../features/auth/state/authSession.store';
import CameraScreen from '../../ui/screens/CameraScannerScreen';
import AddSellerScreen from '../../features/sellers/screens/AddSellerScreen';
import DetailSeller from '../../features/sellers/screens/DetailSellerScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();


const StackNavigator = () => {
    const { isAuthenticated } = useAuthSessionStore();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'fade',
            }}
        >
            {isAuthenticated ? (
                <>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Selllers" component={SellersScreen} />
                    <Stack.Screen name="AddSeller" component={AddSellerScreen} />
                    <Stack.Screen name="DetailSeller" component={DetailSeller} />
                    <Stack.Screen name="Products" component={ProductsScreen} />
                    <Stack.Screen name="AddProducts" component={AddProductsScreen} />
                    <Stack.Screen name="Inventory" component={InventoryScreen} />
                    <Stack.Screen name="Sales" component={SalesScreen} />
                    <Stack.Screen name="Camera" component={CameraScreen} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Initial" component={InitialScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default StackNavigator