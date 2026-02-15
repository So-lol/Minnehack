import { Image } from 'expo-image';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { Item } from '../data/seedItems';

interface ItemCardProps {
    item: Item;
    onPress: () => void;
}

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 32) / numColumns;

export default function ItemCard({ item, onPress }: ItemCardProps) {
    return (
        <Pressable onPress={onPress} style={styles.card}>
            <Image
                source={item.imageUri}
                style={styles.image}
                contentFit="cover"
                transition={200}
            />
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                </Text>
                <Text style={styles.price}>{item.price}</Text>
                <View style={styles.badges}>
                    <Text style={styles.badgeText}>{item.condition}</Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 6,
        overflow: 'hidden',
        maxWidth: cardWidth,
    },
    image: {
        width: '100%',
        height: 150,
        backgroundColor: '#ffffff',
    },
    content: {
        padding: 8,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    price: {
        fontSize: 14,
        color: '#25bd65ff',
        fontWeight: '600',
        marginBottom: 4,
    },
    badges: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    badgeText: {
        fontSize: 10,
        color: '#8a9a9cff',
        backgroundColor: '#ffffffff',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        overflow: 'hidden',
    }
});
