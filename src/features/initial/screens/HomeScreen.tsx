import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { globalColors, globalStyles } from '../../../ui/styles/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../app/navigation/RootStackParamList';
import CustomButton from '../../../ui/components/CommonButton';
import { useAuthSessionStore } from '../../auth/state/authSession.store';
import { useEffect } from 'react';
import { useRegisterDeviceToken } from '../../../app/hooks/useRegisterDeviceToken';

const HomeScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { clearSession } = useAuthSessionStore();
    const { user } = useAuthSessionStore();

    useRegisterDeviceToken(user?.token!);

    const features = [
        { name: 'Productos', route: 'Products', icon: <FontAwesomeIcon name="cube" size={60} color={globalColors.semidark} /> },
        { name: 'Ventas', route: 'Sales', icon: <FontAwesomeIcon name="tags" size={60} color={globalColors.semidark} /> },
        { name: 'Empleados', route: 'Selllers', icon: <FontAwesomeIcon name="users" size={60} color={globalColors.semidark} /> },
        { name: 'Inventario', route: 'Inventory', icon: <FontAwesomeIcon name="cubes" size={60} color={globalColors.semidark} /> },
    ];


    return (
        <View style={globalStyles.containerOptions}>
            <View style={globalStyles.header}>
                <CustomButton>
                    <FontAwesomeIcon name="th-large" size={22} color={globalColors.semidark} />
                </CustomButton>
                <Text style={{ fontWeight: '900' }}>Stockee</Text>
                <CustomButton>
                    <FontAwesomeIcon name="user-circle" size={22} color={globalColors.semidark} />
                </CustomButton>
            </View>

            <View style={globalStyles.grid}>
                {features.map((feature, index) => (
                    <CustomButton
                        key={index}
                        styleButton={globalStyles.cardOptions}
                        onPressButton={() => navigation.navigate(feature.route as any)}
                    >
                        <Text style={globalStyles.icon}>{feature.icon}</Text>
                    </CustomButton>
                ))}
            </View>

            <View style={{ backgroundColor: globalColors.light, }}>
                <Text></Text>
            </View>


            <CustomButton onPressButton={clearSession}>
                <Text>Cerrar Sesion</Text>
            </CustomButton>
        </View>
    );
}

export default HomeScreen;
