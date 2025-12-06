import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import { GoogleIcon } from '../components/GoogleIcons';
import { globalColors, globalStyles } from '../styles/globalStyles';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { useAppStore } from '../../features/store/useStoreApp';
import CustomButton from '../components/CommonButton';
import { RootStackParamList } from '../../app/navigation/RootStackParamList';

export default function ExploreScreen() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { paginatedProductsInfoResponse, getAllProductsByStore } =
    useAppStore();

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

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <TextInput placeholder="Search.." style={styles.searchInput} />
          <CustomButton styleButton={styles.filterBtn}>
            <GoogleIcon name="search" variant="rounded" size={20} />
          </CustomButton>
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
        data={paginatedProductsInfoResponse.data}
        keyExtractor={item => item.id.toString()}
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
              <TouchableOpacity>
                <GoogleIcon name="heart_plus" variant="rounded" size={20} />
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
              {/* <Text style={styles.oldPrice}>${item.oldPrice}.00</Text> */}
            </View>
          </View>
        )}
      />
    </View>
  );
}

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
    flex: 0.8,
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
    paddingVertical: 12,
    flex: 0.2,
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
});
