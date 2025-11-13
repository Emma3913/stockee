import { useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";

import CustomButton from "./CommonButton";
import { Text } from "react-native-gesture-handler";
import { Image, View } from "react-native";

export const ImageUploader = () => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [base64Image, setBase64Image] = useState<string | null>(null);

    const pickImage = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true,
            quality: 0.8,
        });

        if (result.assets && result.assets.length > 0) {
            const asset = result.assets[0];
            setImageUri(asset.uri || null);
            setBase64Image(asset.base64 || null);
        }
    };

    return (
        <View>
            <CustomButton onPressButton={pickImage}>
                <Text>
                    Seleccionar imagen
                </Text>
            </CustomButton>
            {imageUri && (
                <Image
                    source={{ uri: imageUri }}
                    style={{ width: 200, height: 200, marginTop: 10, borderRadius: 10 }}
                />
            )}
        </View>
    );
};