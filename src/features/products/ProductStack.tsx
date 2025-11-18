import React from 'react';
import ProductsScreen from '../../features/products/screens/ProductsScreen';
import AddProductsScreen from '../../features/products/screens/AddProductsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

export type ProductsStackParamList = {
    ProductsMain: undefined;
    AddProducts: undefined;
};

const Tab = createBottomTabNavigator();

export default function ProductsTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#4CAF50',
                tabBarInactiveTintColor: '#9E9E9E',

                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = '';

                    if (route.name === 'ProductList') {
                        iconName = focused ? 'list' : 'list-outline';
                    }
                    else if (route.name === 'AddProduct') {
                        iconName = focused ? 'add-circle' : 'add-circle-outline';
                    }

                    return <Icon name={iconName} size={26} color={color} />;
                },
            })}
        >
            <Tab.Screen name="ProductList" component={ProductsScreen} />
            <Tab.Screen name="AddProduct" component={AddProductsScreen} />
        </Tab.Navigator>
    );
}