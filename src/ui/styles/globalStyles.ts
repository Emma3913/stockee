import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const globalColors = {
  primary: '#6AA57B',
  secondary: '#739BCE',
  tertiary: '#C3746F',
  quaternary: '#E1AF5A',
  light: '#FFFFFF',
  lightgray: '#F5F5F5',
  dark: '#000000',
  semidark: '#262626ff',
};

export const globalStyles = StyleSheet.create({
  backgorund: {
    flex: 1,
    backgroundColor: globalColors.lightgray,
  },
  text800: {
    fontFamily: 'Poppins-Bold',
    fontSize: 40,
    fontWeight: '800',
    color: globalColors.tertiary,
  },
  initialScreenCircleTop: {
    position: 'absolute',
    marginTop: 0,
    padding: 200,
    backgroundColor: globalColors.secondary,
    right: 250,
    // bottom: ,
    // borderTopRightRadius: 45,
    borderBottomRightRadius: 45,
  },
  initialScreenContainerTop: {
    backgroundColor: globalColors.lightgray,
    paddingVertical: 20,
    marginTop: 170,
    // borderRadius: 45,
  },
  initialScreenContainerTopText: {
    color: globalColors.dark,
    fontWeight: '900',
    fontSize: 50,
    paddingHorizontal: 20,
  },
  initialScreenSubtitleContainerTop: {
    paddingHorizontal: 20,
  },
  initialScreenSubtitleContainerTopText: {
    color: globalColors.dark,
    fontSize: 25,
    fontWeight: '800',
  },
  initialScreenImageContainerTop: {
    position: 'absolute',
    backgroundColor: globalColors.light,
    borderRadius: '100%',
    height: 150,
    width: 150,
    right: 20,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialScreenImageTop: {
    height: 120,
    width: 120,
  },
  initialScreenContainerBottom: {
    backgroundColor: globalColors.tertiary,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '100%',
    height: 300,
    alignItems: 'flex-end',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    position: 'absolute',
    bottom: 0,
  },
  initialScreenText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 36,
    fontWeight: '900',
    color: globalColors.dark,
    textAlign: 'left',
  },
  initialScreenButton: {
    backgroundColor: globalColors.dark,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 45,
  },
  initialScreenButtonText: {
    color: globalColors.light,
    fontWeight: '700',
    fontSize: 15,
  },

  // LoginScreen

  loginScreenContainerTopText: {
    color: globalColors.dark,
    fontWeight: '900',
    fontSize: 40,
    paddingHorizontal: 20,
  },

  loginScreenSubtitleContainerTop: {
    paddingHorizontal: 20,
    marginTop: 10,
  },

  loginScreenSubtitleContainerTopText: {
    color: globalColors.dark,
    fontSize: 20,
    fontWeight: '800',
  },

  loginScreenContainerTop: {
    backgroundColor: globalColors.lightgray,
    marginTop: 50,
  },

  loginScreenContainerBottom: {
    backgroundColor: globalColors.tertiary,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '100%',
    height: 560,
    borderRadius: 45,
    position: 'absolute',
    bottom: 0,
    textAlign: 'center',
  },

  loginScreenText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 25,
    fontWeight: '900',
    color: globalColors.dark,
    textAlign: 'left',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: globalColors.light,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 15,
    marginTop: 15,
  },
  input: {
    flex: 1,
    color: globalColors.dark,
    height: 60,
  },
  forgotText: {
    marginTop: 5,
    marginBottom: 5,
    color: globalColors.dark,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  dontHaveAccount: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 5,
    color: globalColors.dark,
    fontSize: 16,
    fontWeight: '400',
  },
  createAccount: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  orText: {
    textAlign: 'center',
    color: '#000000ff',
    marginVertical: 20,
  },
  loginScreenButton: {
    backgroundColor: globalColors.dark,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    width: '100%',
    marginTop: 10,
  },
  googleButton: {
    backgroundColor: globalColors.light,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 30,
    width: '100%',
    marginTop: 10,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    color: '#000',
    fontWeight: '600',
  },

  // LoginScreen
  //ResetPasswordScreen
  resetPasswordScreenContainerTopText: {
    color: globalColors.dark,
    fontWeight: '900',
    fontSize: 40,
    paddingHorizontal: 20,
  },

  resetPasswordScreenSubtitleContainerTop: {
    paddingHorizontal: 20,
    marginTop: 10,
  },

  resetPasswordScreenSubtitleContainerTopText: {
    color: globalColors.dark,
    fontSize: 20,
    fontWeight: '800',
  },

  resetPasswordScreenContainerTop: {
    backgroundColor: globalColors.lightgray,
    marginTop: 50,
  },

  resetPasswordScreenContainerBottom: {
    backgroundColor: globalColors.tertiary,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '100%',
    height: 550,
    borderRadius: 45,
    position: 'absolute',
    bottom: 0,
    textAlign: 'center',
  },

  resetPasswordScreenText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 25,
    fontWeight: '900',
    color: globalColors.dark,
    textAlign: 'left',
  },
  resetPasswordScreenButton: {
    backgroundColor: globalColors.dark,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    width: '100%',
    marginTop: 10,
  },
  //ResetPasswordScreen
  lottieGreenLines: {
    position: 'absolute',
    margin: 0,
    width: width,
    height: height,
    pointerEvents: 'none',
    zIndex: -10,
  },

  // EmployeeScreen
  containerEmployeeScreen: {
    flex: 1,
    backgroundColor: globalColors.lightgray,
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
    color: globalColors.dark,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: globalColors.lightgray,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: globalColors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: globalColors.light,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    marginBottom: 8,
  },
  clienteNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  clienteEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  clienteTelefono: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  clienteDireccion: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  totalCompras: {
    fontSize: 16,
    fontWeight: 'bold',
    color: globalColors.secondary,
  },
  backButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  backButtonText: {
    color: '#FF9500',
    fontSize: 16,
    fontWeight: '500',
  },
  // EmployeeScreen

  // ---------------------------

  containerDetailEmployeeScreen: {
    flex: 1,
    backgroundColor: globalColors.lightgray,
    padding: 17,
  },
  // DetailEmployeeScreen
  cardDetail: {
    backgroundColor: globalColors.light,
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  // title: {
  //   fontSize: 28,
  //   fontWeight: 'bold',
  //   color: '#333',
  //   marginBottom: 24,
  // },
  section: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    color: globalColors.quaternary,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  editButton: {
    backgroundColor: globalColors.secondary,
  },
  ventasButton: {
    backgroundColor: globalColors.primary,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // backButton: {
  //   backgroundColor: '#f0f0f0',
  //   padding: 12,
  //   borderRadius: 8,
  //   alignItems: 'center',
  //   marginBottom: 16,
  // },
  // backButtonText: {
  //   color: '#FF9500',
  //   fontSize: 16,
  //   fontWeight: '500',
  // },
  errorText: {
    fontSize: 18,
    color: '#FF3B30',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  // DetailEmployeeScreen

  // -------------------

  // AddEmployeeScreen
  containerAddEmployeeScreen: {
    flex: 1,
    backgroundColor: globalColors.lightgray,
  },
  scrollContent: {
    padding: 16,
  },
  // title: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   color: '#333',
  //   marginBottom: 4,
  // },
  // subtitle: {
  //   fontSize: 14,
  //   color: '#666',
  //   marginBottom: 20,
  // },
  form: {
    backgroundColor: globalColors.light,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  // label: {
  //   fontSize: 16,
  //   fontWeight: '600',
  //   color: '#333',
  //   marginBottom: 8,
  //   marginTop: 12,
  // },
  // input: {
  //   borderWidth: 1,
  //   borderColor: '#ddd',
  //   borderRadius: 8,
  //   padding: 12,
  //   fontSize: 16,
  //   backgroundColor: '#fff',
  //   color: '#333',
  // },
  disabledInput: {
    backgroundColor: '#f5f5f5',
    color: '#666',
  },
  submitButton: {
    backgroundColor: globalColors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  disabledButton: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: globalColors.tertiary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  cancelButtonText: {
    color: globalColors.light,
    fontSize: 16,
    fontWeight: '500',
  },
  error: {
    color: '#d32f2f',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
  },
  success: {
    color: '#388e3c',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
  },
  // AddEmployeeScreen
  // -------------------------------------
  // HomeScreen

  containerOptions: {
    flex: 1,
    backgroundColor: globalColors.lightgray,
    padding: 10,
    // justifyContent: 'center',
    // alignContent: 'center',
  },
  header: {
    backgroundColor: globalColors.light,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  // title: {
  //   fontSize: 28,
  //   fontWeight: 'bold',
  //   color: '#333',
  //   marginBottom: 8,
  // },
  // subtitle: {
  //   fontSize: 16,
  //   color: '#666',
  // },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
  },
  cardOptions: {
    width: '48%',
    backgroundColor: globalColors.primary,
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    // borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  icon: {
    fontSize: 48,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },

  // HomeScreen
});
