import { Stack } from "expo-router";
import { ItemsProvider } from "../context/ItemsContext";

export default function RootLayout() {
  return (
    <ItemsProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Campus Marketplace" }} />
        <Stack.Screen name="item/[id]" options={{ title: "Details" }} />
      </Stack>
    </ItemsProvider>
  );
}
