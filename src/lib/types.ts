import { z } from 'zod';

export const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});
export type Message = z.infer<typeof MessageSchema>;

export type Event = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  registrationLink: string;
  imageUrl: string;
  coordinator: string;
  contact: string;
  details: string; // This might be the same as description
};

export type Sponsor = {
  id: string;
  name: string;
  imageId: string;
  type: string;
  description: string;
};

export type ScheduleItem = {
  time: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
};


export type InstagramPost = {
  id: string;
  url: string;
  imageId: string;
};
