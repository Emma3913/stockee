import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { ProductInfoResponse } from '../../../core/domain/entities/Products';

type ProductCardProps = {
  product: ProductInfoResponse;
  onPress?: () => void;
};

const ProductCard = ({ product, onPress }: ProductCardProps) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image style={styles.image} source={{ uri: product.urlImagen }} />

      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {product.descripcion}
        </Text>

        <View style={styles.row}>
          <Text style={styles.label}>Código:</Text>
          <Text style={styles.value}>{product.codigoBarras}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Stock:</Text>
          <Text style={styles.value}>{product.stock}</Text>
        </View>

        <Text style={styles.price}>${product.precio.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    marginHorizontal: 14,
    marginBottom: 16,

    // Sombra estilo iOS/Android moderno
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 16,
    backgroundColor: '#F3F3F3',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
    color: '#1A1A1A',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginRight: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  price: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '800',
    color: '#FF6B00',
  },
});
