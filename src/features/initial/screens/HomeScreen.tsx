import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { globalColors, globalStyles } from '../../../ui/styles/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../app/navigation/RootStackParamList';
import CustomButton from '../../../ui/components/CommonButton';
import { useAuthSessionStore } from '../../auth/state/authSession.store';

const HomeScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { clearSession } = useAuthSessionStore();

    const features = [
        { name: 'Productos', route: 'ProductsMain', icon: <FontAwesomeIcon name="cube" size={60} color={globalColors.semidark} /> },
        { name: 'Ventas', route: 'Sales', icon: <FontAwesomeIcon name="tags" size={60} color={globalColors.semidark} /> },
        { name: 'Empleados', route: 'Employees', icon: <FontAwesomeIcon name="users" size={60} color={globalColors.semidark} /> },
        { name: 'Inventario', route: 'Inventory', icon: <FontAwesomeIcon name="cubes" size={60} color={globalColors.semidark} /> },
    ];


    return (
        <View style={globalStyles.containerOptions}>
            <View style={globalStyles.header}>
                <Text style={globalStyles.title}>Punto de Venta</Text>
                <Text style={globalStyles.subtitle}>Aqui puedes gestionar tu tienda</Text>
            </View>

            <View style={globalStyles.grid}>
                {features.map((feature, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[globalStyles.cardOptions]}
                        onPress={() => navigation.navigate(feature.route as any)}
                    >
                        <Text style={globalStyles.icon}>{feature.icon}</Text>
                        {/* <Text style={[globalStyles.cardTitle]}>
                            {feature.name}
    `                   </Text> */}
                    </TouchableOpacity>
                ))}
            </View>
            <CustomButton onPressButton={clearSession}>
                <Text>Cerrar Sesion</Text>
            </CustomButton>
        </View>
    );
}

export default HomeScreen;
