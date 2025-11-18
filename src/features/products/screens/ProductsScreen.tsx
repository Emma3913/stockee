import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../data/productsDataSource';

const ProductsScreen = () => {

    const [products, setProducts] = useState<any[]>([]);

    const loadProducts = async () => {
        try {
            const response = await fetchProducts(
                "8115df28-69dc-4e8c-a06f-4d53128ed39a"
            );

            setProducts(response.items);

        } catch (error) {
            console.log("error loadProducts", error);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Productos</Text>

            <FlatList
                data={products}
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
