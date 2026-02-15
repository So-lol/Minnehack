import { Image } from 'expo-image';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

interface ItemCardProps {
    item: any; // Using any temporarily to avoid strict type mismatch during conflict resolution
    onPress: () => void;
}

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 32) / numColumns;

export default function ItemCard({ item, onPress }: ItemCardProps) {
    return (
        <Pressable onPress={onPress} style={styles.card}>
            <Image
                source={item.image}
                style={styles.image}
                contentFit="cover"
                transition={200}
            />
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                </Text>
                <Text style={styles.price}>${item.cost}</Text>
                <View style={styles.badges}>
                    <Text style={styles.badgeText}>{item.condition}</Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 6,
        overflow: 'hidden',
        maxWidth: cardWidth,
        flex: 1,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: {
        width: '100%',
        height: 150,
        backgroundColor: '#eee',
    },
    content: {
        padding: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    price: {
        fontSize: 14,
        color: '#25bd65',
        fontWeight: '600',
        marginBottom: 4,
    },
    badges: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    badgeText: {
        fontSize: 10,
        color: '#8a9a9c',
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        overflow: 'hidden',
    }
});
