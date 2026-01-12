import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/authSlice";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

export default function Login() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        emailOrPhone: "",
        password: "",
    });

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.emailOrPhone || !formData.password) {
            Alert.alert("Error", "Please fill all fields");
            return;
        }

        setLoading(true);

        try {
            const res = await dispatch(loginUser(formData));

            if (!res.error && res.payload?.success) {
                Alert.alert("Success", res.payload.message);

                const role = res.payload.user?.role;

                if (role === "courier") {
                    router.replace("/(courier-tabs)/dashboard");
                } else if (role === "admin") {
                    router.replace("/(admin)/dashboard");
                } else {
                    router.replace("/(customer-tabs)/home");
                }
            } else {
                Alert.alert("Login failed", res.payload?.message || "Invalid credentials");
            }
        } catch (err) {
            Alert.alert("Error", "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login!</Text>
            <Text style={styles.subtitle}>
                What's your phone number or email?
            </Text>

            <TextInput
                placeholder="Phone number or email"
                value={formData.emailOrPhone}
                onChangeText={(text) => handleChange("emailOrPhone", text)}
                style={styles.input}
            />

            <View style={styles.passwordWrapper}>
                <TextInput
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={formData.password}
                    onChangeText={(text) => handleChange("password", text)}
                    style={[styles.input, { paddingRight: 45 }]}
                />
                <Pressable
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Ionicons
                        name={showPassword ? "eye-off" : "eye"}
                        size={22}
                        color="#888"
                    />
                </Pressable>
            </View>

            <View style={styles.row}>
                <View>
                    <Text style={styles.smallText}>Don't have an account?</Text>
                    <Link href="/(auth)/signup" style={styles.link}>
                        Sign up
                    </Link>
                </View>

                <Pressable>
                    <Text style={styles.link}>Forgot password?</Text>
                </Pressable>
            </View>

            <Pressable
                onPress={handleSubmit}
                style={[styles.button, loading && styles.disabled]}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Continue</Text>
                )}
            </Pressable>

            <View style={styles.divider}>
                <View style={styles.line} />
                <Text style={styles.or}>OR</Text>
                <View style={styles.line} />
            </View>

            {/* Social buttons (UI only for now) */}
            <Pressable style={styles.socialButton}>
                <Text>Continue with Apple</Text>
            </Pressable>

            <Pressable style={styles.socialButton}>
                <Text>Continue with Google</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 28,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        textAlign: "center",
        color: "#666",
        marginBottom: 24,
    },
    input: {
        borderWidth: 1.5,
        borderColor: "#F17500",
        borderRadius: 10,
        padding: 14,
        marginBottom: 16,
    },
    passwordWrapper: {
        position: "relative",
    },
    eyeIcon: {
        position: "absolute",
        right: 12,
        top: 14,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    smallText: {
        fontSize: 12,
        color: "#555",
    },
    link: {
        fontSize: 12,
        color: "#F17500",
        textDecorationLine: "underline",
    },
    button: {
        backgroundColor: "#F17500",
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 20,
    },
    disabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
    },
    divider: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#ccc",
    },
    or: {
        marginHorizontal: 10,
        color: "#666",
    },
    socialButton: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 10,
    },
});

