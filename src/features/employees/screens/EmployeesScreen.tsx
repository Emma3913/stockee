import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ClienteService } from '../../../core/application/services/EmployeeService';
import { RootStackParamList } from '../../../app/navigation/RootStackParamList';
import { globalStyles } from '../../../ui/styles/globalStyles';

const EmployeesScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const clientes = ClienteService.getAll();


    return (
        <View style={globalStyles.containerEmployeeScreen}>
            <Text style={globalStyles.title}>Empleados</Text>
            <Text style={globalStyles.subtitle}>Gestión de Empleados registrados</Text>

            <TouchableOpacity
                style={globalStyles.addButton}
                onPress={() => navigation.navigate('AddEmployee')}
            >
                <Text style={globalStyles.addButtonText}>Agregar Empleado</Text>
            </TouchableOpacity>

            <FlatList
                data={clientes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={globalStyles.card}
                        onPress={() => navigation.navigate('DetailEmployee', { idEmployee: item.id })}
                    >
                        <View style={globalStyles.cardHeader}>
                            <Text style={globalStyles.clienteNombre}>{item.id}</Text>
                        </View>
                        <Text style={globalStyles.clienteEmail}>{item.email}</Text>
                        <Text style={globalStyles.clienteTelefono}>{item.telefono}</Text>
                        <View style={globalStyles.cardFooter}>
                            <Text style={globalStyles.clienteDireccion}>{item.address}</Text>
                            <Text style={globalStyles.totalCompras}>
                                ${item.totalPurchases.toFixed(2)}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
                contentContainerStyle={globalStyles.listContent}
            />

            {/* <TouchableOpacity style={globalStyles.backButton} onPress={() => navigation.goBack()}>
                <Text style={globalStyles.backButtonText}>← Volver al Home</Text>
            </TouchableOpacity> */}
        </View>
    );
}

export default EmployeesScreen;
