import { Bot, Gamepad2, Code, Mic, Film, Music, Paintbrush } from "lucide-react";
import type { Sponsor, ScheduleItem } from "./types";

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

export const sponsors: Sponsor[] = [
  { id: '1', name: 'Innovate Corp', imageId: 'sponsor-1', type: 'Title Sponsor', description: 'Pioneering the future of technology with cutting-edge AI solutions.' },
  { id: '2', name: 'QuantumLeap', imageId: 'sponsor-2', type: 'Gold Sponsor', description: 'Accelerating startups with funding and mentorship.' },
  { id: '3', name: 'TechVibe', imageId: 'sponsor-3', type: 'Gold Sponsor', description: 'The leading online community for developers and tech enthusiasts.' },
  { id: '4', name: 'Synergy Systems', imageId: 'sponsor-4', type: 'Silver Sponsor', description: 'Providing scalable cloud infrastructure for enterprises.' },
  { id: '5', name: 'Creative Minds', imageId: 'sponsor-5', type: 'Silver Sponsor', description: 'A design agency that brings ideas to life with stunning visuals.' },
  { id: '6', name: 'NextGen Gaming', imageId: 'sponsor-6', type: 'Gaming Partner', description: 'Building immersive worlds and next-generation gaming experiences.' },
];
