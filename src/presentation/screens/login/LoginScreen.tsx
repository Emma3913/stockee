import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RootStackParamList } from '../../../infrastructure/navigation/types';
import CustomButton from '../../components/CommonButton';
import { globalColors, globalStyles } from '../../theme/theme';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [togglePassword, setTogglePassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleLogin = () => {
        setLoading(true)
        console.log("Login...")
        setTimeout(() => {
            goToHomeScreen();
            setLoading(false)
        }, 2000);

    }

    const goToProductsRegisterScreen = () => {
        navigation.navigate('Register');
    }
    const goToHomeScreen = () => {
        navigation.navigate('Home');
    }

    return (
        <View style={globalStyles.backgorund}>
            <View style={globalStyles.loginScreenContainerTop}>
                <Text style={globalStyles.loginScreenContainerTopText}>Login with your account</Text>
            </View>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                enableOnAndroid={true}
                extraScrollHeight={250}
            >
                <View style={[globalStyles.loginScreenContainerBottom]}>
                    <Text style={globalStyles.loginScreenText}>Please enter the details below to continue</Text>
                    <View style={globalStyles.inputContainer}>
                        <Icon name="email" size={20} color={globalColors.light} />
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Email Address"
                            placeholderTextColor="#aaa"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={globalStyles.inputContainer}>
                        <Icon name="lock" size={22} color={globalColors.light} />
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Password"
                            placeholderTextColor="#aaa"
                            secureTextEntry={!togglePassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setTogglePassword(!togglePassword)}>
                            <Icon name={!togglePassword ? "visibility-off" : "visibility"} size={20} color={globalColors.light} />
                        </TouchableOpacity>
                    </View>

                    <Text style={globalStyles.forgotText}>Forgot Password?</Text>

                    <CustomButton onPressButton={handleLogin} styleButton={globalStyles.loginScreenButton}>
                        {loading ? (
                            <ActivityIndicator color={globalColors.light} size={22} />
                        ) : (
                            <Text style={globalStyles.signInText}>Sign In</Text>
                        )}
                    </CustomButton>

                    <Text style={globalStyles.dontHaveAccount}>Don't Have Any Account?{" "}
                        <CustomButton onPressButton={goToProductsRegisterScreen}>
                            <Text style={globalStyles.createAccount}>
                                Create Account
                            </Text>
                        </CustomButton>
                    </Text>

                    <Text style={globalStyles.orText}>Or</Text>

                    <CustomButton styleButton={globalStyles.googleButton}>
                        <Image source={{ uri: 'https://developers.google.com/identity/images/g-logo.png', }} style={globalStyles.googleIcon} />
                        <Text style={globalStyles.googleText}>Login with Google</Text>
                    </CustomButton>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default LoginScreen