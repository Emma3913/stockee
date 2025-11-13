import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { use, useState } from 'react'
import { PointerType, ScrollView, TextInput } from 'react-native-gesture-handler'
import { globalStyles } from '../../../ui/styles/globalStyles'
import { ProductInfoRequest } from '../../../core/domain/entities/Products'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import { launchImageLibrary } from 'react-native-image-picker'
import { Button } from '@react-navigation/elements'
import CustomButton from '../../../ui/components/CommonButton'
import { sendDataProduct } from '../../../core/application/services/AuthService'

const AddProductsScreen = () => {
    // TODO: Ajustar la logica de esta pantalla para que todo lo haga el store
    const tokenauth = "eyJhbGciOiJIUzI1NiJ9.eyJub21icmUiOiJFbW1hbnVlbCBBbGV4YW5kZXIiLCJyb2wiOiJBRE1JTiIsInN1YiI6ImV2YXF1ZXJvYXF1aW5vQGdtYWlsLmNvbSIsImlhdCI6MTc2MzAxNzI5NiwiZXhwIjoxNzYzMDIwODk2fQ.OLdooXNYp9xSbe35M7via1iZ4LDopAuKm1LanjlnFmU"
    const [productInfo, setProductInfo] = useState<ProductInfoRequest>({
        descripcion: '',
        codigoBarras: '',
        precio: 0,
        stock: 0,
        uuidTienda: '8115df28-69dc-4e8c-a06f-4d53128ed39a',
        base64Image: ''
    });

    const [loading, setLoading] = useState(false);

    const handleAddProduct = async () => {
        const result = await sendDataProduct(productInfo, tokenauth);
    }

    const handleSelectImage = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true,
        });

        if (result.assets && result.assets.length > 0) {
            const image = result.assets[0];
            setProductInfo((prev) => ({
                ...prev,
                urlImagen: image.uri || '',
                base64Image: image.base64 || '',
            }));
        }
    };

    console.log(productInfo.base64Image);

    return (

        <ScrollView style={globalStyles.containerAddEmployeeScreen} contentContainerStyle={globalStyles.scrollContent}>
            <Text style={globalStyles.title}>Nuevo Producto</Text>
            <Text style={globalStyles.subtitle}>Registra un nuevo producto para que este disponible</Text>
            <View style={globalStyles.form}>
                <Text style={globalStyles.label}>Descripción *</Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder=""
                    value={productInfo?.descripcion}
                    onChangeText={(text) => setProductInfo(prev => ({ ...prev, descripcion: text }))}
                    placeholderTextColor="#999"
                />
                <Text style={globalStyles.label}>Código de barras *</Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder="2734872873"
                    value={productInfo.codigoBarras}
                    onChangeText={(text) => setProductInfo(prev => ({ ...prev, codigoBarras: text }))}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#999"
                />
                <Text style={globalStyles.label}>Stock *</Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Ej: 23"
                    value={productInfo?.stock.toString()}
                    onChangeText={(text) => setProductInfo(prev => ({ ...prev, stock: parseInt(text) || 0 }))}
                    keyboardType="numeric"
                    placeholderTextColor="#999"
                />
                <Text style={globalStyles.label}>Precio *</Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Ej: $509"
                    value={productInfo?.precio.toString()}
                    onChangeText={(text) => setProductInfo(prev => ({ ...prev, precio: parseInt(text) || 0 }))}
                    keyboardType="numeric"
                    placeholderTextColor="#999"
                />
                {/* <Text style={globalStyles.label}>Imagen *</Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Ej: $509"
                    value={productInfo?.precio.toString()}
                    onChangeText={(text) => setProductInfo(prev => ({ ...prev, precio: parseInt(text) || 0 }))}
                    keyboardType="numeric"
                    placeholderTextColor="#999"
                /> */}

                <CustomButton onPressButton={handleSelectImage}>
                    <Text>
                        Seleccionar imagen
                    </Text>
                </CustomButton>

                {productInfo.urlImagen ? (
                    <Image
                        source={{ uri: productInfo.urlImagen }}
                        style={{ width: 200, height: 200, marginVertical: 10 }}
                    />
                ) : null}
                <TouchableOpacity
                    style={[globalStyles.submitButton, loading && globalStyles.disabledButton]}
                    onPress={handleAddProduct}
                    disabled={loading}
                >
                    <Text style={globalStyles.submitButtonText}>
                        {loading ? 'Registrando...' : 'Guardar Cliente'}
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