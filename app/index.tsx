import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemCard from '../components/ItemCard';
import SearchBar from '../components/SearchBar';
import { useItems } from '../context/ItemsContext';
import { Item } from '../data/seedItems';

export default function Index() {
  const router = useRouter();
  const { items: contextItems } = useItems();
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedItems, setDisplayedItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setDisplayedItems(contextItems);
      return;
    }

    const filtered = contextItems.filter((item) => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.condition.toLowerCase().includes(query) ||
        item.campusArea.toLowerCase().includes(query)
      );
    });
    setDisplayedItems(filtered);
  }, [searchQuery, contextItems, isLoading]);

  const handlePress = (id: string) => {
    router.push(`/item/${id}`);
  };

  const renderEmpty = () => {
    if (isLoading) return null;

    if (searchQuery.trim().length > 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No results found</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No items yet</Text>
      </View>
    );
  };



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
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={displayedItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ItemCard item={item} onPress={() => handlePress(item.id)} />
          )}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View style={styles.searchContainer}>
              <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                onClear={() => setSearchQuery('')}
              />
            </View>
          }
          ListEmptyComponent={renderEmpty}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchContainer: {
    backgroundColor: '#fff',
    paddingBottom: 5,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});