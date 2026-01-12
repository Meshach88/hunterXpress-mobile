import React from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

/**
 * Props:
 * - placeholder: string
 * - value: { uri, name, type } | null
 * - onChange: (file) => void
 */
export default function FileUploadField({ placeholder, value, onChange }) {
    const pickImage = async () => {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            Alert.alert(
                "Permission required",
                "Please allow access to your photos."
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
        });

        if (!result.canceled) {
            const asset = result.assets[0];

            onChange({
                uri: asset.uri,
                name: asset.fileName || "image.jpg",
                type: asset.mimeType || "image/jpeg",
            });
        }
    };

    return (
        <Pressable style={styles.container} onPress={pickImage}>
            <Text
                style={[
                    styles.text,
                    value ? styles.selectedText : null,
                ]}
                numberOfLines={1}
            >
                {value ? value.name : placeholder}
            </Text>

            <Ionicons
                name="camera-outline"
                size={20}
                color="#9ca3af"
            />
        </Pressable>
    );
}


const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14,
    },
    text: {
        color: "#9ca3af",
        flex: 1,
        marginRight: 10,
    },
    selectedText: {
        color: "#111827",
    },
});
