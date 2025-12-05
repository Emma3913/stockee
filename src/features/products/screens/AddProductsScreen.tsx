import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { globalColors, globalStyles } from '../../../ui/styles/globalStyles';
import { launchCamera } from 'react-native-image-picker';
import CustomButton from '../../../ui/components/CommonButton';
import { RootStackParamList } from '../../../app/navigation/RootStackParamList';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAppStore } from '../../store/useStoreApp';
import { GoogleIcon } from '../../../ui/components/GoogleIcons';
import { ModalState } from '../../../app/types';
import CustomModal from '../../../ui/components/CustomModal';

const AddProductsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { productInfoRequest, setProductInfoRequest, registerNewProduct } =
    useAppStore();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState<ModalState>({
    isVisible: false,
    title: "",
    description: "",
    subDescription: "",
    buttonTitle: "Aceptar",
    modalWithoutButton: false,
    goToAnotherPage: false,
  });

  const handleAddProduct = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const result = await registerNewProduct();

      if (!result?.success) {
        setModalData({
          isVisible: true,
          title: 'Prodcto registrado',
          description: 'El producto se guardo correctamente',
          buttonTitle: "Aceptar",
          modalWithoutButton: false,
        });
        return;
      }
      navigation.navigate('Products');
    } catch (err) {
      setModalData({
        isVisible: true,
        title: 'Error al registrar producto',
        description: 'Asegúrate de llenar todos los campos.',
        buttonTitle: "Aceptar",
        modalWithoutButton: false,
      });
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

      setProductInfoRequest(prev => ({
        ...prev,
        urlImagen: image.uri || '',
        base64Image: image.base64 || '',
      }));
    }
  };

  const goToCameraScreen = () => navigation.navigate('Camera');

  const handleCloseModal = () => {
    setModalData(prev => ({ ...prev, isVisible: false }))
    navigation.navigate('Products');
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      {/* Header */}
      <Text style={styles.headerTitle}>Nuevo Producto</Text>
      <Text style={styles.headerSubtitle}>
        Registra un nuevo producto para que esté disponible
      </Text>

      {/* --- Sección: Información --- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información del Producto</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descripción *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Aceite 10W30"
            value={productInfoRequest.descripcion}
            onChangeText={v => setProductInfoRequest({ ...productInfoRequest, descripcion: v })}
            placeholderTextColor="#A0A0A0"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Código de barras *</Text>

          <View style={styles.inputWithButton}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Escanéalo"
              value={productInfoRequest.codigoBarras}
              readOnly
            />
            <TouchableOpacity style={styles.iconButton} onPress={goToCameraScreen}>
              {/* <GoogleIcon name="barcode-scanner" variant="sharp" /> */}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rowInputs}>
          <View style={styles.column}>
            <Text style={styles.label}>Stock *</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              value={String(productInfoRequest.stock || '')}
              keyboardType="numeric"
              onChangeText={v => setProductInfoRequest({ ...productInfoRequest, stock: parseInt(v) || 0 })}
              placeholderTextColor="#A0A0A0"
            />
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Precio *</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              value={String(productInfoRequest.precio || '')}
              keyboardType="numeric"
              onChangeText={v => setProductInfoRequest({ ...productInfoRequest, precio: parseFloat(v) || 0 })}
              placeholderTextColor="#A0A0A0"
            />
          </View>
        </View>
      </View>

      {/* Imagen */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Imagen del Producto</Text>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleSelectImage}>
          <Text style={styles.secondaryButtonText}>Seleccionar imagen</Text>
        </TouchableOpacity>

        {productInfoRequest.urlImagen && (
          <Image
            source={{ uri: productInfoRequest.urlImagen }}
            style={styles.previewImage}
          />
        )}
      </View>

      {/* Botones */}
      <CustomButton styleButton={[styles.mainButton, loading && styles.disabled]} disabledButton={loading} onPressButton={handleAddProduct}>
        <Text style={styles.mainButtonText}>
          {loading ? 'Registrando...' : 'Guardar Producto'}
        </Text>
      </CustomButton>

      <CustomButton styleButton={styles.cancelButton} disabledButton={loading}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </CustomButton>
      <CustomModal
        {...modalData}
        onPressButton={handleCloseModal}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  content: {
    padding: 20,
  },

  // Header
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },

  // Sections
  section: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 12,
  },

  // Inputs
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  // Input con ícono a la derecha
  inputWithButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  // Inputs en fila
  rowInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  column: {
    flex: 1,
  },

  // Imagen
  previewImage: {
    width: "100%",
    height: 200,
    marginTop: 12,
    borderRadius: 12,
    resizeMode: "cover",
  },

  // Botones
  mainButton: {
    backgroundColor: globalColors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  mainButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.5,
  },
  cancelButton: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: globalColors.tertiary,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },

  secondaryButton: {
    backgroundColor: "#F1F1F1",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#555",
    fontSize: 15,
  },
});


export default AddProductsScreen;




























// <ScrollView
//   style={globalStyles.containerAddEmployeeScreen}
//   contentContainerStyle={globalStyles.scrollContent}
// >
//   <Text style={globalStyles.title}>Nuevo Producto</Text>
//   <Text style={globalStyles.subtitle}>
//     Registra un nuevo producto para que este disponible
//   </Text>
//   <View style={globalStyles.form}>
//     <Text style={globalStyles.label}>Descripción *</Text>
//     <TextInput
//       style={globalStyles.input}
//       placeholder=""
//       value={productInfoRequest.descripcion}
//       onChangeText={value =>
//         setProductInfoRequest({ ...productInfoRequest, descripcion: value })
//       }
//       placeholderTextColor="#999"
//     />
//     <Text style={globalStyles.label}>Código de barras *</Text>
//     <CustomButton styleButton={{}} onPressButton={goToCameraScreen}>
//       <Icon
//         name="barcode_scanner"
//         size={20}
//         color={globalColors.semidark}
//       />
//     </CustomButton>
//     <TextInput
//       style={globalStyles.input}
//       placeholder="2734872873"
//       value={productInfoRequest.codigoBarras}
//       readOnly
//       keyboardType="email-address"
//       autoCapitalize="none"
//       placeholderTextColor="#999"
//     />
//     <Text style={globalStyles.label}>Stock *</Text>
//     <TextInput
//       style={globalStyles.input}
//       placeholder="Ej: 23"
//       value={
//         productInfoRequest.stock !== undefined
//           ? String(productInfoRequest.stock)
//           : ''
//       }
//       onChangeText={value =>
//         setProductInfoRequest({
//           ...productInfoRequest,
//           stock: parseInt(value, 10) || 0,
//         })
//       }
//       keyboardType="numeric"
//       placeholderTextColor="#999"
//     />
//     <Text style={globalStyles.label}>Precio *</Text>
//     <TextInput
//       style={globalStyles.input}
//       placeholder="Ej: $509"
//       value={
//         productInfoRequest.precio !== undefined
//           ? String(productInfoRequest.precio)
//           : ''
//       }
//       onChangeText={value =>
//         setProductInfoRequest({
//           ...productInfoRequest,
//           precio: parseInt(value, 10) || 0,
//         })
//       }
//       keyboardType="numeric"
//       placeholderTextColor="#999"
//     />

//     <CustomButton onPressButton={handleSelectImage}>
//       <Text>Seleccionar imagen</Text>
//     </CustomButton>

//     {productInfoRequest.urlImagen ? (
//       <Image
//         source={{ uri: productInfoRequest.urlImagen }}
//         style={{ width: 200, height: 200, marginVertical: 10 }}
//       />
//     ) : null}
//     <TouchableOpacity
//       style={[
//         globalStyles.submitButton,
//         loading && globalStyles.disabledButton,
//       ]}
//       onPress={handleAddProduct}
//       disabled={loading}
//     >
//       <Text style={globalStyles.submitButtonText}>
//         {loading ? 'Registrando...' : 'Guardar Producto'}
//       </Text>
//     </TouchableOpacity>

//     <TouchableOpacity
//       style={globalStyles.cancelButton}
//       // onPress={handleCancel}
//       disabled={loading}
//     >
//       <Text style={globalStyles.cancelButtonText}>Cancelar</Text>
//     </TouchableOpacity>
//   </View>
// </ScrollView>