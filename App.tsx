import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalStyles } from './src/data'
import MainStack from './src/infrastructure/navigation/MainStack'

const App = () => {
  return (
    <View style={globalStyles.backgorund}>
      <MainStack />
    </View>
  )
}

export default App