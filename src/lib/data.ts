import { Cpu, Music, Users, Bot, Gamepad2, Paintbrush, Code, Mic, Film } from "lucide-react";
import { Event } from "@/lib/types";

export type ScheduleItem = {
  time: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  event?: Omit<Event, 'id' | 'title' | 'date'>;
};

export type Sponsor = {
  id: string;
  name: string;
  imageId: string;
};

export const events: Event[] = [
  {
    id: '1',
    title: 'Quantum Leap Hackathon',
    category: 'Technical',
    date: 'Day 1',
    description: 'A 24-hour hackathon to build the future of web technologies.',
    details: 'The Quantum Leap Hackathon is a premier event for developers, designers, and innovators. Participants will have 24 hours to collaborate and build a project from scratch. Themes will be revealed at the start of the event. Mentors from top tech companies will be available to guide teams. Exciting prizes for the top 3 teams. Food and beverages will be provided throughout the event.',
    imageId: 'event-tech-1',
  },
  {
    id: '2',
    title: 'Robo-Wars',
    category: 'Technical',
    date: 'Day 2',
    description: 'Build and battle robots in a high-stakes arena.',
    details: 'Design, build, and battle your own remote-controlled robot in our custom-built arena. This is a test of engineering skill, strategy, and destructive creativity. Robots will compete in one-on-one matches in a single-elimination tournament. Adherence to weight and size restrictions is mandatory. May the best bot win!',
    imageId: 'event-tech-2',
  },
  {
    id: '3',
    title: 'Stellaris: Battle of Bands',
    category: 'Cultural',
    date: 'Day 1 Evening',
    description: 'Witness the ultimate musical showdown as bands compete for glory.',
    details: 'Stellaris is the flagship music event of Nisadya. Bands from across the country will perform their original compositions and covers to captivate the audience and judges. A panel of renowned musicians will decide the winner based on originality, technical skill, and stage presence. Get ready for an electrifying night of music.',
    imageId: 'event-cultural-1',
  },
  {
    id: '4',
    title: 'Nritya: Dance Fusion',
    category: 'Cultural',
    date: 'Day 2',
    description: 'A vibrant showcase of classical, folk, and contemporary dance forms.',
    details: 'Nritya celebrates the diversity of dance. Teams will present performances that blend different styles, creating a unique fusion of movement and storytelling. From Bharatanatyam to Hip-Hop, all forms are welcome. This is a group competition, judged on choreography, synchronization, and artistic expression.',
    imageId: 'event-cultural-2',
  },
  {
    id: '5',
    title: 'Nexus Gaming Arena',
    category: 'Informal',
    date: 'All Days',
    description: 'Compete in popular esports titles like Valorant and FIFA.',
    details: 'The Nexus Gaming Arena is open to all attendees. Drop in and compete in casual or competitive matches of your favorite games. We will host tournaments for Valorant (5v5 team), and FIFA (1v1). Pre-registration is recommended for tournaments, but spot registrations may be available.',
    imageId: 'event-informal-1',
  },
  {
    id: '6',
    title: 'The Enigma Hunt',
    category: 'Informal',
    date: 'Day 2',
    description: 'A campus-wide treasure hunt with cryptic clues and exciting challenges.',
    details: 'Embark on The Enigma Hunt, a thrilling adventure across the campus. Teams of 2-4 will decipher cryptic clues, solve puzzles, and complete challenges to find the hidden treasure. The first team to solve the final enigma wins the grand prize. It\'s a race against time and other teams!',
    imageId: 'event-informal-2',
  },
];

export const eventCategories = {
  Technical: { icon: Cpu, color: 'text-primary' },
  Cultural: { icon: Music, color: 'text-primary' },
  Informal: { icon: Users, color: 'text-primary' },
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
        title: 'Quantum Leap Hackathon',
        description: 'The 24-hour coding marathon kicks off.',
        icon: Code,
        event: {
          category: 'Technical',
          description: 'A 24-hour hackathon to build the future of web technologies.',
          details: 'The Quantum Leap Hackathon is a premier event for developers, designers, and innovators. Participants will have 24 hours to collaborate and build a project from scratch. Themes will be revealed at the start of the event. Mentors from top tech companies will be available to guide teams. Exciting prizes for the top 3 teams. Food and beverages will be provided throughout the event.',
          imageId: 'event-tech-1',
        }
    },
    {
        time: 'Day 1, 06:00 PM',
        title: 'Stellaris: Battle of Bands',
        description: 'An evening of electrifying musical performances.',
        icon: Music,
        event: {
          category: 'Cultural',
          description: 'Witness the ultimate musical showdown as bands compete for glory.',
          details: 'Stellaris is the flagship music event of Nisadya. Bands from across the country will perform their original compositions and covers to captivate the audience and judges. A panel of renowned musicians will decide the winner based on originality, technical skill, and stage presence. Get ready for an electrifying night of music.',
          imageId: 'event-cultural-1',
        }
    },
    {
        time: 'Day 2, 10:00 AM',
        title: 'Robo-Wars',
        description: 'Robots clash in the ultimate test of engineering.',
        icon: Bot,
        event: {
          category: 'Technical',
          description: 'Build and battle robots in a high-stakes arena.',
          details: 'Design, build, and battle your own remote-controlled robot in our custom-built arena. This is a test of engineering skill, strategy, and destructive creativity. Robots will compete in one-on-one matches in a single-elimination tournament. Adherence to weight and size restrictions is mandatory. May the best bot win!',
          imageId: 'event-tech-2',
        }
    },
    {
        time: 'Day 2, 01:00 PM',
        title: 'Nritya: Dance Fusion',
        description: 'A celebration of diverse dance forms.',
        icon: Paintbrush,
        event: {
            category: 'Cultural',
            description: 'A vibrant showcase of classical, folk, and contemporary dance forms.',
            details: 'Nritya celebrates the diversity of dance. Teams will present performances that blend different styles, creating a unique fusion of movement and storytelling. From Bharatanatyam to Hip-Hop, all forms are welcome. This is a group competition, judged on choreography, synchronization, and artistic expression.',
            imageId: 'event-cultural-2',
        }
    },
    {
        time: 'Day 2, 03:00 PM',
        title: 'The Enigma Hunt',
        description: 'The campus-wide treasure hunt begins.',
        icon: Gamepad2,
        event: {
            category: 'Informal',
            description: 'A campus-wide treasure hunt with cryptic clues and exciting challenges.',
            details: 'Embark on The Enigma Hunt, a thrilling adventure across the campus. Teams of 2-4 will decipher cryptic clues, solve puzzles, and complete challenges to find the hidden treasure. The first team to solve the final enigma wins the grand prize. It\'s a race against time and other teams!',
            imageId: 'event-informal-2',
        }
    },
    {
        time: 'All Days',
        title: 'Nexus Gaming Arena',
        description: 'Compete in popular esports titles like Valorant and FIFA.',
        icon: Gamepad2,
        event: {
            category: 'Informal',
            description: 'Compete in popular esports titles like Valorant and FIFA.',
            details: 'The Nexus Gaming Arena is open to all attendees. Drop in and compete in casual or competitive matches of your favorite games. We will host tournaments for Valorant (5v5 team), and FIFA (1v1). Pre-registration is recommended for tournaments, but spot registrations may be available.',
            imageId: 'event-informal-1',
        }
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
