import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemCard from '../components/ItemCard';
import { useItems } from '../context/ItemsContext';

export default function Index() {
  const router = useRouter();
  const { items } = useItems();

  const handlePress = (id: string) => {
    router.push(`/item/${id}`);
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No items yet</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={() => router.push('/create')} style={styles.headerButton}>
              <Ionicons name="add-circle-outline" size={28} color="#007AFF" />
            </Pressable>
          ),
        }}
      />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard item={item} onPress={() => handlePress(item.id)} />
        )}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        columnWrapperStyle={styles.columnWrapper}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listContent: {
    padding: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#929fa0ff',
  },
  headerButton: {
    padding: 8,
  },
});
