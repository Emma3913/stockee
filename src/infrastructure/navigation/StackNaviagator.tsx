import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import InitialScreen from '../../presentation/screens/initial/InitialScreen';
import HomeScreen from '../../presentation/screens/home/HomeScreen';
import LoginScreen from '../../presentation/screens/login/LoginScreen';
import RegisterScreen from '../../presentation/screens/register/RegisterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            animation: 'fade',
        }}>
            <Stack.Screen
                name="Initial"
                component={InitialScreen}
            />
            <Stack.Screen
                name="Home"
                component={HomeScreen}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
            />
        </Stack.Navigator>
    )
}

export default StackNavigator