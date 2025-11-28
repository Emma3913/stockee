import React, { useCallback, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
// import { ClienteService } from '../../../core/application/services/SellerService';
import { RootStackParamList } from '../../../app/navigation/RootStackParamList';
import { globalStyles } from '../../../ui/styles/globalStyles';
import { useAppStore } from '../../store/useStoreApp';
import { SkeletonCardSellers } from '../components/SkeletonCardSellers';

const SellersScreen = () => {
    const [loading, setLoading] = useState(false);
    const { paginatedSellersInfoResponse, getAllSellersByStore } = useAppStore();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const loadSellers = useCallback(async () => {
        setLoading(true);
        try {
            await getAllSellersByStore();
        } catch (error) {
            console.error("Error cargando productos:", error);
        } finally {
            setLoading(false);
        }
    }, [getAllSellersByStore]);

    useFocusEffect(
        useCallback(() => {
            loadSellers();
        }, [loadSellers])
    );

    return (
        <View style={globalStyles.containerEmployeeScreen}>
            <Text style={globalStyles.title}>Empleados</Text>
            <Text style={globalStyles.subtitle}>Gestión de Empleados registrados</Text>

            <TouchableOpacity
                style={globalStyles.addButton}
                onPress={() => navigation.navigate('AddSeller')}
            >
                <Text style={globalStyles.addButtonText}>Agregar Empleado</Text>
            </TouchableOpacity>

            {loading ? (
                <FlatList
                    data={paginatedSellersInfoResponse.items}
                    keyExtractor={(item) => item.toString()}
                    renderItem={() => <SkeletonCardSellers />}
                    contentContainerStyle={globalStyles.listContent}
                />
            ) : (
                <FlatList
                    data={paginatedSellersInfoResponse.items}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={globalStyles.card}
                            onPress={() => navigation.navigate('DetailSeller', { idSeller: item.id! })}
                        >
                            <View style={globalStyles.cardHeader}>
                                <Text style={globalStyles.clienteNombre}>{item.nombre}</Text>
                            </View>
                            <Text style={globalStyles.clienteEmail}>{item.email}</Text>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={globalStyles.listContent}
                />
            )}

        </View>
    );
}

export default SellersScreen;
