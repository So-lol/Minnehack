export interface Item {
    id: string;
    title: string;
    description: string;
    cost: string;
    condition: "Working" | "Broken" | "For parts";
    campusArea: "East Bank" | "West Bank" | "St Paul";
    image: string;
}

export const MOCK_ITEMS: Item[] = [
    {
        id: "1",
        title: "Calculus Textbook",
        description: "Stewart Calculus 8th Edition. Slightly worn but all pages intact. Great for MATH 1271.",
        cost: "40",
        condition: "Working",
        campusArea: "East Bank",
        image: "https://via.placeholder.com/150",
    },
    {
        id: "2",
        title: "Lab Coat",
        description: "White lab coat, size M. Used for one semester of Chemistry. Clean.",
        cost: "15",
        condition: "Working",
        campusArea: "West Bank",
        image: "https://via.placeholder.com/150",
    },
    {
        id: "3",
        title: "Graphing Calculator",
        description: "TI-84 Plus CE. Color screen. Includes charging cable.",
        cost: "80",
        condition: "Working",
        campusArea: "East Bank",
        image: "https://via.placeholder.com/150",
    },
    {
        id: "4",
        title: "Bike Lock",
        description: "Heavy duty U-lock. Lost the spare key but have the main one.",
        cost: "10",
        condition: "Working",
        campusArea: "St Paul",
        image: "https://via.placeholder.com/150",
    },
    {
        id: "5",
        title: "Mini Fridge",
        description: "Small black mini fridge. Works great, keeps drinks cold. Minor dent on the side.",
        cost: "30",
        condition: "Working",
        campusArea: "East Bank",
        image: "https://via.placeholder.com/150",
    },
    {
        id: "6",
        title: "Desk Lamp",
        description: "LED desk lamp with adjustable brightness. USB port for charging phone.",
        cost: "10",
        condition: "Working",
        campusArea: "West Bank",
        image: "https://via.placeholder.com/150",
    },
];
