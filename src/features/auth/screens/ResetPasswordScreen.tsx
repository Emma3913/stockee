import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { globalColors, globalStyles } from '../../../ui/styles/globalStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TextInput } from 'react-native-gesture-handler'
import CustomButton from '../../../ui/components/CommonButton'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../app/navigation/RootStackParamList'
import { resetPasswordByEmail } from '../../../core/application/services/AuthService'

const ResetPasswordScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

    const handleSubmit = async () => {
        setError('');
        setMessage('');
        if (!validateEmail(email)) {
            setError('Ingresa un correo válido.');
            return;
        }
        setLoading(true);
        try {
            const response = await resetPasswordByEmail(email.trim());
            setMessage(response || 'Se ha enviado un correo con tu nueva contraseña.');

            setTimeout(() => {
                if (response != null) {
                    navigation.navigate('Login');
                }

            }, 3000)
        } catch (err: any) {
            console.log("cath", err.message)
            setError(err.message || 'Ocurrió un error al enviar el correo.');
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
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    {error ? <Text style={{ color: "red", textAlign: 'center' }}>{error}</Text> : null}
                    {message ? <Text style={{ color: "green", textAlign: 'center' }}>{message}</Text> : null}
                    <CustomButton onPressButton={handleSubmit} styleButton={globalStyles.resetPasswordScreenButton}>
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