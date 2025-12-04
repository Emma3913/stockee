import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { globalColors, globalStyles } from '../../../ui/styles/globalStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import CustomButton from '../../../ui/components/CommonButton'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../app/navigation/RootStackParamList'
import CustomModal from '../../../ui/components/CustomModal'
import { validateEmail } from '../../../app/utils'
import { useAppStore } from '../../store/useStoreApp'
import { ModalState } from '../../../app/types'

const ResetPasswordScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false)
    const [modalData, setModalData] = useState<ModalState>({
        isVisible: false,
        title: "",
        description: "",
        subDescription: "",
        buttonTitle: "Aceptar",
        modalWithoutButton: false,
        goToAnotherPage: false,
    });

    const { resetPasswordRequest, setResetPasswordRequest, resetPasswordByEmail } = useAppStore();


    const handleResetPasswordByEmail = async () => {
        if (!validateEmail(resetPasswordRequest.email)) {
            setModalData({
                isVisible: true,
                title: 'Correo inválido',
                description: 'El correo electrónico no es válido, vuelva a intentarlo por favor.',
                buttonTitle: "Aceptar",
                modalWithoutButton: false,
            });
            return;
        }
        setLoading(true);
        try {
            const response = await resetPasswordByEmail();
            setModalData({
                isVisible: true,
                title: 'Contraseña enviada',
                description: 'Se ha enviado un correo con tu nueva contraseña.',
                // description: response.mensaje,
                buttonTitle: "Aceptar",
                modalWithoutButton: false,

            });


        } catch (err: any) {
            console.log("cath", err.message);
            setModalData({
                isVisible: true,
                title: 'Ocurrió un error',
                description: 'Por favor intenta en unos minutos. Es probable que el error se deba al servicio',
                buttonTitle: "Aceptar",
                modalWithoutButton: false,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        setModalData(prev => ({ ...prev, isVisible: false }))
        navigation.navigate('Login');
    }



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
            <CustomModal
                {...modalData}
                onPressButton={handleCloseModal}
            />

        </View>
    )
}

export default ResetPasswordScreen