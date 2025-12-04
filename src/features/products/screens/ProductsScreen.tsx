import React, { useCallback, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ProductCard from '../components/ProductCard';
import { useAppStore } from '../../store/useStoreApp';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { globalStyles } from '../../../ui/styles/globalStyles';
import { SkeletonProductCard } from '../components/SkeletonProductCard';
import CustomButton from '../../../ui/components/CommonButton';
import { RootStackParamList } from '../../../app/navigation/RootStackParamList';

const ProductsScreen = () => {
  const [loading, setLoading] = useState(false);
  const { paginatedProductsInfoResponse, getAllProductsByStore } =
    useAppStore();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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

  const totalItemsRequest = paginatedProductsInfoResponse.items.length;
  const skeletonItems = Array.from({ length: totalItemsRequest }).map(
    (_, i) => i,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Análisis de stock</Text>

      <CustomButton
        styleButton={globalStyles.addButton}
        onPressButton={() => navigation.navigate('AddProducts')}
      >
        <Text style={globalStyles.addButtonText}>Agregar Productos</Text>
      </CustomButton>

      {loading ? (
        <FlatList
          data={skeletonItems}
          keyExtractor={item => item.toString()}
          renderItem={() => <SkeletonProductCard />}
          contentContainerStyle={globalStyles.listContent}
        />
      ) : (
        <FlatList
          data={paginatedProductsInfoResponse.items}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => <ProductCard product={item} />}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      )}
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
