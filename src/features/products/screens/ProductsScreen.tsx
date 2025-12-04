import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../data/productsDataSource';
import { useAppStore } from '../../store/useStoreApp';
import { useAuthSessionStore } from '../../auth/state/authSession.store';
import { useFocusEffect } from '@react-navigation/native';

const ProductsScreen = () => {
    const [loading, setLoading] = useState(false);
    const { paginatedProductsInfoResponse, getAllProductsByStore } = useAppStore();

    const loadProducts = useCallback(async () => {
        setLoading(true);
        try {
            await getAllProductsByStore();
        } catch (error) {
            console.error("Error cargando productos:", error);
        } finally {
            setLoading(false);
        }
    }, [getAllProductsByStore]);

    useFocusEffect(
        useCallback(() => {
            loadProducts();
        }, [loadProducts])
    );


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Análisis de stock</Text>

            <FlatList
                data={paginatedProductsInfoResponse.data}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => (
                    <ProductCard product={item} />
                )}
                contentContainerStyle={{ paddingVertical: 10 }}
            />
        </View>
    );
};

export default ProductsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingTop: 30,
        paddingHorizontal: 12,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 10,
        color: '#222',
    },
});
