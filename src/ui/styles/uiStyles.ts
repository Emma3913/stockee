import { Dimensions, StyleSheet } from 'react-native';
import { globalColors } from './globalStyles';

const { width, height } = Dimensions.get('window');

export const uiStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: width * 0.93,
    // height: height * 0.3,
    padding: 20,
    backgroundColor: globalColors.light,
    borderRadius: 20,
    alignItems: 'center',
    // shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 10,
  },
  popupModalStage: {
    width: width * 0.7,
    height: height * 0.5,
    padding: 22,
    backgroundColor: globalColors.light,
    borderRadius: 20,
    alignItems: 'center',
    // shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 15,
    color: globalColors.dark,
  },
  stageModalTitle: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 20,
    color: globalColors.dark,
  },
  description: {
    lineHeight: 19,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 20,
    color: globalColors.dark,
  },
  stageModalDescription: {
    fontSize: 17,
    textAlign: 'left',
    marginTop: 20,
    fontWeight: '600',
    color: globalColors.dark,
  },
  button: {
    marginTop: 20,
  },
  lottie: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  lottieStageModal: {
    margin: -9,
    width: 320,
    height: 221.82,
    marginTop: 20,
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  signInButton: {
    backgroundColor: globalColors.secondary,
    width: 120,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 5,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
