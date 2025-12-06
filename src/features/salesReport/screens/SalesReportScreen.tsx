// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import React, { useCallback, useState } from 'react';
// import HeaderMenu from '../../../ui/components/HeaderMenu';
// import { globalStyles } from '../../../ui/styles/globalStyles';
// import ExploreScreen from '../../../ui/screens/ExploreScreen';
// import Pdf from 'react-native-pdf';
// import { useAppStore } from '../../store/useStoreApp';
// import { useFocusEffect } from '@react-navigation/native';

// const SalesReportScreen = () => {
//   const [loading, setLoading] = useState(false);

//   const { productInfoRequest, saleResume } = useAppStore();

//   const SalesReportScreen = () => {
//     const [loading, setLoading] = useState(false);
//     const [base64Pdf, setBase64Pdf] = useState<string | null>(null);

//     const { saleResume } = useAppStore();

//     const loadSaleResume = useCallback(async () => {
//       setLoading(true);
//       try {
//         const pdfBase64 = await saleResume();
//         setBase64Pdf(pdfBase64);
//       } catch (error) {
//         console.error('Error cargando reporte PDF:', error);
//       } finally {
//         setLoading(false);
//       }
//     }, [saleResume]);

//     useFocusEffect(
//       useCallback(() => {
//         loadSaleResume();
//       }, [loadSaleResume]),
//     );

//     const source = base64Pdf
//       ? { uri: `data:application/pdf;base64,${base64Pdf}` }
//       : undefined;

//     return (
//       <View style={globalStyles.container}>
//         <HeaderMenu title="Informe de ventas" />

//         {loading && <ActivityIndicator size="large" />}

//         {!loading && base64Pdf && (
//           <Pdf
//             source={source!}
//             style={styles.pdf}
//             onError={error => console.log('PDF error:', error)}
//           />
//         )}
//       </View>
//     );
//   };
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   pdf: {
//     flex: 1,
//   },
// });

// export default SalesReportScreen;
