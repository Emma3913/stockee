import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { globalStyles } from '../../../ui/styles/globalStyles';
import CustomButton from '../../../ui/components/CommonButton';
import { RootStackParamList } from '../../../app/navigation/types';

const InitialScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const goToProductsLoginScreen = () => {
        navigation.navigate('Login');
    }

    return (
        <View style={globalStyles.backgorund}>
            <View style={globalStyles.initialScreenCircleTop}><Text></Text></View>
            {/* <View style={globalStyles.initialScreenImageContainerTop}>
                <Image source={require("../../assets/img/logo_stockee.png")} style={globalStyles.initialScreenImageTop} resizeMode="contain" />
            </View> */}
            <View style={globalStyles.initialScreenContainerTop}>
                <Text style={globalStyles.initialScreenContainerTopText}>Stockee.</Text>
                <View style={globalStyles.initialScreenSubtitleContainerTop}>
                    <Text style={globalStyles.initialScreenSubtitleContainerTopText}>
                        Mantén el control de tu inventario en la palma de tu mano.
                    </Text>
                </View>
            </View>

            <View style={globalStyles.initialScreenContainerBottom}>
                <Text style={globalStyles.initialScreenText}>
                    La mejor aplicación para gestionar tu tienda
                </Text>
                <CustomButton
                    label="Continuar"
                    onPressButton={goToProductsLoginScreen}
                    styleButton={globalStyles.initialScreenButton}
                />
            </View>
        </View>
    )
}

export default InitialScreen