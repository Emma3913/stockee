import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './StackNaviagator'
import { GestureHandlerRefContext } from '@react-navigation/stack'

const MainStack = () => {
    return (
        <GestureHandlerRefContext value={null}>
            <NavigationContainer>
                <StackNavigator />
            </NavigationContainer>
        </GestureHandlerRefContext>
    )
}

export default MainStack