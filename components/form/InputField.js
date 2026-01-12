import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/**
 * Props:
 * - icon: string (Ionicons name)
 * - placeholder: string
 * - value: string
 * - onChange: (value: string) => void
 * - secureTextEntry?: boolean
 * - required?: boolean
 * - rightElement?: ReactNode
 * - keyboardType?: "default" | "email-address" | "phone-pad"
 */
export default function InputField({
    icon,
    placeholder,
    value,
    onChange,
    secureTextEntry = false,
    required = false,
    rightElement = null,
    keyboardType = "default",
}) {
    return (
        <View style={styles.container}>
            {icon && (
                <Ionicons
                    name={icon}
                    size={20}
                    color="#9ca3af"
                    style={styles.leftIcon}
                />
            )}

            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                placeholderTextColor="#9ca3af"
                style={[
                    styles.input,
                    icon && { paddingLeft: 42 },
                    rightElement && { paddingRight: 48 },
                ]}
            />

            {rightElement && (
                <View style={styles.rightElement}>{rightElement}</View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        marginBottom: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 14,
        fontSize: 15,
        backgroundColor: "#fff",
    },
    leftIcon: {
        position: "absolute",
        left: 14,
        top: "50%",
        marginTop: -10,
        zIndex: 2,
    },
    rightElement: {
        position: "absolute",
        right: 10,
        top: "50%",
        marginTop: -18,
        zIndex: 2,
    },
});

