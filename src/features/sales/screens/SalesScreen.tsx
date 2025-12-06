import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { globalColors, globalStyles } from '../../../ui/styles/globalStyles';
import HeaderMenu from '../../../ui/components/HeaderMenu';
import ExploreScreen from '../../../ui/screens/ExploreScreen';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { RootStackParamList } from '../../../app/navigation/RootStackParamList';
import { useAppStore } from '../../store/useStoreApp';
import CustomButton from '../../../ui/components/CommonButton';
import { GoogleIcon } from '../../../ui/components/GoogleIcons';
import { FlatList } from 'react-native-gesture-handler';
import { AddProductToShoppingCartRequest } from '../../../core/domain/entities/ShoppingCart';
import { ModalState } from '../../../app/types';
import CustomModal from '../../../ui/components/CustomModal';
import { ProductInfoResponse } from '../../../core/domain/entities/Products';

const SalesScreen = () => {
  const [loading, setLoading] = useState(false);
  const [productsFiltered, setProductsFiltered] = useState<
    ProductInfoResponse[] | null
  >(null);

  const [search, setSearch] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    paginatedProductsInfoResponse,
    getAllProductsByStore,
    addProductToShoppingCartRequest,
    setAddProductToShoppingCartRequest,
    addProductsToShoppingCart,
    findProdcutByBarcode,
    productInfoRequest,
  } = useAppStore();

  const [modalData, setModalData] = useState<ModalState>({
    isVisible: false,
    title: '',
    description: '',
    subDescription: '',
    buttonTitle: 'Aceptar',
    modalWithoutButton: false,
    goToAnotherPage: false,
  });

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      await getAllProductsByStore();
    } catch (error) {
      console.error('Error cargando productos:', error);
    } finally {
      setLoading(false);
    }
  }, [getAllProductsByStore]);

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [loadProducts]),
  );

  const goToShoppingCart = () => {
    navigation.navigate('ShoppingCart');
  };

  const handleAddToCart = async (codigoBarras: string, cantidad = 1) => {
    setLoading(true);

    // 🔥 Aquí sí guardas lo que se va a enviar
    setAddProductToShoppingCartRequest({
      codigoBarras,
      cantidad,
    });

    try {
      const response = await addProductsToShoppingCart();

      setModalData({
        isVisible: true,
        title: 'Articulo agregado',
        description: 'Se agregó correctamente el articulo al carrito',
        buttonTitle: 'Aceptar',
        modalWithoutButton: false,
      });
    } catch (err: any) {
      console.log('catch', err.message);
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

  const handleCloseModal = () => {
    setModalData(prev => ({ ...prev, isVisible: false }));
    // navigation.navigate('Login');
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      return setModalData({
        isVisible: true,
        title: 'Código vacío',
        description: 'Por favor ingresa un código de barras',
        buttonTitle: 'Aceptar',
      });
    }

    setLoading(true);

    try {
      const product = await findProdcutByBarcode(search.trim());

      // mostramos solo ese producto en el FlatList
      setProductsFiltered([product]);
    } catch (err: any) {
      setModalData({
        isVisible: true,
        title: 'No encontrado',
        description: err.message || 'No se encontró un producto con ese código',
        buttonTitle: 'Aceptar',
      });
    } finally {
      setLoading(false);
    }
  };

  const goToCameraScreen = () => navigation.navigate('Camera', { go: true });

  return (
    <View style={globalStyles.container}>
      <HeaderMenu title="Venta" />
      <View style={styles.container}>
        {/* Search bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <TextInput
              placeholder="Search.."
              style={styles.searchInput}
              value={productInfoRequest.codigoBarras}
            />
            <CustomButton
              styleButton={styles.filterBtn}
              onPressButton={handleSearch}
            >
              <GoogleIcon name="search" variant="rounded" size={20} />
            </CustomButton>
          </View>

          <View style={styles.inputWithButton}>
            {/* <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Escanéalo"
              value={productInfoRequest.codigoBarras}
              readOnly
            /> */}

            <TouchableOpacity
              style={styles.iconButton}
              onPress={goToCameraScreen}
            >
              <GoogleIcon name="barcode_scanner" variant="rounded" />
            </TouchableOpacity>
          </View>

          <CustomButton
            styleButton={styles.shopingCartBox}
            onPressButton={goToShoppingCart}
          >
            <View style={styles.shoppingCartBtn}>
              <GoogleIcon name="shopping_cart" variant="rounded" size={35} />
            </View>
          </CustomButton>
        </View>

        {/* Product grid */}
        <FlatList
          data={productsFiltered ?? paginatedProductsInfoResponse.data}
          keyExtractor={item => item.id.toString() + item.descripcion}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            // paddingHorizontal: 20,
          }}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image
                source={{ uri: item.urlImagen }}
                style={styles.productImage}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}
              >
                <Text style={styles.productName}>{item.descripcion}</Text>
                <TouchableOpacity
                  onPress={() => handleAddToCart(item.codigoBarras, 1)}
                >
                  <GoogleIcon
                    name="add_shopping_cart"
                    variant="rounded"
                    size={20}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 4,
                }}
              >
                <Text style={styles.price}>${item.precio}.00</Text>
              </View>
            </View>
          )}
        />
      </View>
      <CustomModal {...modalData} onPressButton={handleCloseModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F6FB',
    padding: 0,
  },

  /* Search */
  searchContainer: {
    // paddingHorizontal: 20,
    // paddingTop: 10,
    paddingBottom: 20,
    // flex: 1,
    gap: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchBox: {
    backgroundColor: 'white',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    elevation: 2,
    flex: 0.6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  shopingCartBox: {
    backgroundColor: globalColors.primary,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 1,
    flex: 0.1,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#777',
  },
  filterBtn: {
    backgroundColor: globalColors.quaternary,
    padding: 8,
    borderRadius: 50,
  },
  shoppingCartBtn: {
    // backgroundColor: globalColors.quaternary,
    // padding: 8,
    borderRadius: 50,
  },

  /* Categories */
  categoryItem: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 10,
    marginBottom: 20,
  },
  categoryActive: {
    backgroundColor: '#7E58FF',
  },
  categoryText: {
    color: '#7E7A92',
    fontSize: 15,
  },
  categoryTextActive: {
    color: 'white',
    fontWeight: '600',
  },

  /* Product card */
  productCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  productImage: {
    width: '100%',
    height: 110,
    borderRadius: 15,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
  },
  oldPrice: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6,
    textDecorationLine: 'line-through',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  // Input con ícono a la derecha
  inputWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.2,
  },
  iconButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
});

export default SalesScreen;
