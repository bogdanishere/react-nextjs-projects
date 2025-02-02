import { EventoEvent } from "@prisma/client";

export type EventsData = EventoEvent;

export type EventData = {
  id: number;
  name: string;
  slug: string;
  city: string;
  location: string;
  date: Date;
  organizerName: string;
  imageUrl: string;
  description: string;
};
