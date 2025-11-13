import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../../../features/initial/screens/HomeScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigatorTab() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName = 'help';

                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'person' : 'person-outline';
                        } else if (route.name === 'Settings') {
                            iconName = focused ? 'settings' : 'settings-outline';
                        }

                        return <Icon name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#2C6BED',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: { paddingBottom: 6, height: 60 },
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
