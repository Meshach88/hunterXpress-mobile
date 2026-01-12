import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

/**
 * Props:
 * - icon: string (Ionicons name)
 * - placeholder: string
 * - value: string
 * - onChange: (value) => void
 * - options: string[]
 */
export default function SelectField({
    icon,
    placeholder,
    value,
    onChange,
    options = [],
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

            <Picker
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
                style={[
                    styles.picker,
                    icon && { paddingLeft: 42 },
                ]}
            >
                <Picker.Item label={placeholder} value="" />
                {options.map((option, index) => (
                    <Picker.Item key={index} label={option} value={option} />
                ))}
            </Picker>

            <Ionicons
                name="chevron-down"
                size={20}
                color="#9ca3af"
                style={styles.rightIcon}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 8,
        marginBottom: 14,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#fff",
    },
    picker: {
        height: 52,
        paddingHorizontal: 14,
        color: "#111827",
    },
    leftIcon: {
        position: "absolute",
        left: 14,
        top: "50%",
        marginTop: -10,
        zIndex: 2,
    },
    rightIcon: {
        position: "absolute",
        right: 12,
        top: "50%",
        marginTop: -10,
        pointerEvents: "none",
    },
});
