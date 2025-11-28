import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, RouteProp, useRoute, NavigationProp } from '@react-navigation/native';
// import { ClienteService } from '../../../core/application/services/SellerService';
import { RootStackParamList } from '../../../app/navigation/RootStackParamList';
import { globalStyles } from '../../../ui/styles/globalStyles';

type RouteProps = {
    params: {
        id: string;
    };
};

const DetailSellerScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    // const params = useRoute<RouteProp<RootStackParamList, 'DetailEmployee'>>().params;

    // const employee = ClienteService.getById(params.idEmployee);

    // if (!employee) {
    //     return (
    //         <View style={globalStyles.containerDetailEmployeeScreen}>
    //             <Text style={globalStyles.errorText}>Cliente no encontrado</Text>
    //             <TouchableOpacity style={globalStyles.button} onPress={() => navigation.goBack()}>
    //                 <Text style={globalStyles.buttonText}>Volver</Text>
    //             </TouchableOpacity>
    //         </View>
    //     );
    // }

    return (
        <ScrollView style={globalStyles.containerDetailEmployeeScreen}>
            <View style={globalStyles.cardDetail}>
                {/* <Text style={globalStyles.title}>{employee.name}</Text> */}

                <View style={globalStyles.section}>
                    <Text style={globalStyles.label}>Email:</Text>
                    {/* <Text style={globalStyles.value}>{employee.email}</Text> */}
                </View>

                <View style={globalStyles.section}>
                    <Text style={globalStyles.label}>Teléfono:</Text>
                    {/* <Text style={globalStyles.value}>{employee.telefono}</Text> */}
                </View>

                <View style={globalStyles.section}>
                    <Text style={globalStyles.label}>Dirección:</Text>
                    {/* <Text style={globalStyles.value}>{employee.address}</Text> */}
                </View>

                <View style={globalStyles.section}>
                    <Text style={globalStyles.label}>Total en ventas:</Text>
                    {/* <Text style={globalStyles.totalValue}>${employee.address.toFixed(2)}</Text> */}
                    {/* <Text style={globalStyles.totalValue}>${employee.totalPurchases}</Text> */}
                </View>

                <View style={globalStyles.section}>
                    <Text style={globalStyles.label}>ID del empleado:</Text>
                    {/* <Text style={globalStyles.value}>{employee.id}</Text> */}
                </View>
            </View>

            <View style={globalStyles.actions}>
                <TouchableOpacity
                    style={[globalStyles.button, globalStyles.editButton]}
                    onPress={() => console.log('Funcionalidad de editar próximamente')}
                >
                    <Text style={globalStyles.buttonText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[globalStyles.button, globalStyles.ventasButton]}
                // onPress={() => navigation.navigate('Ventas')}
                >
                    <Text style={globalStyles.buttonText}>Ver Ventas</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default DetailSellerScreen;
