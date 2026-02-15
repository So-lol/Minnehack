import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Markdown from "react-native-markdown-display";
import EditItemForm from '../../components/EditItemForm';
import { useItems } from '../../context/ItemsContext';
import { Item } from '../../data/seedItems';
import { generateRepairSteps } from "../../utils/ai";

export default function ItemDetail() {
    const { id } = useLocalSearchParams();
    const itemId = Array.isArray(id) ? id[0] : id;
    const navigation = useNavigation();
    const { items, updateItem } = useItems();
    const [isEditing, setIsEditing] = useState(false);
    const [repairSteps, setRepairSteps] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const item = items.find((i) => i.id === itemId);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                !isEditing ? (
                    <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.headerButtonContainer}>
                        <Text style={styles.headerButtonText}>Edit</Text>
                    </TouchableOpacity>
                ) : null
            ),
            title: isEditing ? "Edit Item" : (item?.title || "Item Detail"),
        });
    }, [navigation, isEditing, item?.title, item]);

    if (!item) {
        return (
            <View style={styles.center}>
                <Text>Item not found</Text>
            </View>
        );
    }

    const handleUpdate = (updates: Partial<Item>) => {
        if (item) {
            updateItem(item.id, updates);
            setIsEditing(false);
        }
    };

    const handleGenerateRepairSteps = async () => {
        setLoading(true);
        setRepairSteps(null);
        try {
            const steps = await generateRepairSteps(item);
            setRepairSteps(steps);
        } catch (error) {
            console.error(error);
            setRepairSteps("Failed to generate repair steps. Please try again.");
        } finally {
            setLoading(false);
        }
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
        <>
            <Stack.Screen options={{ title: item.title }} />
            <ScrollView style={styles.container}>
                <Image
                    source={item.imageUri}
                    style={styles.image}
                    contentFit="cover"
                    transition={200}
                />
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.price}>{item.price}</Text>
                    </View>

                    <View style={styles.badges}>
                        <View style={styles.badge}>
                            <Text style={styles.badgeLabel}>Condition</Text>
                            <Text style={styles.badgeValue}>{item.condition}</Text>
                        </View>
                        <View style={styles.badge}>
                            <Text style={styles.badgeLabel}>Location</Text>
                            <Text style={styles.badgeValue}>{item.campusArea}</Text>
                        </View>
                    </View>

                    <Text style={styles.descriptionLabel}>Description</Text>
                    <Text style={styles.description}>{item.description}</Text>

                    <View style={styles.repairSection}>
                        <TouchableOpacity
                            style={styles.repairButton}
                            onPress={handleGenerateRepairSteps}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#ffffff" />
                            ) : (
                                <Text style={styles.repairButtonText}>
                                    Generate Repair Steps
                                </Text>
                            )}
                        </TouchableOpacity>

                        {repairSteps && (
                            <View>
                                <Text style={styles.repairTitle}>Repair Steps</Text>
                                <View style={styles.markdownContainer}>
                                    <Markdown style={markdownStyles}>{repairSteps}</Markdown>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const markdownStyles = {
    body: {
        fontSize: 16,
        lineHeight: 24,
        color: "#34495e",
    },
    heading3: {
        fontSize: 18,
        fontWeight: "bold" as const,
        marginTop: 16,
        marginBottom: 8,
        color: "#2c3e50",
    },
    strong: {
        fontWeight: "bold" as const,
        color: "#2c3e50",
    },
    list_item: {
        marginBottom: 8,
    },
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 300,
        backgroundColor: '#f5f5f5',
    },
    content: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 10,
        color: '#1a1a1a',
    },
    price: {
        fontSize: 24,
        fontWeight: '600',
        color: '#25bd65',
    },
    badges: {
        flexDirection: 'row',
        marginBottom: 24,
        gap: 16,
    },
    badge: {
        backgroundColor: '#f8f9fa',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        minWidth: 100,
        borderWidth: 1,
        borderColor: '#eee',
    },
    badgeLabel: {
        fontSize: 12,
        color: '#7f8c8d',
        marginBottom: 4,
    },
    badgeValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
    },
    descriptionLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#2c3e50',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#34495e',
    },
    headerButtonContainer: {
        marginRight: 10,
    },
    headerButtonText: {
        color: "#007AFF",
        fontSize: 17,
        fontWeight: "600",
    },
    repairSection: {
        marginTop: 30,
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingTop: 20,
    },
    repairButton: {
        backgroundColor: "#25bd65",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 20,
    },
    repairButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
    repairTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#2c3e50",
    },
    markdownContainer: {
        backgroundColor: "#f8f9fa",
        padding: 16,
        borderRadius: 8,
    },
    loadingContainer: {
        padding: 20,
        alignItems: "center",
    },
});
