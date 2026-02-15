import { Stack } from "expo-router";
import { ItemsProvider } from "../context/ItemsContext";

export default function RootLayout() {
  return (
    <ItemsProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Gopher Exchange" }} />
        <Stack.Screen name="item/[id]" options={{ title: "Details" }} />
        <Stack.Screen name="create" options={{ presentation: 'modal', title: 'List Item' }} />
        <Stack.Screen name="edit/[id]" options={{ presentation: 'modal', title: 'List Item' }} />
      </Stack>
    </ItemsProvider>
  );
}
