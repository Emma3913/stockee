import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RootStackParamList } from '../../../app/navigation/RootStackParamList';
import { globalColors, globalStyles } from '../../../ui/styles/globalStyles';
import CustomButton from '../../../ui/components/CommonButton';
import { useAppStore } from '../../store/useStoreApp';
import { validateEmail } from '../../../app/utils';
import { useAuthSessionStore } from '../state/authSession.store';



const LoginScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [togglePassword, setTogglePassword] = useState(false);
    const [formError, setFormError] = useState('');

    const { loginRequest, setLoginRequest, loginWithEmailAndPassword } = useAppStore();
    const { setSession } = useAuthSessionStore();

    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setFormError('');

        if (!validateEmail(loginRequest.email)) {
            setFormError('Ingresa un correo válido.');
            return;
        }
        if (!loginRequest.password) {
            setFormError('La contraseña es obligatoria.');
            return;
        }

        setLoading(true);
        try {
            const result = await loginWithEmailAndPassword();

            if (result?.token) {
                await setSession(result);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            } else {
                setFormError('Usuario o contraseña incorrectos');
            }
        } catch (err) {
            setFormError('Usuario o contraseña incorrectos');
        } finally {
            setLoading(false);
        }
    };


    const goToRegisterScreen = () => navigation.navigate('Register');
    const goToResetPasswordScreen = () => navigation.navigate('ResetPassword');

    return (
        <View style={globalStyles.backgorund}>
            <View style={globalStyles.loginScreenContainerTop}>
                <Text style={globalStyles.loginScreenContainerTopText}>
                    Inicia sesión con tu cuenta</Text>
            </View>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                enableOnAndroid={true}
                extraScrollHeight={250}
            >
                <View style={[globalStyles.loginScreenContainerBottom]}>
                    <Text style={globalStyles.loginScreenText}>Introduzca los datos a continuación para continuar.</Text>
                    <View style={globalStyles.inputContainer}>
                        <Icon name="email" size={20} color={globalColors.dark} />
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Correo electrónico"
                            placeholderTextColor="#aaa"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={loginRequest.email}
                            onChangeText={(value) =>
                                setLoginRequest({ ...loginRequest, email: value })
                            }
                        />
                    </View>

                    <View style={globalStyles.inputContainer}>
                        <Icon name="lock" size={22} color={globalColors.dark} />
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Contraseña"
                            placeholderTextColor="#aaa"
                            secureTextEntry={!togglePassword}
                            value={loginRequest.password}
                            onChangeText={(value) =>
                                setLoginRequest({ ...loginRequest, password: value })
                            }
                        />
                        <TouchableOpacity onPress={() => setTogglePassword(!togglePassword)}>
                            <Icon name={!togglePassword ? "visibility-off" : "visibility"} size={20} color={globalColors.dark} />
                        </TouchableOpacity>
                    </View>

                    <CustomButton onPressButton={goToResetPasswordScreen}>
                        <Text style={globalStyles.forgotText}>¿Has olvidado tu contraseña?</Text>
                    </CustomButton>

                    <CustomButton onPressButton={handleLogin} styleButton={globalStyles.loginScreenButton}>
                        {loading ? (
                            <ActivityIndicator color={globalColors.light} size={22} />
                        ) : (
                            <Text style={globalStyles.signInText}>
                                iniciar sesión</Text>
                        )}
                    </CustomButton>
                    <Text style={globalStyles.dontHaveAccount}>¿No tienes ninguna cuenta?{" "}
                    </Text>
                    <CustomButton onPressButton={goToRegisterScreen}>
                        <Text style={globalStyles.createAccount}>
                            Contáctanos
                        </Text>
                    </CustomButton>

                    {/* <Text style={globalStyles.orText}>Or</Text>

                    <CustomButton styleButton={globalStyles.googleButton}>
                        <Image source={{ uri: 'https://developers.google.com/identity/images/g-logo.png', }} style={globalStyles.googleIcon} />
                        <Text style={globalStyles.googleText}>Login with Google</Text>
                    </CustomButton> */}
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default LoginScreen