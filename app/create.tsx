import { Picker } from '@react-native-picker/picker';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActionSheetIOS, Button, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { useItems } from '../context/ItemsContext';

export default function CreateItem() {
    const router = useRouter();
    const { addItem } = useItems();
    const [image, setImage] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [condition, setCondition] = useState('Working');
    const [campusArea, setCampusArea] = useState('East Bank');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [4, 3], quality: 1 });
        if (!result.canceled) setImage(result.assets[0].uri);
    };

    const handleCreate = () => {
        if (!image || !title || !description || !email) return alert('Fill all fields');
        addItem({
            title,
            description,
            imageUri: image,
            price: 'Free',
            condition,
            campusArea,
            email,
        });
        router.back();
    };

    const showConditionPicker = () => {
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ['Cancel', 'Working', 'Broken', 'For parts', 'Excellent', 'Good', 'Fair'],
                    cancelButtonIndex: 0,
                },
                (buttonIndex) => {
                    if (buttonIndex === 1) setCondition('Working');
                    if (buttonIndex === 2) setCondition('Broken');
                    if (buttonIndex === 3) setCondition('For parts');
                    if (buttonIndex === 4) setCondition('Excellent');
                    if (buttonIndex === 5) setCondition('Good');
                    if (buttonIndex === 6) setCondition('Fair');
                }
            );
        }
    };

    const showLocationPicker = () => {
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ['Cancel', 'East Bank', 'West Bank', 'St Paul', 'Superblock', 'Dinkytown'],
                    cancelButtonIndex: 0,
                },
                (buttonIndex) => {
                    if (buttonIndex === 1) setCampusArea('East Bank');
                    if (buttonIndex === 2) setCampusArea('West Bank');
                    if (buttonIndex === 3) setCampusArea('St Paul');
                    if (buttonIndex === 4) setCampusArea('Superblock');
                    if (buttonIndex === 5) setCampusArea('Dinkytown');
                }
            );
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Pressable onPress={pickImage} style={styles.imageBox}>
                {image ? <Image source={{ uri: image }} style={styles.img} /> : <Text>Select Image</Text>}
            </Pressable>

            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />

            <Text style={styles.label}>Email (UMN)</Text>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />

            <Text style={styles.label}>Condition</Text>
            {Platform.OS === 'ios' ? (
                <Pressable onPress={showConditionPicker} style={styles.input}>
                    <Text>{condition}</Text>
                </Pressable>
            ) : (
                <View style={styles.pickerContainer}>
                    <Picker selectedValue={condition} onValueChange={(itemValue) => setCondition(itemValue)}>
                        <Picker.Item label="Working" value="Working" />
                        <Picker.Item label="Broken" value="Broken" />
                        <Picker.Item label="For parts" value="For parts" />
                        <Picker.Item label="Excellent" value="Excellent" />
                        <Picker.Item label="Good" value="Good" />
                        <Picker.Item label="Fair" value="Fair" />
                    </Picker>
                </View>
            )}

            <Text style={styles.label}>Location</Text>
            {Platform.OS === 'ios' ? (
                <Pressable onPress={showLocationPicker} style={styles.input}>
                    <Text>{campusArea}</Text>
                </Pressable>
            ) : (
                <View style={styles.pickerContainer}>
                    <Picker selectedValue={campusArea} onValueChange={(itemValue) => setCampusArea(itemValue)}>
                        <Picker.Item label="East Bank" value="East Bank" />
                        <Picker.Item label="West Bank" value="West Bank" />
                        <Picker.Item label="St Paul" value="St Paul" />
                        <Picker.Item label="Superblock" value="Superblock" />
                        <Picker.Item label="Dinkytown" value="Dinkytown" />
                    </Picker>
                </View>
            )}

            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} multiline />

            <Button title="Add" onPress={handleCreate} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    imageBox: { height: 200, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderRadius: 10 },
    img: { width: '100%', height: '100%', borderRadius: 10 },
    label: { fontWeight: 'bold', marginBottom: 5 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5, justifyContent: 'center' },
    pickerContainer: { borderWidth: 1, borderColor: '#ccc', marginBottom: 15, borderRadius: 5 },
});
