import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { RootStackParamList } from '../../../app/navigation/RootStackParamList';

import { globalColors, globalStyles } from '../../../ui/styles/globalStyles';
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
        <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
            {/* Header */}
            <Text style={styles.headerTitle}>Nuevo Empleado</Text>
            <Text style={styles.headerSubtitle}>
                Registra un nuevo usuario para el empleado
            </Text>

            {/* Sección principal */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Información del Empleado</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nombre *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej: Juan Pérez"
                        value={sellerInfoRequest.nombre}
                        onChangeText={v =>
                            setSellerInfoRequest({ ...sellerInfoRequest, nombre: v })
                        }
                        placeholderTextColor="#A0A0A0"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="correo@ejemplo.com"
                        value={sellerInfoRequest.email}
                        onChangeText={v =>
                            setSellerInfoRequest({ ...sellerInfoRequest, email: v })
                        }
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#A0A0A0"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Contraseña *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="••••••••"
                        value={sellerInfoRequest.password}
                        onChangeText={v =>
                            setSellerInfoRequest({ ...sellerInfoRequest, password: v })
                        }
                        secureTextEntry
                        placeholderTextColor="#A0A0A0"
                    />
                </View>
            </View>

            {/* Botón */}
            <TouchableOpacity
                style={[styles.mainButton, loading && styles.disabled]}
                onPress={handleAddSeller}
                disabled={loading}
            >
                <Text style={styles.mainButtonText}>
                    {loading ? 'Registrando...' : 'Guardar empleado'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} disabled={loading}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#F5F5F7",
    },
    content: {
        padding: 20,
    },

    // Header
    headerTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#111",
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: "#666",
        marginBottom: 20,
    },

    // Sección
    section: {
        backgroundColor: "#fff",
        padding: 18,
        borderRadius: 14,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#222",
        marginBottom: 12,
    },

    // Inputs
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: "#333",
        marginBottom: 6,
    },
    input: {
        backgroundColor: "#F8F8F8",
        borderRadius: 10,
        padding: 14,
        fontSize: 15,
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },

    // Botón principal estilo "Continue"
    mainButton: {
        backgroundColor: globalColors.primary,
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 12,
    },
    mainButtonText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "600",
    },
    disabled: {
        opacity: 0.5,
    },

    // Botón cancelar
    cancelButton: {
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        backgroundColor: globalColors.tertiary,
    },
    cancelButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
    },
});

export default AddSellerScreen;