import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { globalColors, globalStyles } from '../../../ui/styles/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { RootStackParamList } from '../../../app/navigation/RootStackParamList';
import CustomButton from '../../../ui/components/CommonButton';
import { useAuthSessionStore } from '../../auth/state/authSession.store';
import { useRegisterDeviceToken } from '../../../app/hooks/useRegisterDeviceToken';
import { GoogleIcon } from '../../../ui/components/GoogleIcons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { HomeDrawerParamList } from '../../../app/navigation/drawer/HomeDrawerNavigator';
import { features } from '../../../app/utils/features';
import HeaderMenu from '../../../ui/components/HeaderMenu';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user } = useAuthSessionStore();

  useRegisterDeviceToken(user?.token!);

  return (
    <View style={globalStyles.container}>
      <HeaderMenu title="Stockee" />
      <View style={globalStyles.grid}>
        {features.map((f, i) => (
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
    </View>
  );
};

export default HomeScreen;
