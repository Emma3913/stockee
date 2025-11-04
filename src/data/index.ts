import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const globalColors = {
  primary: '#6AA57B',
  secondary: '#7BA8CC',
  tertiary: '#D46A6A',
  quaternary: '#E3B665',
  light: '#FFFFFF',
  dark: '#000000',
};

export const globalStyles = StyleSheet.create({
  backgorund: {
    flex: 1,
    backgroundColor: globalColors.dark,
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
    backgroundColor: globalColors.dark,
    paddingVertical: 20,
    marginTop: 170,
    // borderRadius: 45,
  },
  initialScreenContainerTopText: {
    color: globalColors.light,
    fontWeight: '900',
    fontSize: 50,
    paddingHorizontal: 20,
  },
  initialScreenSubtitleContainerTop: {
    paddingHorizontal: 20,
  },
  initialScreenSubtitleContainerTopText: {
    color: globalColors.light,
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
    fontSize: 40,
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
    color: globalColors.light,
    fontWeight: '900',
    fontSize: 40,
    paddingHorizontal: 20,
  },

  loginScreenSubtitleContainerTop: {
    paddingHorizontal: 20,
    marginTop: 10,
  },

  loginScreenSubtitleContainerTopText: {
    color: globalColors.light,
    fontSize: 20,
    fontWeight: '800',
  },

  loginScreenContainerTop: {
    backgroundColor: globalColors.dark,
    marginTop: 40,
  },

  loginScreenContainerBottom: {
    backgroundColor: globalColors.tertiary,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '100%',
    height: 600,
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
    backgroundColor: globalColors.dark,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 15,
    marginTop: 15,
  },
  input: {
    flex: 1,
    color: '#fff',
    height: 60,
  },
  forgotText: {
    marginTop: 5,
    marginBottom: 5,
    color: globalColors.dark,
    fontSize: 16,
    fontWeight: '600',
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
  lottieGreenLines: {
    position: 'absolute',
    margin: 0,
    width: width,
    height: height,
    pointerEvents: 'none',
    zIndex: -10,
  },
});
