import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { RootStackParamList } from '../../../app/navigation/RootStackParamList';

import { globalStyles } from '../../../ui/styles/globalStyles';
import { useAppStore } from '../../store/useStoreApp';

const AddSellerScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { registrerNewSeller, sellerInfoRequest, setSellerInfoRequest } = useAppStore();
    const [loading, setLoading] = useState(false);

    const handleAddSeller = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const result = await registrerNewSeller();

            if (!result?.uuidTienda) {
                navigation.navigate('Selllers');
                return;
            }

            navigation.navigate('Selllers');
        } catch (err) {
            console.error('Error al registrar vendedor:', err);
            // TODO: Agregra el CustomModal.
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={globalStyles.containerAddEmployeeScreen} contentContainerStyle={globalStyles.scrollContent}>
            <Text style={globalStyles.title}>Nuevo Empleado</Text>
            <Text style={globalStyles.subtitle}>Registra un nuevo usuario para el empleado</Text>
            <View style={globalStyles.form}>
                <Text style={globalStyles.label}>Nombre *</Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Ej: Juan Pérez"
                    value={sellerInfoRequest.nombre}
                    onChangeText={(value) => setSellerInfoRequest({ ...sellerInfoRequest, nombre: value })}
                    placeholderTextColor="#999"
                />
                <Text style={globalStyles.label}>Email *</Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder="correo@ejemplo.com"
                    value={sellerInfoRequest.email}
                    onChangeText={(value) => setSellerInfoRequest({ ...sellerInfoRequest, email: value })}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#999"
                />
                <Text style={globalStyles.label}>Contraseña *</Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Contraseña"
                    value={sellerInfoRequest.password}
                    onChangeText={(value) => setSellerInfoRequest({ ...sellerInfoRequest, password: value })}
                    secureTextEntry
                    placeholderTextColor="#999"
                />
                {/* <Text style={globalStyles.label}>Rol</Text>
                <TextInput
                    style={[globalStyles.input, globalStyles.disabledInput]}
                    value="EMPLEADO"
                    editable={false}
                /> */}
                {/* <Text style={globalStyles.label}>Tienda</Text> */}
                {/* <TextInput
                    style={[globalStyles.input, globalStyles.disabledInput]}
                    value="Tienda la Poblanita"
                    editable={false}
                /> */}
                <TouchableOpacity
                    style={[globalStyles.submitButton, loading && globalStyles.disabledButton]}
                    onPress={handleAddSeller}
                    disabled={loading}
                >
                    <Text style={globalStyles.submitButtonText}>
                        {loading ? 'Registrando...' : 'Guardar vemdedor'}
                    </Text>
                </TouchableOpacity>

                {/* {error ? <Text style={globalStyles.error}>{error}</Text> : null}
                {success ? <Text style={globalStyles.success}>{success}</Text> : null} */}

                {/* <TouchableOpacity
                    style={globalStyles.cancelButton}
                    onPress={handleCancel}
                    disabled={loading}
                >
                    <Text style={globalStyles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity> */}
            </View>
        </ScrollView>
    );
}

export default AddSellerScreen;