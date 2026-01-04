import { Bot, Gamepad2, Code, Mic, Film, Music, Paintbrush } from "lucide-react";

export type ScheduleItem = {
  time: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
};

export type Sponsor = {
  id: string;
  name: string;
  imageId: string;
};

export type InstagramPost = {
  id: string;
  url: string;
  imageId: string;
};

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
  { id: '1', name: 'Sponsor One', imageId: 'sponsor-1' },
  { id: '2', name: 'Sponsor Two', imageId: 'sponsor-2' },
  { id: '3', name: 'Sponsor Three', imageId: 'sponsor-3' },
  { id: '4', name: 'Sponsor Four', imageId: 'sponsor-4' },
  { id: '5', name: 'Sponsor Five', imageId: 'sponsor-5' },
  { id: '6', name: 'Sponsor Six', imageId: 'sponsor-6' },
];
