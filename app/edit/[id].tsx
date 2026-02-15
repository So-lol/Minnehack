import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ItemForm from '../../components/ItemForm';
import { useItems } from '../../context/ItemsContext';
import { Item } from '../../data/seedItems';

export default function EditItem() {
    const { id } = useLocalSearchParams();
    const itemId = Array.isArray(id) ? id[0] : id;
    const router = useRouter();
    const { items, updateItem } = useItems();

    const item = items.find((i) => i.id === itemId);

    if (!item) {
        return (
            <View style={styles.center}>
                <Text>Item not found</Text>
            </View>
        );
    }

    const handleUpdate = (updates: Partial<Item>) => {
        updateItem(item.id, updates);
        router.back();
    };

    return (
        <ItemForm
            mode="edit"
            initialItem={item}
            onSubmit={handleUpdate}
            onCancel={() => router.back()}
        />
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});
