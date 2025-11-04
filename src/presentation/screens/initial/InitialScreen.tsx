import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { globalStyles } from '../../../data';
import { RootStackParamList } from '../../../infrastructure/navigation/types';
import CustomButton from '../../components/CommonButton';

const InitialScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const goToProductsLoginScreen = () => {
        navigation.navigate('Login');
    }

    return (
        <View style={globalStyles.backgorund}>
            <View style={globalStyles.initialScreenCircleTop}><Text></Text></View>
            <View style={globalStyles.initialScreenImageContainerTop}>
                <Image source={require("../../assets/img/logo_stockee.png")} style={globalStyles.initialScreenImageTop} resizeMode="contain" />
            </View>
            <View style={globalStyles.initialScreenContainerTop}>
                <Text style={globalStyles.initialScreenContainerTopText}>Stockee.</Text>
                <View style={globalStyles.initialScreenSubtitleContainerTop}>
                    <Text style={globalStyles.initialScreenSubtitleContainerTopText}>
                        Keep track of your inventory in the palm of your hands
                    </Text>
                </View>
            </View>

            <View style={globalStyles.initialScreenContainerBottom}>
                <Text style={globalStyles.initialScreenText}>
                    The best app to manage your store
                </Text>
                <CustomButton
                    label="Continue"
                    onPressButton={goToProductsLoginScreen}
                    styleButton={globalStyles.initialScreenButton}
                />
            </View>
        </View>

        // <View style={globalStyles.backgorund}>
        //         <View style={globalStyles.initialScreenContainerTop}>
        //     <LottieView
        //         source={GreenLines}
        //         style={globalStyles.lottieGreenLines}
        //         autoPlay
        //         loop
        //         resizeMode="cover">
        //             <Text style={globalStyles.initialScreenContainerTopText}>Stockee</Text>
        //             <View style={globalStyles.initialScreenSubtitleContainerTop}>
        //                 <Text style={globalStyles.initialScreenSubtitleContainerTopText}>
        //                     Keep track of your inventory in the palm of your hands
        //                 </Text>
        //             </View>
        //         </View>

        //         {/* <View style={globalStyles.initialScreenImageContainerTop}>
        //         Image source={require("../assets/img/logo_stockee.png")} style={globalStyles.initialScreenImageTop} resizeMode="contain" />
        //     </View> */}

        //         <View style={[globalStyles.initialScreenContainerBottom]}>
        //             <Text style={globalStyles.initialScreenText}>The best app to manage your store</Text>
        //             <CustomButton label='Continue' onPressButton={goToProductsHomeScreen} styleButton={globalStyles.initialScreenButton} />
        //         </View>
        //     </View>
        //     </LottieView>
    )
}

export default InitialScreen