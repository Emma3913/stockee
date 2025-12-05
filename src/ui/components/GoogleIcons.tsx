import React from 'react';
import { Text, TextStyle } from 'react-native';

type IconStyle = 'outlined' | 'rounded' | 'sharp';

interface GoogleIconProps {
    name: string;
    size?: number;
    color?: string;
    fill?: 0 | 1;
    weight?: number;
    grade?: number;
    opsz?: number;
    style?: TextStyle;
    variant?: IconStyle;
}

const fontFamilyMap = {
    outlined: 'MaterialSymbolsOutlined',
    rounded: 'MaterialSymbolsRounded',
    sharp: 'MaterialSymbolsSharp',
};

export const GoogleIcon = ({
    name,
    size = 28,
    color = '#000',
    fill = 0,
    weight = 400,
    grade = 0,
    opsz = 24,
    style,
    variant = 'outlined',
}: GoogleIconProps) => {
    return (
        <Text
            style={[
                ({
                    fontFamily: fontFamilyMap[variant],
                    fontSize: size,
                    color,
                    fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opsz}`,
                } as TextStyle & { fontVariationSettings?: string }),
                style,
            ]}
        >
            {name}
        </Text>
    );
};
