import React, { useEffect } from 'react';
import { View, Text, Button, Linking } from 'react-native';
import { Camera, useCameraPermission, useCodeScanner, useMicrophonePermission } from 'react-native-vision-camera';

export default function CameraScreen() {
    const { hasPermission: hasCameraPermission, requestPermission: requestCameraPermission } = useCameraPermission();
    const { hasPermission: hasMicPermission, requestPermission: requestMicPermission } = useMicrophonePermission();

    useEffect(() => {
        const checkPermissions = async () => {
            if (!hasCameraPermission) {
                const granted = await requestCameraPermission();
                if (!granted) {
                    console.log('El usuario negó el permiso de cámara.');
                }
            }

            if (!hasMicPermission) {
                const granted = await requestMicPermission();
                if (!granted) {
                    console.log('El usuario negó el permiso del micrófono.');
                }
            }
        };

        checkPermissions();
    }, [hasCameraPermission, hasMicPermission]);

    if (!hasCameraPermission) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No tienes permiso para usar la cámara</Text>
                <Button title="Abrir configuración" onPress={() => Linking.openSettings()} />
            </View>
        );
    }

    const devices = Camera.getAvailableCameraDevices();
    const backDevice = devices.find(d => d.position === 'back');

    if (!backDevice) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No hay cámara trasera disponible</Text>
            </View>
        );
    }

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            console.log(`Scanned ${codes.length} codes!`)
        }
    })

    return (
        <View style={{ flex: 1 }}>
            <Camera
                style={{ flex: 1 }}
                device={backDevice}
                isActive={true}
                codeScanner={codeScanner}
            />
        </View>
    );
}
