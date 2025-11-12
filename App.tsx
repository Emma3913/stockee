import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainStack from './src/infrastructure/navigation/MainStack'
import { globalStyles } from './src/presentation/theme/theme'

const App = () => {
  return (
    <View style={globalStyles.backgorund}>
      <MainStack />
    </View>
  )
}

export default App