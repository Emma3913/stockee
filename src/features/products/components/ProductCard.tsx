import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ProductInfoResponse } from '../../../core/domain/entities/Products';

type Props = {
    product: ProductInfoResponse;
};

const ProductCard = ({ product }: Props) => {
    return (
        <View style={styles.card}>

            <Image
                style={styles.image}
                // source={{ uri: `data:image/jpeg;base64,${product.base64Image}` }}
                source={{ uri: product.urlImagen }}

            />

            <View style={styles.infoContainer}>

                <Text style={styles.title}>{product.descripcion}</Text>

                <Text style={styles.text}>Código: {product.codigoBarras}</Text>
                <Text style={styles.text}>Precio: ${product.precio.toFixed(2)}</Text>
                <Text style={styles.text}>Stock: {product.stock}</Text>
            </View>

        </View>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 12,
        marginVertical: 8,
        marginHorizontal: 12,
        elevation: 3, // sombra Android
        shadowColor: '#000', // sombra iOS
        shadowOpacity: 0.15,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 3 },
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 8,
        marginRight: 12,
        backgroundColor: '#eee',
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    text: {
        fontSize: 14,
        color: '#333',
    },
    status: {
        marginTop: 6,
        fontWeight: '600',
    },
    active: {
        color: '#4CAF50',
    },
    inactive: {
        color: '#F44336',
    },
});
