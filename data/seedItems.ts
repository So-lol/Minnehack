export interface Item {
  id: string;
  title: string;
  description: string;
  imageUri: string;
  price: string;
  condition: string;
  campusArea: string;
  email: string;
}

export const items: Item[] = [
  {
    id: '7',
    title: 'Broken iPad',
    description: 'Screen is cracked but still turns on. Touch works intermittently. Good for parts or repair.',
    imageUri: 'https://images.unsplash.com/photo-1565345722420-72c0874e403d?q=80&w=1000&auto=format&fit=crop',
    price: 'Free',
    condition: 'Broken',
    campusArea: 'East Bank',
    email: 'tech_fixer@umn.edu',
  },
  {
    id: '8',
    title: 'Broken Apple Watch',
    description: 'Series 3. Screen popped off. Battery might still be good. Selling as is.',
    imageUri: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop',
    price: 'Free',
    condition: 'Broken',
    campusArea: 'St Paul',
    email: 'watch_parts@umn.edu',
  },
  {
    id: '9',
    title: 'Broken MacBook Pro',
    description: '2015 model. Logic board failure. Screen and keyboard are in good condition. No charger.',
    imageUri: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=1000&auto=format&fit=crop',
    price: 'Free',
    condition: 'For parts',
    campusArea: 'West Bank',
    email: 'mac_parts@umn.edu',
  },
  {
    id: '10',
    title: 'Old Desktop Computer',
    description: 'Doesn\'t turn on. Probably power supply issue. Case and other components might be useful.',
    imageUri: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?q=80&w=1000&auto=format&fit=crop',
    price: 'Free',
    condition: 'Broken',
    campusArea: 'Dinkytown',
    email: 'pc_builder@umn.edu',
  },
];
