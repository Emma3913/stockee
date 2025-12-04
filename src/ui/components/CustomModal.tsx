import {
    View,
    Text,
    StyleSheet,
    Modal,
    Dimensions,
    Animated,
    StyleProp,
    ViewStyle,
    TouchableOpacity,
    Button,
} from 'react-native';
import React, { useRef, useEffect } from 'react';
import { BlurView } from '@react-native-community/blur';
import { uiStyles } from '../styles/uiStyles';
import { CustomModalProps } from '../../app/types';

const ModalContent = ({
    title,
    description,
    subDescription,
    buttonTitle,
    onPressButton,
    modalWithoutButton,
    isVisible,
    goToAnotherPage = false,
}: CustomModalProps) => {
    const contentStyle: StyleProp<ViewStyle> = modalWithoutButton
        ? uiStyles.popupModalStage
        : uiStyles.popup;

    return (
        <View style={contentStyle}>
            <Text style={modalWithoutButton ? uiStyles.stageModalTitle : uiStyles.title}>
                {title}
            </Text>
            <Text
                style={
                    modalWithoutButton ? uiStyles.stageModalDescription : uiStyles.description
                }>
                {description}
            </Text>
            {subDescription && (
                <Text
                    style={
                        modalWithoutButton
                            ? uiStyles.stageModalDescription
                            : uiStyles.description
                    }>
                    {subDescription}
                </Text>
            )}
            {!modalWithoutButton && (
                <TouchableOpacity
                    style={uiStyles.signInButton}
                    onPress={onPressButton}
                    disabled={!buttonTitle}
                >
                    <Text style={uiStyles.signInText}>{buttonTitle}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

function CustomModal({
    isVisible,
    goToAnotherPage = false,
    ...props
}: CustomModalProps) {
    const blurOpacity = useRef(new Animated.Value(0)).current;
    const modalScale = useRef(new Animated.Value(0.99)).current;

    const handleActivateFunction = () => {
        props.onPressButton?.();
    };

    const animateClose = () => {
        Animated.parallel([
            Animated.timing(modalScale, {
                toValue: 0.99,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(blurOpacity, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    useEffect(() => {
        if (isVisible) {
            Animated.parallel([
                Animated.timing(blurOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.spring(modalScale, {
                    toValue: 1,
                    friction: 5,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(blurOpacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(modalScale, {
                    toValue: 0.9,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [isVisible]);

    return (
        <Modal animationType="fade" transparent={true} visible={isVisible}>
            <View style={uiStyles.overlay}>
                <Animated.View style={[uiStyles.blurContainer, { opacity: blurOpacity }]}>
                    {!goToAnotherPage && (
                        <BlurView
                            style={StyleSheet.absoluteFill}
                            blurType="light"
                            blurAmount={5}
                        />
                    )}
                </Animated.View>
                <Animated.View style={{ transform: [{ scale: modalScale }] }}>
                    <ModalContent {...props} onPressButton={handleActivateFunction} />
                </Animated.View>
            </View>
        </Modal>
    );
}

export default CustomModal;
