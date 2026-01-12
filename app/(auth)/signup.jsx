import { ScrollView, View, Text, Pressable, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import InputField from "../../components/form/InputField";
import SelectField from "../../components/form/SelectField";
import FileUploadField from "../../components/form/FileUploadField";
import * as ImagePicker from "expo-image-picker";
import { registerUser } from "../../store/authSlice";

export default function SignUp() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [role, setRole] = useState("User"); // User or Courier
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
    password: "",
    pickUpAddress: "",
    address: "",
    plateNumber: "",
    model: "",
    color: "",
    validId: null,
    proofOfAddress: null,
    deliveryMethod: "",
    payoutMethod: "",
    bankName: "",
    accountNumber: ""
  });

  const handleInputChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const sendOTP = () => {
    console.log("Send OTP to:", formData.phone);
  };

  const pickImage = async (field) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const file = result.assets[0];
      handleInputChange(field, {
        uri: file.uri,
        name: "upload.jpg",
        type: "image/jpeg",
      });
    }
  };

  const handleSignup = async () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (value !== undefined && value !== null) {
        data.append(key, value?.uri ? value : value);
      }
    });

    const res = await dispatch(registerUser(data));
    if (!res.error) router.push("/(auth)/confirm");
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {/* Role Toggle */}
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        {["User", "Courier"].map((r) => (
          <Pressable
            key={r}
            onPress={() => setRole(r)}
            style={{
              flex: 1,
              padding: 12,
              marginHorizontal: 5,
              backgroundColor: role === r ? "#F97316" : "#fff",
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text style={{ color: role === r ? "#fff" : "#F97316", fontWeight: "600" }}>
              {r}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Common Fields */}
      <InputField
        icon="person-outline"
        placeholder="Full Name"
        value={formData.name}
        onChange={(v) => handleInputChange("name", v)}
      />
      <InputField
        icon="mail-outline"
        placeholder="Email"
        value={formData.email}
        onChange={(v) => handleInputChange("email", v)}
      />
      <InputField
        icon="call-outline"
        placeholder="Phone number"
        value={formData.phone}
        onChange={(v) => handleInputChange("phone", v)}
        rightElement={
          <Pressable onPress={sendOTP} style={{ paddingHorizontal: 8 }}>
            <Text style={{ color: "#F97316", fontWeight: "600" }}>Send OTP</Text>
          </Pressable>
        }
      />
      <InputField
        icon="key-outline"
        placeholder="OTP"
        value={formData.otp}
        onChange={(v) => handleInputChange("otp", v)}
      />
      <InputField
        icon="lock-closed-outline"
        placeholder="Password"
        secureTextEntry={!showPassword}
        value={formData.password}
        onChange={(v) => handleInputChange("password", v)}
        rightElement={
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Text style={{ color: "#9CA3AF" }}>{showPassword ? "Hide" : "Show"}</Text>
          </Pressable>
        }
      />

      {/* Conditional Fields */}
      {role === "User" ? (
        <>
          <InputField
            icon="home-outline"
            placeholder="Default Pickup Address"
            value={formData.pickUpAddress}
            onChange={(v) => handleInputChange("pickUpAddress", v)}
          />
          <InputField
            icon="navigate-outline"
            placeholder="Delivery Address"
            value={formData.address}
            onChange={(v) => handleInputChange("address", v)}
          />
        </>
      ) : (
        <>
          <InputField
            icon="car-outline"
            placeholder="Plate Number"
            value={formData.plateNumber}
            onChange={(v) => handleInputChange("plateNumber", v)}
          />
          <InputField
            icon="car-sport-outline"
            placeholder="Model"
            value={formData.model}
            onChange={(v) => handleInputChange("model", v)}
          />
          <InputField
            icon="color-palette-outline"
            placeholder="Color"
            value={formData.color}
            onChange={(v) => handleInputChange("color", v)}
          />
          <FileUploadField
            placeholder="Valid ID / License"
            value={formData.validId}
            onChange={(v) => handleInputChange("validId", v)}
          />
          <FileUploadField
            placeholder="Proof of Address"
            value={formData.proofOfAddress}
            onChange={(v) => handleInputChange("proofOfAddress", v)}
          />
          <SelectField
            icon="bicycle-outline"
            placeholder="Delivery Method"
            value={formData.deliveryMethod}
            onChange={(v) => handleInputChange("deliveryMethod", v)}
            options={["Bike", "Car", "Van", "Truck"]}
          />
          <SelectField
            icon="cash-outline"
            placeholder="Payout Method"
            value={formData.payoutMethod}
            onChange={(v) => handleInputChange("payoutMethod", v)}
            options={["Bank Transfer", "PayStack", "Cash Pickup"]}
          />
          <InputField
            icon="bank-outline"
            placeholder="Bank Name"
            value={formData.bankName}
            onChange={(v) => handleInputChange("bankName", v)}
          />
          <InputField
            icon="card-outline"
            placeholder="Account Number"
            value={formData.accountNumber}
            onChange={(v) => handleInputChange("accountNumber", v)}
          />
        </>
      )}

      {/* Submit */}
      <Pressable
        onPress={handleSignup}
        style={{
          marginTop: 20,
          backgroundColor: "#F97316",
          padding: 16,
          alignItems: "center",
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>Sign Up</Text>
      </Pressable>
    </ScrollView>
  );
}
