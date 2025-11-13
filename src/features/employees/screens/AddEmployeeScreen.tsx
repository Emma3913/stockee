import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { RootStackParamList } from '../../../app/navigation/types';
import { registerUsuario } from '../../../core/application/services/AuthService';
import { globalStyles } from '../../../ui/styles/globalStyles';

const AddEmployeeScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rolId, setRolId] = useState(1); // Solo admin
    const [tiendaId, setTiendaId] = useState(1); // Solo tienda 1
    const estatus = true; // oculto, siempre true
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleAgregar = async () => {
        if (!nombre || !email || !password) {
            setError('Por favor completa los campos obligatorios');
            return;
        }
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await registerUsuario({ nombre, email, password, estatus, rolId, tiendaId });
            setSuccess('Usuario registrado correctamente');
            setNombre('');
            setEmail('');
            setPassword('');

            setTimeout(() => {
                navigation.goBack();
            }, 1500);
        } catch (err: any) {
            setError(err.message || 'Error al registrar');
        }
        setLoading(false);
    };

    const handleCancel = () => {
        navigation.goBack();
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
                    value={nombre}
                    onChangeText={setNombre}
                    placeholderTextColor="#999"
                />
                <Text style={globalStyles.label}>Email *</Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#999"
                />
                <Text style={globalStyles.label}>Contraseña *</Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#999"
                />
                <Text style={globalStyles.label}>Rol</Text>
                <TextInput
                    style={[globalStyles.input, globalStyles.disabledInput]}
                    value="EMPLEADO"
                    editable={false}
                />
                <Text style={globalStyles.label}>Tienda</Text>
                <TextInput
                    style={[globalStyles.input, globalStyles.disabledInput]}
                    value="Tienda la Poblanita"
                    editable={false}
                />
                <TouchableOpacity
                    style={[globalStyles.submitButton, loading && globalStyles.disabledButton]}
                    onPress={handleAgregar}
                    disabled={loading}
                >
                    <Text style={globalStyles.submitButtonText}>
                        {loading ? 'Registrando...' : 'Guardar Cliente'}
                    </Text>
                </TouchableOpacity>

                {error ? <Text style={globalStyles.error}>{error}</Text> : null}
                {success ? <Text style={globalStyles.success}>{success}</Text> : null}

                <TouchableOpacity
                    style={globalStyles.cancelButton}
                    onPress={handleCancel}
                    disabled={loading}
                >
                    <Text style={globalStyles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default AddEmployeeScreen;