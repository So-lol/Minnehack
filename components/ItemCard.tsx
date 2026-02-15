import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Item } from "../constants/mockData";

export default function ItemCard({ item }: { item: Item }) {
    return (

        <Link
            href={{
                pathname: "/items/[id]",
                params: { id: item.id },
            }}
            asChild
        >
            <TouchableOpacity style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={1}>
                        {item.title}
                    </Text>
                    <Text style={styles.price}>${item.cost}</Text>
                    <Text style={styles.condition}>{item.condition}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 8,
        backgroundColor: "white",
        borderRadius: 8,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: 120,
        backgroundColor: "#eee",
    },
    info: {
        padding: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    price: {
        fontSize: 14,
        color: "#2e7d32",
        marginBottom: 2,
    },
    condition: {
        fontSize: 12,
        color: "#666",
    },
});
