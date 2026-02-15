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
    id: '1',
    title: 'Calculus Textbook',
    description: 'James Stewart Calculus, 8th Edition. Slightly used but in good condition. Essential for Math 1271/1272.',
    imageUri: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop',
    price: '$40',
    condition: 'Good',
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
    id: '5',
    title: 'Bicycle',
    description: 'Mountain bike, works well. Needs a little air in the tires but otherwise ready to ride.',
    imageUri: 'https://images.unsplash.com/photo-1485965120184-e224f723d62d?q=80&w=1000&auto=format&fit=crop',
    price: '$60',
    condition: 'Used',
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
