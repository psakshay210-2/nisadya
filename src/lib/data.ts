import { Bot, Gamepad2, Code, Mic, Film, Music, Paintbrush } from "lucide-react";
import type { Sponsor, ScheduleItem, Event } from "./types";

export const events: Event[] = [
    {
        id: "1",
        title: "Quantum Leap Hackathon",
        description: "A 24-hour coding marathon where innovation meets execution. Build the future.",
        startDate: "2024-03-15",
        endDate: "2024-03-16",
        location: "Barn Hall",
        category: "Technical",
        registrationLink: "#",
        imageUrl: "/placeholder-event.jpg", // Replace with real image
        imageId: "tech-1" // For placeholder fallback
    },
    {
        id: "2",
        title: "Robo-Wars",
        description: "The ultimate clash of metal and code. Witness the fiercest robots battle for supremacy.",
        startDate: "2024-03-16",
        location: "Main Auditorium",
        category: "Technical",
        registrationLink: "#",
        imageUrl: "/placeholder-event.jpg",
        imageId: "tech-2"
    },
    {
        id: "3",
        title: "Stellaris: Battle of Bands",
        description: "Electrifying performances from the best college bands in the region.",
        startDate: "2024-03-15",
        location: "Open Air Theatre",
        category: "Cultural",
        registrationLink: "#",
        imageUrl: "/placeholder-event.jpg",
        imageId: "social-1"
    },
    {
        id: "4",
        title: "Enigma Hunt",
        description: "A campus-wide treasure hunt that will test your wits and logic.",
        startDate: "2024-03-16",
        location: "Campus Grounds",
        category: "Fun",
        registrationLink: "#",
        imageUrl: "/placeholder-event.jpg",
        imageId: "abstract-1"
    },
    {
        id: "5",
        title: "Nritya",
        description: "A spectacular showcase of dance forms, from classical to contemporary.",
        startDate: "2024-03-16",
        location: "Main Auditorium",
        category: "Cultural",
        registrationLink: "#",
        imageUrl: "/placeholder-event.jpg",
        imageId: "art-1"
    }
];

export const sponsors: Sponsor[] = [
    {
        id: "1",
        name: "Innovate Corp",
        type: "Title",
        imageId: "tech-1",
        description: "Pioneering the future of technology with cutting-edge AI solutions."
    },
    {
        id: "2",
        name: "QuantumLeap",
        type: "Gold",
        imageId: "tech-2",
        description: "Accelerating startups with funding and mentorship."
    },
    {
        id: "3",
        name: "TechVibe",
        type: "Gold",
        imageId: "social-1",
        description: "The leading online community for developers and tech enthusiasts."
    },
    {
        id: "4",
        name: "GreenEarth",
        type: "Silver",
        imageId: "nature-1",
        description: "Sustainable energy solutions for a greener planet."
    },
    {
        id: "5",
        name: "CyberShield",
        type: "Silver",
        imageId: "tech-3",
        description: "Advanced cybersecurity implementation for enterprise."
    },
    {
        id: "6",
        name: "CodeCraft",
        type: "Bronze",
        imageId: "abstract-1",
        description: "Tools for the modern developer workflow."
    }
];

export const schedule: ScheduleItem[] = [
    {
        time: 'Day 1, 09:00 AM',
        title: 'Opening Ceremony',
        description: 'Inauguration of Nisadya with guest speakers and performances.',
        icon: Mic,
    },
    {
        time: 'Day 1, 11:00 AM',
        title: 'Quantum Leap Hackathon Begins',
        description: 'The 24-hour coding marathon kicks off.',
        icon: Code,
    },
    {
        time: 'Day 1, 06:00 PM',
        title: 'Stellaris: Battle of Bands',
        description: 'An evening of electrifying musical performances.',
        icon: Music,
    },
    {
        time: 'Day 2, 10:00 AM',
        title: 'Robo-Wars',
        description: 'Robots clash in the ultimate test of engineering.',
        icon: Bot,
    },
    {
        time: 'Day 2, 01:00 PM',
        title: 'Nritya: Dance Fusion',
        description: 'A celebration of diverse dance forms.',
        icon: Paintbrush,
    },
    {
        time: 'Day 2, 03:00 PM',
        title: 'The Enigma Hunt',
        description: 'The campus-wide treasure hunt begins.',
        icon: Gamepad2,
    },
    {
        time: 'All Days',
        title: 'Nexus Gaming Arena',
        description: 'Compete in popular esports titles like Valorant and FIFA.',
        icon: Gamepad2,
    },
    {
        time: 'Day 2, 07:00 PM',
        title: 'Closing Ceremony & Prize Distribution',
        description: 'Concluding the fest with awards and a final showcase.',
        icon: Film,
    }
];
