import { View, Text, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native'
import React, { useState } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RootStackParamList } from '../../../infrastructure/navigation/types';
import { globalColors, globalStyles } from '../../../data';
import CustomButton from '../../components/CommonButton';

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [togglePassword, setTogglePassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleLogin = () => {
        setLoading(true)
        console.log("Login...")
        setTimeout(() => {
            setLoading(false)
        }, 2000);

    }

    const goToProductsRegisterScreen = () => {
        navigation.navigate('Register');
    }

    return (
        <View style={globalStyles.backgorund}>
            <View style={globalStyles.loginScreenContainerTop}>
                <Text style={globalStyles.loginScreenContainerTopText}>Register now!</Text>
                {/* <View style={globalStyles.initialScreenSubtitleContainerTop}>
                    <Text style={globalStyles.initialScreenSubtitleContainerTopText}>
                        Please enter your information
                    </Text>
                </View> */}
            </View>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                enableOnAndroid={true}
                extraScrollHeight={250}
            >
                <View style={[globalStyles.loginScreenContainerBottom]}>
                    <Text style={globalStyles.loginScreenText}>Please enter your information</Text>

                    <View style={globalStyles.inputContainer}>
                        <Icon name="badge" size={20} color={globalColors.primary} />
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Full Name"
                            placeholderTextColor="#aaa"
                            keyboardType="default"
                            autoCapitalize="none"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={globalStyles.inputContainer}>
                        <Icon name="email" size={22} color={globalColors.primary} />
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Email Address"
                            placeholderTextColor="#aaa"
                            keyboardType='email-address'
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={globalStyles.inputContainer}>
                        <Icon name="lock" size={22} color={globalColors.primary} />
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Password"
                            placeholderTextColor="#aaa"
                            secureTextEntry={!togglePassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setTogglePassword(!togglePassword)}>
                            <Icon name={!togglePassword ? "visibility-off" : "visibility"} size={20} color={globalColors.primary} />
                        </TouchableOpacity>
                    </View>

                    <CustomButton onPressButton={handleLogin} styleButton={globalStyles.loginScreenButton}>
                        {loading ? (
                            <ActivityIndicator color={globalColors.light} size={22} />
                        ) : (
                            <Text style={globalStyles.signInText}>Register</Text>
                        )}
                    </CustomButton>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default RegisterScreen