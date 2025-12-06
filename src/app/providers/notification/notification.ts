import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidStyle } from '@notifee/react-native';

export async function createNotificationChannel() {
  try {
    await notifee.createChannel({
      id: 'default',
      name: 'General Notifications',
      importance: 4,
    });
  } catch (error) {
    console.error('Error al crear canal:', error);
  }
}

export function listenNotifications() {
  messaging().onMessage(async remoteMessage => {
    console.log('remoteMessage: ', remoteMessage);
    try {
      await createNotificationChannel();

      const title =
        typeof remoteMessage.data?.title === 'string'
          ? remoteMessage.data.title
          : 'Notificación';
      const body =
        typeof remoteMessage.data?.body === 'string'
          ? remoteMessage.data.body
          : 'Tienes un nuevo mensaje';

      await notifee.displayNotification({
        title,
        body,
        android: {
          channelId: 'default',
          smallIcon: 'ic_launcher',
          style: {
            type: AndroidStyle.BIGTEXT,
            text: body,
          },
        },
      });
    } catch (error) {
      console.error('Error mostrando notificación:', error);
    }
  });
}
