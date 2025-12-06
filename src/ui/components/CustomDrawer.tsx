import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { globalColors, globalStyles } from '../styles/globalStyles';
import { GoogleIcon } from './GoogleIcons';
import { useAuthSessionStore } from '../../features/auth/state/authSession.store';
import CustomButton from './CommonButton';

export function CustomDrawer(props: any) {
  const { clearSession, user } = useAuthSessionStore();

  console.log(clearSession, user?.nombre);

  const handleCloseSession = () => {
    clearSession();
  };

  return (
    <View style={{ flex: 1 }}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
          style={styles.avatar}
        />

        <View>
          <Text style={styles.name}>
            {user?.nombre ? user?.nombre : 'Usuario'}
          </Text>
          <Text style={styles.subtitle}>{user?.rol ? user?.rol : 'ROL'}</Text>
        </View>

        {/* <Icon
          name="chevron-right"
          size={24}
          color="#fff"
          style={{ marginLeft: 'auto' }}
        /> */}
      </View>

      {/* SCROLLABLE CONTENT */}
      <DrawerContentScrollView {...props} style={{ borderRadius: 16 }}>
        {/* WALLET SECTION */}
        <Text style={styles.sectionTitle}>Wallets & Earnings</Text>

        <TouchableOpacity style={styles.item}>
          <Icon name="account-balance-wallet" size={22} color="#333" />
          <Text style={styles.itemText}>Wallet Balance</Text>

          <View style={styles.addMoneyBtn}>
            <Text style={styles.addMoneyText}>ADD MONEY</Text>
          </View>
        </TouchableOpacity>

        {/* OTHERS */}
        <Text style={styles.sectionTitle}>Others</Text>

        <TouchableOpacity style={styles.item}>
          <Icon name="calculate" size={22} color="#333" />
          <Text style={styles.itemText}>Khata</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>

      {/* LOGOUT */}
      <CustomButton
        styleButton={styles.logout}
        onPressButton={handleCloseSession}
      >
        <GoogleIcon
          name="logout"
          variant="rounded"
          size={30}
          color={globalColors.dark}
        />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: globalColors.semidark,
    padding: 20,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 40,
    marginRight: 12,
    backgroundColor: '#ddd',
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    color: globalColors.dark,
    fontSize: 13,
    marginTop: 2,
    padding: 2,
    width: '40%',
    borderRadius: 16,
    textAlign: 'center',
    backgroundColor: globalColors.light,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
    fontSize: 13,
    fontWeight: '700',
    color: '#444',
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    marginLeft: 15,
    fontSize: 15,
    color: '#222',
  },
  addMoneyBtn: {
    marginLeft: 'auto',
    backgroundColor: '#ff4d6d',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },
  addMoneyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  logout: {
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 15,
    // borderTopWidth: 5,
    // borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: globalColors.tertiary,
    borderRadius: 15,
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});
