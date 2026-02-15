import { useRouter } from 'expo-router';
import ItemForm from '../components/ItemForm';
import { useItems } from '../context/ItemsContext';
import { Item } from '../data/seedItems';

export default function CreateItem() {
    const router = useRouter();
    const { addItem } = useItems();
    const handleCreate = (itemData: Omit<Item, 'id'>) => {
        addItem(itemData);
        router.back();
    };

    return (
        <ItemForm mode="add" onSubmit={handleCreate as any} />
    );
}
    );
}
