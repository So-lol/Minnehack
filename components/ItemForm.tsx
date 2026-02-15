import { Picker } from '@react-native-picker/picker';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
    ActionSheetIOS,
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { Item } from '../data/seedItems';

interface ItemFormProps {
    mode: 'add' | 'edit';
    initialItem?: Item;
    onSubmit: (itemData: Omit<Item, 'id'> | Partial<Item>) => void;
    onCancel?: () => void;
}

export default function ItemForm({ mode, initialItem, onSubmit, onCancel }: ItemFormProps) {
    const [image, setImage] = useState<string | number | null>(initialItem?.imageUri || null);
    const [title, setTitle] = useState(initialItem?.title || '');
    const [email, setEmail] = useState(initialItem?.email || '');
    const [condition, setCondition] = useState(initialItem?.condition || 'Good');
    const [campusArea, setCampusArea] = useState(initialItem?.campusArea || 'East Bank');
    const [description, setDescription] = useState(initialItem?.description || '');

    const emailInputRef = React.useRef<TextInput>(null);
    const descriptionInputRef = React.useRef<TextInput>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSubmit = () => {
        if (!image || !title || !description || !email) {
            Alert.alert('Error', 'Please fill in all required fields.');
            return;
        }

        const itemData = {
            title,
            description,
            imageUri: image,
            price: initialItem?.price || 'Free',
            condition,
            campusArea,
            email,
        };

        onSubmit(itemData);
    };

    const showConditionPicker = () => {
        const options = ['Cancel', 'Bad', 'Good', 'Great', 'Excellent', 'Fair', 'Working', 'Broken', 'For parts'];
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: options,
                    cancelButtonIndex: 0,
                },
                (buttonIndex) => {
                    if (buttonIndex > 0) {
                        setCondition(options[buttonIndex]);
                    }
                }
            );
        }
    };

    const showLocationPicker = () => {
        const options = ['Cancel', 'East Bank', 'West Bank', 'St Paul', 'Superblock', 'Dinkytown', 'Mall Area', 'Stadium Village'];
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: options,
                    cancelButtonIndex: 0,
                },
                (buttonIndex) => {
                    if (buttonIndex > 0) {
                        setCampusArea(options[buttonIndex]);
                    }
                }
            );
        }
    };

    const actionLabel = mode === 'add' ? 'Add' : 'Save';

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    style={styles.container}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>List Item</Text>
                    </View>

                    <Pressable onPress={pickImage} style={styles.imageBox}>
                        {image ? (
                            <Image source={typeof image === 'number' ? image : { uri: image }} style={styles.img} />
                        ) : (
                            <Text style={styles.selectImageText}>Select Image</Text>
                        )}
                    </Pressable>

                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                        returnKeyType="next"
                        onSubmitEditing={() => emailInputRef.current?.focus()}
                        blurOnSubmit={false}
                    />

                    <Text style={styles.label}>Email (UMN)</Text>
                    <TextInput
                        ref={emailInputRef}
                        style={styles.input}
                        placeholder="jdoe@umn.edu"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        returnKeyType="next"
                        onSubmitEditing={() => descriptionInputRef.current?.focus()}
                        blurOnSubmit={false}
                    />

                    <Text style={styles.label}>Condition</Text>
                    {Platform.OS === 'ios' ? (
                        <Pressable onPress={showConditionPicker} style={styles.input}>
                            <Text>{condition}</Text>
                        </Pressable>
                    ) : (
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={condition}
                                onValueChange={(itemValue) => setCondition(itemValue)}
                            >
                                <Picker.Item label="Bad" value="Bad" />
                                <Picker.Item label="Good" value="Good" />
                                <Picker.Item label="Great" value="Great" />
                                <Picker.Item label="Excellent" value="Excellent" />
                                <Picker.Item label="Fair" value="Fair" />
                                <Picker.Item label="Working" value="Working" />
                                <Picker.Item label="Broken" value="Broken" />
                                <Picker.Item label="For parts" value="For parts" />
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
                            <Picker
                                selectedValue={campusArea}
                                onValueChange={(itemValue) => setCampusArea(itemValue)}
                            >
                                <Picker.Item label="East Bank" value="East Bank" />
                                <Picker.Item label="West Bank" value="West Bank" />
                                <Picker.Item label="St Paul" value="St Paul" />
                                <Picker.Item label="Superblock" value="Superblock" />
                                <Picker.Item label="Dinkytown" value="Dinkytown" />
                                <Picker.Item label="Mall Area" value="Mall Area" />
                                <Picker.Item label="Stadium Village" value="Stadium Village" />
                            </Picker>
                        </View>
                    )}

                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        ref={descriptionInputRef}
                        style={[styles.input, styles.multilineInput]}
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        returnKeyType="done"
                        blurOnSubmit={true}
                    />

                    <TouchableOpacity style={styles.actionButton} onPress={handleSubmit}>
                        <Text style={styles.actionButtonText}>{actionLabel}</Text>
                    </TouchableOpacity>

                    {onCancel && (
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    )}

                    <View style={styles.footerSpacer} />
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
    },
    imageBox: {
        height: 200,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        borderRadius: 12,
        overflow: 'hidden',
    },
    img: {
        width: '100%',
        height: '100%',
    },
    selectImageText: {
        color: '#8e8e93',
        fontSize: 16,
    },
    label: {
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#e5e5e5',
        padding: 12,
        marginBottom: 20,
        borderRadius: 8,
        justifyContent: 'center',
        fontSize: 16,
        backgroundColor: '#fff',
    },
    multilineInput: {
        height: 120,
        textAlignVertical: 'top',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#e5e5e5',
        marginBottom: 20,
        borderRadius: 8,
    },
    actionButton: {
        padding: 16,
        alignItems: 'center',
        marginTop: 10,
    },
    actionButtonText: {
        color: '#007AFF',
        fontSize: 18,
        fontWeight: '500',
    },
    cancelButton: {
        padding: 16,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#8e8e93',
        fontSize: 16,
    },
    footerSpacer: {
        height: 40,
    },
});
