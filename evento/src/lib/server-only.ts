import "server-only";

import prisma from "./prisma";
import { notFound } from "next/navigation";
import { NUMBER_OF_EVENTS } from "./constants";
import { unstable_cache } from "next/cache";
import { makeCityWithCapital } from "./utils";

export const getEvents = unstable_cache(async (city: string, page = 1) => {
  if (page < 1) {
    notFound();
  }

  if (city === "all") {
    const events = await prisma.eventoEvent.findMany({
      orderBy: {
        date: "asc",
      },
      take: NUMBER_OF_EVENTS,
      skip: (page - 1) * NUMBER_OF_EVENTS,
    });
    if (!events) {
      notFound();
    }

    const totalCount = await prisma.eventoEvent.count();
    return { events, totalCount };
  }

  // const events = await prisma.eventoEvent.findMany({
  //   where: {
  //     city:city === "all" ? undefined : makeCityWithCapital(city),
  //   },
  // }); // merge si asa

  const events = await prisma.eventoEvent.findMany({
    where: {
      city: makeCityWithCapital(city),
    },
    orderBy: {
      date: "asc",
    },
    take: NUMBER_OF_EVENTS,
    skip: (page - 1) * NUMBER_OF_EVENTS,
  });

  if (!events) {
    notFound();
  }

  const totalCount = await prisma.eventoEvent.count({
    where: {
      city: makeCityWithCapital(city),
    },
  });
  return { events, totalCount };
});

export const getEvent = unstable_cache(async (slug: string) => {
  const event = await prisma.eventoEvent.findUnique({
    where: {
      slug,
    },
  });

  if (!event) {
    notFound();
  }

  return event;
});
