import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Gopher Exchange" }} />
      <Stack.Screen name="item/[id]" options={{ title: "Details" }} />
    </Stack>
  );
}
