import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import EditItemForm from "../../components/EditItemForm";
import { Item } from "../../constants/mockData";
import { useItems } from "../../context/ItemsContext";

export default function ItemDetail() {
    const { id } = useLocalSearchParams();
    const itemId = Array.isArray(id) ? id[0] : id;
    const navigation = useNavigation();
    const { state, updateItem } = useItems();
    const [isEditing, setIsEditing] = useState(false);

    const item = state.items.find((i) => i.id === itemId);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                !isEditing ? (
                    <TouchableOpacity onPress={() => setIsEditing(true)}>
                        <Text style={styles.headerButton}>Edit</Text>
                    </TouchableOpacity>
                ) : null
            ),
            title: isEditing ? "Edit Item" : "Item Detail",
        });
    }, [navigation, isEditing]);

    if (!item) {
        return (
            <View style={styles.center}>
                <Text>Item not found</Text>
            </View>
        );
    }

    const handleUpdate = (updates: Partial<Item>) => {
        updateItem(item.id, updates);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <EditItemForm
                item={item}
                onSubmit={handleUpdate}
                onCancel={() => setIsEditing(false)}
            />
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.cost}</Text>

                <View style={styles.badgeContainer}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.condition}</Text>
                    </View>
                    <View style={[styles.badge, styles.locationBadge]}>
                        <Text style={styles.badgeText}>{item.campusArea}</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: 250,
        backgroundColor: "#eee",
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    price: {
        fontSize: 20,
        color: "#2e7d32",
        fontWeight: "bold",
        marginBottom: 16,
    },
    badgeContainer: {
        flexDirection: "row",
        marginBottom: 24,
    },
    badge: {
        backgroundColor: "#eee",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginRight: 8,
    },
    locationBadge: {
        backgroundColor: "#e3f2fd",
    },
    badgeText: {
        fontSize: 14,
        color: "#444",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: "#333",
    },
    headerButton: {
        color: "#007AFF",
        fontSize: 17,
        fontWeight: "600",
    },
});
