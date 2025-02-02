import { getEvents } from "@/lib/server-only";
import EventCard from "./EventCard";
import PaginationControls from "./PaginationControls";

type EventsListProps = {
  city: string;
  page?: number;
};

export default async function EventsList({ city, page = 1 }: EventsListProps) {
  const { events, totalCount } = await getEvents(city, page);
  return (
    <section className="max-w-[1100px] flex flex-wrap gap-10 justify-center px-[2px]">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}

      {events.length === 0 && (
        <p className="text-2xl text-center mt-20">No events found in {city}</p>
      )}
      <PaginationControls city={city} page={page} totalCount={totalCount} />
    </section>
  );
}
