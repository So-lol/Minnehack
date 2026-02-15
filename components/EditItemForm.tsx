import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Item } from "../data/seedItems";

interface EditItemFormProps {
    item: Item;
    onSubmit: (updates: Partial<Item>) => void;
    onCancel: () => void;
}

export default function EditItemForm({ item, onSubmit, onCancel }: EditItemFormProps) {
    const [title, setTitle] = useState(item.title);
    const [description, setDescription] = useState(item.description);
    const [price, setPrice] = useState(item.price.replace('$', ''));
    const [condition, setCondition] = useState<string>(item.condition);
    const [campusArea, setCampusArea] = useState<string>(item.campusArea);

    const handleSave = () => {
        if (!title.trim() || !description.trim() || !price.trim()) {
            Alert.alert("Error", "Please fill in all required fields.");
            return;
        }

        const numericPrice = price.replace('$', '');
        if (numericPrice.toLowerCase() !== "free" && isNaN(Number(numericPrice))) {
            Alert.alert("Error", "Price must be a number or 'Free'.");
            return;
        }

        onSubmit({
            title,
            description,
            price: numericPrice.toLowerCase() === 'free' ? 'Free' : `$${numericPrice}`,
            condition,
            campusArea,
        });
    };

    const renderOption = (
        label: string,
        value: string,
        currentValue: string,
        onSelect: (val: any) => void
    ) => (
        <TouchableOpacity
            style={[
                styles.optionButton,
                currentValue === value && styles.optionButtonSelected,
            ]}
            onPress={() => onSelect(value)}
        >
            <Text
                style={[
                    styles.optionText,
                    currentValue === value && styles.optionTextSelected,
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Item Title"
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
                style={[styles.input, styles.multilineInput]}
                value={description}
                onChangeText={setDescription}
                placeholder="Description"
                multiline
            />

            <Text style={styles.label}>Price</Text>
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="Price (e.g. 10 or Free)"
                keyboardType="default"
            />

            <Text style={styles.label}>Condition</Text>
            <View style={styles.optionsContainer}>
                {renderOption("Working", "Working", condition, setCondition)}
                {renderOption("Broken", "Broken", condition, setCondition)}
                {renderOption("For parts", "For parts", condition, setCondition)}
                {renderOption("Excellent", "Excellent", condition, setCondition)}
                {renderOption("Good", "Good", condition, setCondition)}
                {renderOption("Fair", "Fair", condition, setCondition)}
            </View>

            <Text style={styles.label}>Campus Area</Text>
            <View style={styles.optionsContainer}>
                {renderOption("East Bank", "East Bank", campusArea, setCampusArea)}
                {renderOption("West Bank", "West Bank", campusArea, setCampusArea)}
                {renderOption("St Paul", "St Paul", campusArea, setCampusArea)}
                {renderOption("Superblock", "Superblock", campusArea, setCampusArea)}
                {renderOption("Dinkytown", "Dinkytown", campusArea, setCampusArea)}
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                    <Text style={[styles.buttonText, styles.saveButtonText]}>Save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
        marginTop: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: "#fafafa",
    },
    multilineInput: {
        minHeight: 100,
        textAlignVertical: "top",
    },
    optionsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    optionButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#fff",
    },
    optionButtonSelected: {
        backgroundColor: "#007AFF",
        borderColor: "#007AFF",
    },
    optionText: {
        color: "#333",
    },
    optionTextSelected: {
        color: "#fff",
        fontWeight: "bold",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginBottom: 40,
    },
    button: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 8,
    },
    cancelButton: {
        backgroundColor: "#f0f0f0",
    },
    saveButton: {
        backgroundColor: "#007AFF",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    saveButtonText: {
        color: "#fff",
    },
});
