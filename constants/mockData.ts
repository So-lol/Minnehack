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
        image: "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fi.ebayimg.com%2Fimages%2Fg%2F8OIAAOSwu-Vm9yIa%2Fs-l960.jpg&sp=1771172571T5a5abe23074c0b4ce49aa201111ce40491db6a69b3f09e29761b96d01587e6e2",
    },
    {
        id: "2",
        title: "Lab Coat",
        description: "White lab coat, size M. Used for one semester of Chemistry. Clean.",
        cost: "15",
        condition: "Working",
        campusArea: "West Bank",
        image: "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F51-cYOhLWrL.jpg&sp=1771172345Td54e2c45dd570636e11c3b8bd13ea0cc282a868dc371947bd74bb1240573c8c2",
    },
    {
        id: "3",
        title: "Graphing Calculator",
        description: "TI-84 Plus CE. Color screen. Includes charging cable.",
        cost: "80",
        condition: "Working",
        campusArea: "East Bank",
        image: "https://i.ebayimg.com/images/g/uJAAAeSwF9hpYmjL/s-l1600.webp",
    },
    {
        id: "4",
        title: "Bike Lock",
        description: "Heavy duty U-lock. Lost the spare key but have the main one.",
        cost: "10",
        condition: "Working",
        campusArea: "St Paul",
        image: "https://i.ebayimg.com/images/g/BNkAAeSwo7hpkMX2/s-l1600.webp",
    },
    {
        id: "5",
        title: "Mini Fridge",
        description: "Small black mini fridge. Works great, keeps drinks cold. Minor dent on the side.",
        cost: "30",
        condition: "Working",
        campusArea: "East Bank",
        image: "https://i.ebayimg.com/thumbs/images/g/WHgAAeSwQ1JpVC7n/s-l300.webp",
    },
    {
        id: "6",
        title: "Desk Lamp",
        description: "LED desk lamp with adjustable brightness. USB port for charging phone.",
        cost: "10",
        condition: "Working",
        campusArea: "West Bank",
        image: "https://i.ebayimg.com/images/g/QJ8AAeSwXNtpijzw/s-l1600.webp",
    },
];
