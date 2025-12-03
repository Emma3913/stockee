import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { globalColors, globalStyles } from '../../../ui/styles/globalStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TextInput } from 'react-native-gesture-handler'
import CustomButton from '../../../ui/components/CommonButton'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../app/navigation/RootStackParamList'
import CustomModal from '../../../ui/components/CustomModal'
import { validateEmail } from '../../../app/utils'
import { useAppStore } from '../../store/useStoreApp'

const ResetPasswordScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false)

    const { resetPasswordRequest, setResetPasswordRequest, resetPasswordByEmail } = useAppStore();


    const handleResetPasswordByEmail = async () => {
        if (!validateEmail(resetPasswordRequest.email)) {
            <CustomModal title='Ingresa un correo válido' isVisible={openModal} onPressButton={() => setOpenModal(false)} />
            return;
        }
        setLoading(true);
        try {
            const response = await resetPasswordByEmail();
            <CustomModal title='Se ha enviado un correo con tu nueva contraseña' isVisible={openModal} onPressButton={() => setOpenModal(false)} />

            setTimeout(() => {
                if (response.message) {
                    navigation.navigate('Login');
                }
            }, 3000)

        } catch (err: any) {
            console.log("cath", err.message);
            <CustomModal title='Ocurrió un error al enviar el correo' isVisible={openModal} onPressButton={() => setOpenModal(false)} />
        } finally {
            setLoading(false);
        }
    };



    return (
        <View style={globalStyles.backgorund}>
            <View style={globalStyles.resetPasswordScreenContainerTop}>
                <Text style={globalStyles.resetPasswordScreenContainerTopText}>
                    Reestablecer contreseña</Text>
                <View style={globalStyles.initialScreenSubtitleContainerTop}>
                    <Text style={globalStyles.initialScreenSubtitleContainerTopText}>

                    </Text>
                </View>
            </View>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                enableOnAndroid={true}
                extraScrollHeight={250}
            >
                <View style={[globalStyles.resetPasswordScreenContainerBottom]}>
                    <Text style={globalStyles.resetPasswordScreenText}>Ingresa tu correo electronico para reestablecer tu contraseña</Text>

                    <View style={globalStyles.inputContainer}>
                        <Icon name="email" size={22} color={globalColors.dark} />
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Correo electrónico"
                            placeholderTextColor="#aaa"
                            keyboardType='email-address'
                            value={resetPasswordRequest.email}
                            onChangeText={(value) =>
                                setResetPasswordRequest({ ...resetPasswordRequest, email: value })
                            }
                        />
                    </View>
                    <CustomButton onPressButton={handleResetPasswordByEmail} styleButton={globalStyles.resetPasswordScreenButton}>
                        {loading ? (
                            <ActivityIndicator color={globalColors.light} size={22} />
                        ) : (
                            <Text style={globalStyles.signInText}>Enviar información</Text>
                        )}
                    </CustomButton>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default ResetPasswordScreen