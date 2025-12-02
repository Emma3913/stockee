import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { sendFCMToken } from '../../core/application/services/NotificationService';

export const useRegisterDeviceToken = (userToken: string) => {
  useEffect(() => {
    if (!userToken) return;

    const registerToken = async () => {
      try {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (!enabled) {
          console.log('Permisos de notificaciones no concedidos');
          return;
        }

        const token = await messaging().getToken();
        // console.log('Token actual =>', token);

        await sendFCMToken(token);

        console.log('Token enviado al backend ');
      } catch (error) {
        console.error('Error registrando device token:', error);
      }
    };

    registerToken();

    const unsubscribe = messaging().onTokenRefresh(async (newToken) => {
      try {
        console.log('Token refrescado =>', newToken);

        await sendFCMToken(newToken);

        console.log('Token refrescado enviado al backend');
      } catch (error) {
        console.error('Error enviando token refrescado:', error);
      }
    });

    return unsubscribe;
  }, [userToken]);
};
