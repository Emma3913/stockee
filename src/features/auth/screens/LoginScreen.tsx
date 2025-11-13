import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RootStackParamList } from '../../../app/navigation/types';
import { globalColors, globalStyles } from '../../../ui/styles/globalStyles';
import CustomButton from '../../../ui/components/CommonButton';
import { login } from '../../../core/application/services/AuthService';
import { useAuth } from '../../../app/providers/AuthContext';


const LoginScreen = () => {
    const [togglePassword, setTogglePassword] = useState(false);
    const { dispatch, state } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState('');

    const validateEmail = (value: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    };

    const handleLogin = async () => {
        setFormError('');
        if (!validateEmail(email)) {
            setFormError('Ingresa un correo válido.');
            return;
        }
        if (!password) {
            setFormError('La contraseña es obligatoria.');
            return;
        }
        setLoading(true);
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const result = await login({ email: email.trim(), password });
            if (result && result.token) {
                dispatch({ type: 'LOGIN_SUCCESS', payload: result });
                navigation.navigate('Home');
            } else {
                dispatch({ type: 'LOGIN_ERROR', payload: 'Usuario o contraseña incorrectos' });
            }
        } catch (err: any) {
            dispatch({ type: 'LOGIN_ERROR', payload: 'Usuario o contraseña incorrectos' });
        } finally {
            setLoading(false);
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };



    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const goToProductsRegisterScreen = () => {
        navigation.navigate('Register');
    }
    const goToHomeScreen = () => {
        navigation.navigate('Home');
    }
    const goToResetPasswordScreen = () => {
        navigation.navigate('ResetPassword');
    }

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
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={globalStyles.inputContainer}>
                        <Icon name="lock" size={22} color={globalColors.dark} />
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Contraseña"
                            placeholderTextColor="#aaa"
                            secureTextEntry={!togglePassword}
                            value={password}
                            onChangeText={setPassword}
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
                    <CustomButton onPressButton={goToProductsRegisterScreen}>
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