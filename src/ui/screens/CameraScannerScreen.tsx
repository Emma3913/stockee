import React, { useEffect, useState } from 'react';
import { View, Text, Button, Linking, Vibration } from 'react-native';
import {
  Camera,
  useCameraPermission,
  useCodeScanner,
  useMicrophonePermission,
} from 'react-native-vision-camera';
import { RootStackParamList } from '../../app/navigation/RootStackParamList';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAppStore } from '../../features/store/useStoreApp';

type Props = {
  route: { params: { go?: boolean } };
};

export default function CameraScreen({ route }: Props) {
  const go = route.params?.go ?? false; // default false
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { productInfoRequest, setProductInfoRequest } = useAppStore();

  const [isActive, setIsActive] = useState(true);
  const [scanned, setScanned] = useState(false);

  const {
    hasPermission: hasCameraPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();

  useEffect(() => {
    const checkPermissions = async () => {
      if (!hasCameraPermission) {
        await requestCameraPermission();
      }
    };
    checkPermissions();
  }, [hasCameraPermission]);

  if (!hasCameraPermission) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No tienes permiso para usar la cámara</Text>
      </View>
    );
  }

  const devices = Camera.getAvailableCameraDevices();
  const backDevice = devices.find(d => d.position === 'back');

  const codeScanner = useCodeScanner({
    codeTypes: ['upc-a', 'qr', 'ean-13'],
    onCodeScanned: codes => {
      if (scanned) {
        Vibration.vibrate(500);
        return;
      }
      if (codes.length === 0) return;

      const value = codes[0].value;
      setProductInfoRequest({ ...productInfoRequest, codigoBarras: value! });
      console.log('Código detectado:', value);

      setScanned(true);
      setIsActive(false);

      navigation.goBack();

      if (!go) {
        navigation.navigate('AddProducts');
        return;
      }
    },
  });

  if (!backDevice) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No hay cámara trasera disponible</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        device={backDevice}
        isActive={isActive}
        codeScanner={codeScanner}
      />
    </View>
  );
}
