import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
// Screens
import InitialScreen from '../../features/initial/screens/InitialScreen';
import LoginScreen from '../../features/auth/screens/LoginScreen';
import RegisterScreen from '../../features/auth/screens/RegisterScreen';
import EmployeesScreen from '../../features/employees/screens/EmployeesScreen';
import AddEmployeeScreen from '../../features/employees/screens/AddEmployeeScreen';
import DetailEmployee from '../../features/employees/screens/DetailEmployee';
import AppNavigatorTab from './tabs/AppNavigatorTab';
import HomeScreen from '../../features/initial/screens/HomeScreen';
import ProductsScreen from '../../features/products/screens/ProductsScreen';
import SalesScreen from '../../features/sales/screens/SalesScreen';
import InventoryScreen from '../../features/inventory/screens/InventoryScreen';
import ResetPasswordScreen from '../../features/auth/screens/ResetPasswordScreen';
import { useAuth } from '../providers/AuthContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {

    const { state } = useAuth();


    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            animation: 'fade',
        }}>
            <Stack.Screen
                name="Initial"
                component={InitialScreen}
            />
            {!state.isAuthenticated && (
                <>
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                    />
                    <Stack.Screen
                        name="ResetPassword"
                        component={ResetPasswordScreen}
                    />
                    <Stack.Screen
                        name="Register"
                        component={RegisterScreen}
                    />
                </>
            )}

            <Stack.Screen
                name="Home"
                component={HomeScreen}
            />
            <Stack.Screen
                name="Employees"
                component={EmployeesScreen}
            />
            <Stack.Screen
                name="AddEmployee"
                component={AddEmployeeScreen}
            />
            <Stack.Screen
                name="DetailEmployee"
                component={DetailEmployee}
            />
            <Stack.Screen
                name="AppNavigatorTab"
                component={AppNavigatorTab}
            />
            <Stack.Screen
                name="Products"
                component={ProductsScreen}
            />
            <Stack.Screen
                name="Inventory"
                component={InventoryScreen}
            />
            <Stack.Screen
                name="Sales"
                component={SalesScreen}
            />
        </Stack.Navigator>
    )
}

export default StackNavigator