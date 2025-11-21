import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { use, useState } from 'react'
import { PointerType, ScrollView, TextInput } from 'react-native-gesture-handler'
import { globalStyles } from '../../../ui/styles/globalStyles'
import { ProductInfoRequest } from '../../../core/domain/entities/Products'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { Button } from '@react-navigation/elements'
import CustomButton from '../../../ui/components/CommonButton'
import { sendDataProduct } from '../../../core/application/services/AuthService'
import CameraScreen from '../../../ui/screens/CameraScannerScreen'
import { RootStackParamList } from '../../../app/navigation/RootStackParamList'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useAuthSessionStore } from '../../auth/state/authSession.store'
import { useAppStore } from '../../store/useStoreApp'

const AddProductsScreen = () => {
    const { uuidStore } = useAuthSessionStore();

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const { productInfoRequest, setProductInfoRequest, sendDataProduct } = useAppStore();

    const [loading, setLoading] = useState(false);

    const handleAddProduct = async () => {

        setLoading(true);
        try {

            setProductInfoRequest({ ...productInfoRequest, uuidTienda: uuidStore ?? '' })

            const result = await sendDataProduct();
            if (result) {
                navigation.navigate('ProductsMain')
            } else {
                navigation.navigate('ProductsMain')
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectImage = async () => {
        const result = await launchCamera({
            mediaType: 'photo',
            includeBase64: true,
            saveToPhotos: false,
            cameraType: 'back',
        });

        if (result.didCancel) return;

        if (result.assets && result.assets.length > 0) {
            const image = result.assets[0];

            setProductInfoRequest((prev) => ({
                ...prev,
                urlImagen: image.uri || '',
                base64Image: image.base64 || '',
            }));
        }
    };

    const goToCameraScreen = () => navigation.navigate('Camera');


    return (

        <ScrollView style={globalStyles.containerAddEmployeeScreen} contentContainerStyle={globalStyles.scrollContent}>
            <Text style={globalStyles.title}>Nuevo Producto</Text>
            <Text style={globalStyles.subtitle}>Registra un nuevo producto para que este disponible</Text>
            <View style={globalStyles.form}>
                <Text style={globalStyles.label}>Descripción *</Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder=""
                    value={productInfoRequest.descripcion}
                    onChangeText={(value) =>
                        setProductInfoRequest({ ...productInfoRequest, descripcion: value })
                    }
                    placeholderTextColor="#999"
                />
                <Text style={globalStyles.label}>Código de barras *</Text>
                <CustomButton onPressButton={goToCameraScreen}>
                    <Text>
                        Abrir cámara
                    </Text>
                </CustomButton>
                <TextInput
                    style={globalStyles.input}
                    placeholder="2734872873"
                    value={productInfoRequest.codigoBarras}
                    readOnly
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#999"
                />
                <Text style={globalStyles.label}>Stock *</Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Ej: 23"
                    value={productInfoRequest.stock !== undefined ? String(productInfoRequest.stock) : ''}
                    onChangeText={(value) =>
                        setProductInfoRequest({ ...productInfoRequest, stock: parseInt(value, 10) || 0 })
                    }
                    keyboardType="numeric"
                    placeholderTextColor="#999"
                />
                <Text style={globalStyles.label}>Precio *</Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Ej: $509"
                    value={productInfoRequest.precio !== undefined ? String(productInfoRequest.precio) : ''}
                    onChangeText={(value) =>
                        setProductInfoRequest({ ...productInfoRequest, precio: parseInt(value, 10) || 0 })
                    }
                    keyboardType="numeric"
                    placeholderTextColor="#999"
                />

                <CustomButton onPressButton={handleSelectImage}>
                    <Text>
                        Seleccionar imagen
                    </Text>
                </CustomButton>

                {productInfoRequest.urlImagen ? (
                    <Image
                        source={{ uri: productInfoRequest.urlImagen }}
                        style={{ width: 200, height: 200, marginVertical: 10 }}
                    />
                ) : null}
                <TouchableOpacity
                    style={[globalStyles.submitButton, loading && globalStyles.disabledButton]}
                    onPress={handleAddProduct}
                    disabled={loading}
                >
                    <Text style={globalStyles.submitButtonText}>
                        {loading ? 'Registrando...' : 'Guardar Producto'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={globalStyles.cancelButton}
                    // onPress={handleCancel}
                    disabled={loading}
                >
                    <Text style={globalStyles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    )
}

export default AddProductsScreen;