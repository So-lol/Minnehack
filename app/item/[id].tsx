import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { items } from '../../data/seedItems';

export default function ItemDetail() {
    const { id } = useLocalSearchParams();
    const item = items.find((i) => i.id === id);

    if (!item) {
        return (
            <View style={styles.center}>
                <Text>Item not found</Text>
            </View>
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
        backgroundColor: '#ffffff',
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
    },
    price: {
        fontSize: 24,
        fontWeight: '600',
        color: '#25bd65ff',
    },
    badges: {
        flexDirection: 'row',
        marginBottom: 24,
        gap: 16,
    },
    badge: {
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        minWidth: 100,
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
});
