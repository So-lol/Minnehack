import { Image } from 'expo-image';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useItems } from '../../context/ItemsContext';
import { generateRepairSteps, RepairData } from "../../utils/ai";

export default function ItemDetail() {
    const { id } = useLocalSearchParams();
    const itemId = Array.isArray(id) ? id[0] : id;
    const { items } = useItems();
    const [repairData, setRepairData] = useState<RepairData | null>(null);
    const [loading, setLoading] = useState(false);

    const item = items.find((i) => i.id === itemId);

    useLayoutEffect(() => {
        if (!item) return;

        // No custom options needed for title/header visibility since we aren't inline editing anymore
        // But we DO want the Edit button
    }, [item]);

    if (!item) {
        return (
            <View style={styles.center}>
                <Text>Item not found</Text>
            </View>
        );
    }

    const handleGenerateRepairSteps = async () => {
        setLoading(true);
        setRepairData(null);
        try {
            const data = await generateRepairSteps(item);
            setRepairData(data);
        } catch (error) {
            console.error(error);
            // Ideally show error toast
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: item.title,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => router.push(`/edit/${item.id}` as any)} style={styles.headerButtonContainer}>
                            <Text style={styles.headerButtonText}>Edit</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
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
                        {item.email && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeLabel}>Contact</Text>
                                <Text style={styles.badgeValue} numberOfLines={1}>{item.email}</Text>
                            </View>
                        )}
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

                        {repairData && (
                            <View>
                                <Text style={styles.repairTitle}>Repair Guide</Text>

                                {repairData.steps.map((step) => (
                                    <View key={step.stepNumber} style={styles.stepCard}>
                                        <Text style={styles.stepHeader}>Step {step.stepNumber}: {step.title}</Text>

                                        <View style={styles.stepContent}>
                                            <View style={styles.stepTextContainer}>
                                                <Text style={styles.stepDescription}>{step.description}</Text>
                                                {step.tools && step.tools.length > 0 && (
                                                    <Text style={styles.toolsText}>Tools: {step.tools.join(", ")}</Text>
                                                )}
                                                {step.links && step.links.length > 0 && (
                                                    <View style={styles.linksContainer}>
                                                        {step.links.map((link, idx) => (
                                                            <Text
                                                                key={idx}
                                                                style={styles.linkText}
                                                                onPress={() => Linking.openURL(link.url)}
                                                            >
                                                                {link.text}
                                                            </Text>
                                                        ))}
                                                    </View>
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                ))}

                                <View style={styles.costTable}>
                                    <Text style={styles.costTitle}>Estimated Costs</Text>
                                    <View style={styles.tableHeader}>
                                        <Text style={[styles.tableCell, styles.tableHeaderCell, { flex: 2 }]}>Item</Text>
                                        <Text style={[styles.tableCell, styles.tableHeaderCell, { flex: 1 }]}>Cost</Text>
                                        <Text style={[styles.tableCell, styles.tableHeaderCell, { flex: 1 }]}>Source</Text>
                                    </View>
                                    {repairData.costTable.map((item, idx) => (
                                        <View key={idx} style={styles.tableRow}>
                                            <Text style={[styles.tableCell, { flex: 2 }]}>{item.item}</Text>
                                            <Text style={[styles.tableCell, { flex: 1 }]}>{item.cost}</Text>
                                            <Text style={[styles.tableCell, { flex: 1 }]}>{item.source}</Text>
                                        </View>
                                    ))}
                                    <View style={[styles.tableRow, styles.totalRow]}>
                                        <Text style={[styles.tableCell, styles.totalText, { flex: 2 }]}>Total Estimated</Text>
                                        <Text style={[styles.tableCell, styles.totalText, { flex: 2 }]}>{repairData.totalCost}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

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
        paddingBottom: 40,
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
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#2c3e50",
    },
    stepCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#eee",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    stepHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
        color: "#2c3e50",
    },
    stepContent: {
        flexDirection: "row",
        gap: 12,
    },
    stepTextContainer: {
        flex: 1,
    },
    stepDescription: {
        fontSize: 15,
        lineHeight: 22,
        color: "#34495e",
        marginBottom: 8,
    },
    toolsText: {
        fontSize: 13,
        color: "#7f8c8d",
        fontWeight: "500",
        marginBottom: 8,
        fontStyle: "italic",
    },
    linksContainer: {
        flexDirection: "column",
        gap: 4,
    },
    linkText: {
        fontSize: 14,
        color: "#007AFF",
        textDecorationLine: "underline",
    },
    costTable: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 8,
        overflow: "hidden",
    },
    costTitle: {
        fontSize: 18,
        fontWeight: "bold",
        padding: 12,
        backgroundColor: "#f8f9fa",
        color: "#2c3e50",
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#f1f2f6",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    tableCell: {
        padding: 10,
        fontSize: 14,
        color: "#34495e",
    },
    tableHeaderCell: {
        fontWeight: "bold",
        color: "#2c3e50",
    },
    totalRow: {
        backgroundColor: "#f8f9fa",
        borderBottomWidth: 0,
    },
    totalText: {
        fontWeight: "bold",
        fontSize: 15,
    },
    loadingContainer: {
        padding: 20,
        alignItems: "center",
    },
});
