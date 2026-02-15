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
    email: 'jdoe@umn.edu',
  },
  {
    id: '2',
    title: 'Mini Fridge',
    description: 'Perfect size for a dorm room. Keeps drinks cold. Pick up only.',
    imageUri: 'https://images.unsplash.com/photo-1584269600519-112d071b35e6?q=80&w=1000&auto=format&fit=crop',
    price: '$25',
    condition: 'Fair',
    campusArea: 'Superblock',
    email: 'student1@umn.edu',
  },
  {
    id: '3',
    title: 'Lab Coat',
    description: 'White lab coat, size Medium. Required for chemistry labs. No stains.',
    imageUri: 'https://images.unsplash.com/photo-1582719201918-18e3c54d241c?q=80&w=1000&auto=format&fit=crop',
    price: '$10',
    condition: 'Like New',
    campusArea: 'Mall Area',
    email: 'chemstudent@umn.edu',
  },
  {
    id: '4',
    title: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness. Great for late night studying.',
    imageUri: 'https://images.unsplash.com/photo-1534234828563-02599266048d?q=80&w=1000&auto=format&fit=crop',
    price: '$15',
    condition: 'Excellent',
    campusArea: 'West Bank',
    email: 'nightowl@umn.edu',
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
    email: 'biker@umn.edu',
  },
  {
    id: '6',
    title: 'Gaming Monitor',
    description: '24 inch 1080p monitor. Upgrading to a larger one. rigid stand included.',
    imageUri: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop',
    price: '$80',
    condition: 'Good',
    campusArea: 'Stadium Village',
    email: 'gamer1@umn.edu',
  },
];
