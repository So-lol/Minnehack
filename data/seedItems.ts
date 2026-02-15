export interface Item {
  id: string;
  title: string;
  description: string;
  imageUri: string | number;
  price: string;
  condition: string;
  campusArea: string;
  email: string;
}

export const items: Item[] = [
  {
    id: '1',
    title: 'Broken iPad',
    description: 'Screen is cracked but still turns on. Touch works intermittently. Good for parts or repair.',
    imageUri: require('../assets/items/broken_ipad.jpg'),
    price: 'Free',
    condition: 'Broken',
    campusArea: 'East Bank',
    email: 'jdoe@umn.edu',
  },
  {
    id: '2',
    title: 'Mini Fridge',
    description: 'Perfect size for a dorm room. Keeps drinks cold. Pick up only.',
    imageUri: require('../assets/items/mini_fridge.jpg'),
    price: '$25',
    condition: 'Fair',
    campusArea: 'Superblock',
    email: 'student1@umn.edu',
  },
  {
    id: '3',
    title: 'Lab Coat',
    description: 'White lab coat, size Medium. Required for chemistry labs. No stains.',
    imageUri: require('../assets/items/lab_coat.jpg'),
    price: '$10',
    condition: 'Like New',
    campusArea: 'Mall Area',
    email: 'chemstudent@umn.edu',
  },
  {
    id: '4',
    title: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness. Great for late night studying.',
    imageUri: require('../assets/items/desklamp.jpg'),
    price: '$15',
    condition: 'Excellent',
    campusArea: 'West Bank',
    email: 'nightowl@umn.edu',
  },
  {
    id: '5',
    title: 'Broken Apple Watch',
    description: 'Series 3. Screen popped off. Battery might still be good. Selling as is.',
    imageUri: require('../assets/items/broken_watch.jpg'),
    price: 'Free',
    condition: 'Broken',
    campusArea: 'St Paul',
    email: 'watch_parts@umn.edu',
  },
  {
    id: '6',
    title: 'Broken MacBook Pro',
    description: '2015 model. Logic board failure. Screen and keyboard are in good condition. No charger.',
    imageUri: require('../assets/items/broken_macbook.jpg'),
    price: 'Free',
    condition: 'For parts',
    campusArea: 'West Bank',
    email: 'mac_parts@umn.edu',
  },
  {
    id: '7',
    title: 'Old Desktop Computer',
    description: 'Doesn\'t turn on. Probably power supply issue. Case and other components might be useful.',
    imageUri: require('../assets/items/old_desktop.jpg'),
    price: 'Free',
    condition: 'Broken',
    campusArea: 'Dinkytown',
    email: 'biker@umn.edu',
  },
  {
    id: '8',
    title: 'Gaming Monitor',
    description: '24 inch 1080p monitor. Upgrading to a larger one. rigid stand included.',
    imageUri: require('../assets/items/gaming_monitor.jpg'),
    price: '$80',
    condition: 'Good',
    campusArea: 'Stadium Village',
    email: 'gamer1@umn.edu',
  },
];
