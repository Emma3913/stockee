import { Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { globalStyles } from '../theme/theme';


type CustomButtonProps = {
    label?: string;
    onPressButton?: () => void;
    children?: React.ReactNode;
    styleButton?: StyleProp<ViewStyle>;
    disabledButton?: boolean;
};

const CustomButton = ({ label, onPressButton, children, styleButton, disabledButton }: CustomButtonProps) => {
    return (
        <TouchableOpacity style={styleButton} onPress={onPressButton} disabled={disabledButton}>
            {children ? (
                children
            ) : (
                <Text style={globalStyles.initialScreenButtonText}>{label}</Text>
            )}
        </TouchableOpacity>
    );
};

export default CustomButton