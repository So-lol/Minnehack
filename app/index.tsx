import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemCard from '../components/ItemCard';
import SearchBar from '../components/SearchBar';
import { useItems } from '../context/ItemsContext';
import { CONDITIONS, Item, LOCATIONS } from '../data/seedItems';

export default function Index() {
  const router = useRouter();
  const { items: contextItems } = useItems();
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedItems, setDisplayedItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter State
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    let filtered = contextItems;

    // 1. Text Search
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      filtered = filtered.filter((item) => {
        return (
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.condition.toLowerCase().includes(query) ||
          item.campusArea.toLowerCase().includes(query)
        );
      });
    }

    // 2. Condition Filter
    if (selectedCondition) {
      filtered = filtered.filter((item) => item.condition === selectedCondition);
    }

    // 3. Location Filter
    if (selectedLocation) {
      filtered = filtered.filter((item) => item.campusArea === selectedLocation);
    }

    setDisplayedItems(filtered);
  }, [searchQuery, selectedCondition, selectedLocation, contextItems, isLoading]);

  const handlePress = (id: string) => {
    router.push(`/item/${id}`);
  };

  const clearFilters = () => {
    setSelectedCondition(null);
    setSelectedLocation(null);
    // Optional: Clear search too? Plan says "resets filters", usually implies distinct from search, 
    // but often users want all generic resets. I'll stick to resetting specific filters as requested.
  };

  const renderEmpty = () => {
    if (isLoading) return null;

    const hasFilters = selectedCondition || selectedLocation || searchQuery.trim().length > 0;

    if (hasFilters) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No items match your filters</Text>
          <Pressable onPress={clearFilters} style={styles.clearButtonEmpty}>
            <Text style={styles.clearButtonTextEmpty}>Clear filters</Text>
          </Pressable>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No items yet</Text>
      </View>
    );
  };

  const FilterChip = ({ label, selected, onPress }: { label: string, selected: boolean, onPress: () => void }) => (
    <Pressable
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <Stack.Screen
        options={{
          headerTitle: 'Marketplace',
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
            <View style={styles.headerContainer}>
              <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                onClear={() => setSearchQuery('')}
              />

              <View style={styles.filtersSection}>
                <View style={styles.filterRow}>
                  <Text style={styles.filterLabel}>Condition:</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                    <FilterChip
                      label="All"
                      selected={selectedCondition === null}
                      onPress={() => setSelectedCondition(null)}
                    />
                    {CONDITIONS.map((cond) => (
                      <FilterChip
                        key={cond}
                        label={cond}
                        selected={selectedCondition === cond}
                        onPress={() => setSelectedCondition(cond)}
                      />
                    ))}
                  </ScrollView>
                </View>

                <View style={styles.filterRow}>
                  <Text style={styles.filterLabel}>Location:</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                    <FilterChip
                      label="All"
                      selected={selectedLocation === null}
                      onPress={() => setSelectedLocation(null)}
                    />
                    {LOCATIONS.map((loc) => (
                      <FilterChip
                        key={loc}
                        label={loc}
                        selected={selectedLocation === loc}
                        onPress={() => setSelectedLocation(loc)}
                      />
                    ))}
                  </ScrollView>
                </View>

                {(selectedCondition || selectedLocation) && (
                  <Pressable onPress={clearFilters} style={styles.clearFiltersBtn}>
                    <Text style={styles.clearFiltersText}>Clear All Filters</Text>
                  </Pressable>
                )}
              </View>
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
  headerContainer: {
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  filtersSection: {
    marginTop: 10,
    gap: 12,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginRight: 8,
    width: 70,
  },
  filterScroll: {
    paddingRight: 20,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  chipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  chipText: {
    fontSize: 13,
    color: '#333',
  },
  chipTextSelected: {
    color: '#fff',
    fontWeight: '500',
  },
  clearFiltersBtn: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 5,
  },
  clearFiltersText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
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
    marginBottom: 10,
  },
  clearButtonEmpty: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  clearButtonTextEmpty: {
    color: '#fff',
    fontWeight: '500',
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
