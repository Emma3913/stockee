import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { ProductShoppingCartResponse } from '../../../core/domain/entities/ShoppingCart';

type CartItemProps = {
  product: any;
};

export default function CartItem({ product }: CartItemProps) {
  console.log(product);
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.urlImagen }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{product.descripcion}</Text>

        <Text style={styles.price}>MXN${product.precio}</Text>
      </View>

      <View style={styles.qtyBox}>
        <Pressable style={styles.qtyButton}>
          <Text style={styles.qtySymbol}>-</Text>
        </Pressable>

        <Text style={styles.qtyNumber}>{product.stock ?? 1}</Text>

        <Pressable style={styles.qtyButton}>
          <Text style={styles.qtySymbol}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },

  /* ITEM DEL CARRITO */
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 14,
    backgroundColor: '#F1F1F1',
  },
  info: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  rating: {
    fontSize: 13,
    color: '#777',
  },
  size: {
    fontSize: 13,
    color: '#777',
  },
  price: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: '800',
  },

  qtyBox: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtySymbol: {
    fontSize: 20,
    fontWeight: '700',
  },
  qtyNumber: {
    fontSize: 16,
    fontWeight: '600',
  },

  /* RESUMEN DE PAGO */
  summaryBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    color: '#777',
    fontSize: 15,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 10,
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: '800',
  },

  /* FOOTER */
  footer: {
    backgroundColor: '#FF8A3D',
    padding: 16,
    borderRadius: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
  checkoutButton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
