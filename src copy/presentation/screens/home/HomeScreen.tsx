import { View, Text } from 'react-native'
import React from 'react'
import { globalColors, globalStyles } from '../../theme/theme'

const HomeScreen = () => {
    return (
        <View style={globalStyles.backgorund}>
            <Text style={{ color: globalColors.light, fontWeight: '900', fontSize: 30 }}>HomeScreen</Text>
        </View>
    )
}

export default HomeScreen