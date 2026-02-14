import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#7A0019", // Maroon accent
        }}
      >
        Goldy Change
      </Text>
    </View>
  );
}
