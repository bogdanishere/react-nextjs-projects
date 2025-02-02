import EventsList from "@/components/EventsList";
import H1 from "@/components/H1";
import { Suspense } from "react";
import SkeletonCard from "@/components/SkeletonCard";
import { makeCityWithCapital } from "@/lib/utils";
import type { Metadata } from "next/types";
import { z } from "zod";

type EventPageProps = {
  params: Promise<{
    city: string;
  }>;
  searchParams: Promise<Record<string, string | undefined>>;
};

export const generateMetadata = async ({
  params,
}: EventPageProps): Promise<Metadata> => {
  const city = (await params).city;

  return {
    title: `Events in ${
      city === "all" ? "All Events" : makeCityWithCapital(city)
    }`,
    description: `Find events in ${
      city === "all" ? "all events" : makeCityWithCapital(city)
    }`,
  };
};

const pageNumberSchema = z.coerce.number().int().positive().optional();

export default async function Events({ params, searchParams }: EventPageProps) {
  const city = (await params).city;
  const searchParamsResolved = await searchParams;
  const page = pageNumberSchema.safeParse(searchParamsResolved.page);

  if (!page.success) {
    throw new Error("Invalid page number");
  }

  return (
    <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
      <H1 className="mb-28">
        {city === "all" && "All Events"}
        {city !== "all" && `Events in ${makeCityWithCapital(city)}`}
      </H1>

      <Suspense key={city + page.data} fallback={<Loading />}>
        <EventsList city={city} page={page.data} />
      </Suspense>
    </main>
  );
}

function Loading() {
  return (
    <div className="flex flex-wrap max-w-[1100px] justify-center gap-20 mx-auto px-[20px] py-24">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
