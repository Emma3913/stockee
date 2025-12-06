import React, { useCallback, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import ProductCard from '../components/ProductCard';
import { useAppStore } from '../../store/useStoreApp';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { globalColors, globalStyles } from '../../../ui/styles/globalStyles';
import { SkeletonProductCard } from '../components/SkeletonProductCard';
import CustomButton from '../../../ui/components/CommonButton';
import { RootStackParamList } from '../../../app/navigation/RootStackParamList';
import { ModalState } from '../../../app/types';
import CustomModal from '../../../ui/components/CustomModal';
import { GoogleIcon } from '../../../ui/components/GoogleIcons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { HomeDrawerParamList } from '../../../app/navigation/drawer/HomeDrawerNavigator';
import { featuresStock } from '../../../app/utils/features';
import HeaderMenu from '../../../ui/components/HeaderMenu';

const ProductsScreen = () => {
  const [loading, setLoading] = useState(false);
  const { paginatedProductsInfoResponse, getAllProductsByStore } =
    useAppStore();

  type HomeDrawerNav = DrawerNavigationProp<HomeDrawerParamList>;

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

  const totalItemsRequest = paginatedProductsInfoResponse.data.length;
  const skeletonItems = Array.from({ length: totalItemsRequest }).map(
    (_, i) => i,
  );

  return (
    <View style={globalStyles.container}>
      <HeaderMenu title="Analísis de stock" />
      <View style={globalStyles.grid}>
        {featuresStock.map((f, i) => (
          <CustomButton
            key={i}
            onPressButton={() => navigation.navigate(f.route as any)}
            styleButton={[
              globalStyles.cardFeatures,
              { backgroundColor: f.color },
            ]}
          >
            <View style={globalStyles.iconContainer}>{f.icon}</View>

            <Text style={globalStyles.cardTitle}>{f.name}</Text>
            <Text style={globalStyles.tapToView}>Tap para entrar</Text>
          </CustomButton>
        ))}
      </View>

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
          data={paginatedProductsInfoResponse.data}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => <ProductCard product={item} />}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      )}
    </View>
  );
};

export default ProductsScreen;
