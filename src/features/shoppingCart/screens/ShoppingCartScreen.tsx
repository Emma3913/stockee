import { View, Text, FlatList, StyleSheet } from 'react-native';
import CartItem from '../components/CartItem';
import { useCallback, useState } from 'react';
import { useAppStore } from '../../store/useStoreApp';
import { useFocusEffect } from '@react-navigation/native';
import HeaderMenu from '../../../ui/components/HeaderMenu';
import { globalColors, globalStyles } from '../../../ui/styles/globalStyles';
import CustomButton from '../../../ui/components/CommonButton';
import { ModalState } from '../../../app/types';
import { GoogleIcon } from '../../../ui/components/GoogleIcons';

export default function ShoppingCartScreen() {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [modalData, setModalData] = useState<ModalState>({
    isVisible: false,
    title: '',
    description: '',
    subDescription: '',
    buttonTitle: 'Aceptar',
    modalWithoutButton: false,
    goToAnotherPage: false,
  });
  const {
    paginatedShoppingCartInfoResponse,
    getAllProductsInTheShoppingCart,
    endSale,
  } = useAppStore();

  const loadProductsInTheShoppinCart = useCallback(async () => {
    setLoading(true);
    try {
      await getAllProductsInTheShoppingCart();
    } catch (error) {
      console.error('Error cargando productos:', error);
    } finally {
      setLoading(false);
    }
  }, [getAllProductsInTheShoppingCart]);

  useFocusEffect(
    useCallback(() => {
      loadProductsInTheShoppinCart();
    }, [loadProductsInTheShoppinCart]),
  );

  const handleEndSale = async () => {
    setLoading(true);
    try {
      const response = await endSale();
      setModalData({
        isVisible: true,
        title: 'Venta finalizada',
        description: 'Se ha finalizado con éxito la venta',
        buttonTitle: 'Aceptar',
        modalWithoutButton: false,
      });
    } catch (err: any) {
      console.log('cath', err.message);
      setModalData({
        isVisible: true,
        title: 'Ocurrió un error',
        description:
          'Por favor intenta en unos minutos. Es probable que el error se deba al servicio',
        buttonTitle: 'Aceptar',
        modalWithoutButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const total = paginatedShoppingCartInfoResponse.data?.info.totalPagar!;
  const discount = 38; // ejemplo
  const finalPayment = total - discount;

  return (
    <View style={globalStyles.container}>
      <HeaderMenu title="Carrito" />
      {paginatedShoppingCartInfoResponse.data?.items ? (
        <FlatList
          data={paginatedShoppingCartInfoResponse.data?.items}
          keyExtractor={item => `${item}`}
          renderItem={({ item }) => <CartItem product={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.iconWrapper}>
            <GoogleIcon
              name="shopping_cart_off"
              variant="rounded"
              size={40}
              color={globalColors.dark}
            />
          </View>

          <Text style={styles.emptyText}>No hay productos en el carrito</Text>
        </View>
      )}

      {/* RESUMEN */}
      <View style={styles.summaryBox}>
        <View style={styles.separator} />

        <View style={styles.summaryRow}>
          <Text style={styles.summaryTotal}>Total a pagar</Text>
          <Text style={styles.summaryTotal}>
            ${paginatedShoppingCartInfoResponse.data?.info.totalPagar}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <CustomButton onPressButton={handleEndSale}>
          <Text style={styles.checkoutButton}>Finalizar compra</Text>
        </CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: globalColors.primary,
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

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconWrapper: {
    backgroundColor: globalColors.light,
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: globalColors.dark,
  },
});
