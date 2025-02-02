import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import BackgroundPattern from "@/components/BackgroundPattern";
import { Toaster } from "@/components/ui/sonner";
import PetContextProvider from "@/contexts/pet-contect-provider";
import SearchContextProvider from "@/contexts/search-context-provider";
import prisma from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PetSoft - Pet daycare software",
  description: "Take care of people's pets responsibly and efficiently.",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const petList = await prisma.pet.findMany();

  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col max-w-[1050px] mx-auto px-4 min-h-screen">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={petList}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
        <Toaster position="top-right" />
      </div>
    </>
  );
}
