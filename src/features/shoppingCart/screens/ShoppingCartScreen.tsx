import { View, Text, FlatList, StyleSheet } from 'react-native';
import CartItem from '../components/CartItem';

type ShoppingCartScreenProps = {
  cart?: any;
};

export default function ShoppingCartScreen({ cart }: ShoppingCartScreenProps) {
  // const total = cart.reduce((acc, p) => acc + p.precio * p.qty, 0);
  const discount = 38; // ejemplo
  // const finalPayment = total - discount;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito</Text>

      <FlatList
        data={cart}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => <CartItem product={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* RESUMEN */}
      <View style={styles.summaryBox}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Order Amount</Text>
          {/* <Text style={styles.summaryValue}>${total.toFixed(2)}</Text> */}
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Discount</Text>
          <Text style={styles.summaryValue}>-${discount.toFixed(2)}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.summaryRow}>
          <Text style={styles.summaryTotal}>Total Payment</Text>
          {/* <Text style={styles.summaryTotal}>${finalPayment.toFixed(2)}</Text> */}
        </View>
      </View>

      {/* BOTÓN */}
      <View style={styles.footer}>
        <Text style={styles.checkoutButton}>Checkout</Text>
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
