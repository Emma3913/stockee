import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { globalColors, globalStyles } from '../styles/globalStyles';
import { GoogleIcon } from './GoogleIcons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { HomeDrawerParamList } from '../../app/navigation/drawer/HomeDrawerNavigator';
import { useNavigation } from '@react-navigation/native';
import CustomButton from './CommonButton';
import { RootStackParamList } from '../../app/navigation/RootStackParamList';

type HeaderMenuProps = {
  title: string;
};

const HeaderMenu = ({ title }: HeaderMenuProps) => {
  const navigationDrawer = useNavigation<HomeDrawerNav>();
  const navigation = useNavigation<RootStackParamList>();
  type HomeDrawerNav = DrawerNavigationProp<HomeDrawerParamList>;
  return (
    <View style={globalStyles.headerContainer}>
      <CustomButton>
        <GoogleIcon
          name="arrow_circle_left"
          variant="rounded"
          size={30}
          color={globalColors.light}
        />
      </CustomButton>

      <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
        {title}
      </Text>
      <CustomButton onPressButton={() => navigationDrawer.openDrawer()}>
        <GoogleIcon
          name="bottom_drawer"
          variant="rounded"
          size={30}
          color={globalColors.light}
        />
      </CustomButton>
    </View>
  );
};

export default HeaderMenu;
