import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ItemCard from "../components/ItemCard";
import { useItems } from "../context/ItemsContext";

export default function Index() {
  const { state } = useItems();

  return (
    <View style={styles.container}>
      <FlatList
        data={state.items}
        renderItem={({ item }) => <ItemCard item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  list: {
    padding: 8,
  },
});
