import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

import { globalStyles } from './src/ui/styles/globalStyles'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './src/app/navigation/StackNavigator'
import { useAuthSessionStore } from './src/features/auth/state/authSession.store'
import { useRegisterDeviceToken } from './src/app/hooks/useRegisterDeviceToken'
import { initializeNotifications } from './src/app/providers/notification/initializeNotifications'

const App = () => {
  const { initializeAuth, isLoading } = useAuthSessionStore();

  useEffect(() => {
    initializeAuth();
    initializeNotifications();
  }, []);


  // useRegisterDeviceToken();

  if (isLoading) {
    return (
      <View style={[globalStyles.backgorund, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
