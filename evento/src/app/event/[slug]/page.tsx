import H1 from "@/components/H1";
import { getEvent } from "@/lib/server-only";

import { Metadata } from "next";
import Image from "next/image";

type EventPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: EventPageProps): Promise<Metadata> => {
  const slug = (await params).slug;

  const event = await getEvent(slug);

  return {
    title: event.name,
    description: event.description,
  };
};

export async function generateStaticParams() {
  // top 100 most popular events

  return [
    {
      slug: "dj-practice-session",
    },
    {
      slug: "enchanted-garden-gala",
    },
    {
      slug: "science-space-expo",
    },
  ];
}

export default async function EventPage({ params }: EventPageProps) {
  const slug = (await params).slug;

  const event = await getEvent(slug);

  return (
    <main>
      <section className="relative overflow-hidden flex justify-center items-center py-14 md:py-20">
        <Image
          src={event.imageUrl}
          className="object-cover blur-3xl z-0"
          alt={event.name}
          fill
          quality={50}
          sizes="(max-width: 1280px) 100vw,1280px"
          priority
        />
        <div className="z-1 flex flex-col lg:flex-row relative gap-6 lg:gap-60">
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={201}
            className="rounded-xl border-2 border-white/50 object-cover"
          />
          <div className="flex flex-col">
            <p className="text-white/75">
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>

            <H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">
              {event.name}
            </H1>
            <p className="whitespace-nowrap text-white/75">
              Organised by <span className="italic">{event.organizerName}</span>
            </p>
            <button className="bg-white/20 text-lg capitalize lg:mt-auto w-[95vw] sm:w-full py-2 rounded-md border-white/10 border-2 mt-5 state-effects">
              Get Tickets
            </button>
          </div>
        </div>
      </section>
      <div className="text-center px-5 py-16 min-h-[75vh]">
        <Section>
          <SectionHeading>About this event</SectionHeading>
          <SectionContent>{event.description}</SectionContent>
        </Section>
        <Section>
          <SectionHeading>Location</SectionHeading>
          <SectionContent>{event.location}</SectionContent>
        </Section>
      </div>
    </main>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mb-12">{children}</section>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl mb-8">{children}</h2>;
}

function SectionContent({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-lg leading-8 text-white/75 max-w-4xl mx-auto">
      {children}
    </p>
  );
}
