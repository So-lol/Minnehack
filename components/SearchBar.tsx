import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    onClear: () => void;
    placeholder?: string;
}

export default function SearchBar({
    value,
    onChangeText,
    onClear,
    placeholder = 'Search for items...',
}: SearchBarProps) {
    return (
        <View style={styles.container}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#999"
                returnKeyType="search"
                clearButtonMode="never"
            />
            {value.length > 0 && (
                <TouchableOpacity onPress={onClear} style={styles.clearButton} accessible={true} accessibilityLabel="Clear search">
                    <Ionicons name="close-circle" size={20} color="#666" />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dededeff',
        borderRadius: 10,
        paddingHorizontal: 10,
        margin: 10,
        height: 40,
    },
    searchIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        height: '100%',
    },
    clearButton: {
        padding: 4,
    },
});