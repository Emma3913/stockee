import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import MainStack from './src/app/navigation/MainStack'
import { globalStyles } from './src/ui/styles/globalStyles'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AuthProvider } from './src/app/providers/AuthContext'

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={globalStyles.backgorund}>
        <AuthProvider>
          <MainStack />
        </AuthProvider>
      </View>
    </GestureHandlerRootView>
  )
}

export default App