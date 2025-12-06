import { useAuthSessionStore } from '../../auth/state/authSession.store';
import { Text } from 'react-native-gesture-handler';
import { TouchableOpacity, View } from 'react-native';

export const UserProfileScreen = () => {
  const { user, clearSession } = useAuthSessionStore();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Hola, {user?.nombre}</Text>
      <Text>{user?.rol}</Text>

      <TouchableOpacity onPress={clearSession}>
        <Text>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};
