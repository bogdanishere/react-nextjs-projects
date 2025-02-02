"use client";

import { usePetContext } from "@/hooks/usePetContext";
import { PetListProps } from "@/lib/types";
import Image from "next/image";
import PetButton from "./pet-button";
import { useTransition } from "react";

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className="w-full h-full flex flex-col">
      {!selectedPet && <EmptyView />}

      {selectedPet && (
        <>
          <TopBar selectedPet={selectedPet} />
          <OtherInfo selectedPet={selectedPet} />
          <Notes selectedPet={selectedPet} />
        </>
      )}
    </section>
  );
}

type PetSectionsProps = {
  selectedPet: PetListProps;
};

function TopBar({ selectedPet }: PetSectionsProps) {
  const { handleCheckout } = usePetContext();

  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center bg-white px-8 py-5 border-b border-light">
      <Image
        src={selectedPet.imageUrl}
        width={75}
        height={75}
        alt="Pet Image"
        className="w-[75px] h-[75px] rounded-full object-cover"
        priority
      />

      <h2 className="text-3xl font-semibold leading-7 ml-5">
        {selectedPet.name}
      </h2>
      <div className="ml-auto space-x-3">
        <PetButton actionType="edit"> Edit </PetButton>
        <PetButton
          actionType="checkout"
          disabled={isPending}
          onClick={async () => {
            startTransition(async () => {
              await handleCheckout(selectedPet.id);
            });
          }}
        >
          {!isPending && "Checkout"}
          {isPending && "Checking out..."}
        </PetButton>
      </div>
    </div>
  );
}

function OtherInfo({ selectedPet }: PetSectionsProps) {
  return (
    <div className="flex justify-around py-10 px-5 text-center">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          Owner Name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{selectedPet?.ownerName}</p>
      </div>
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
        <p className="mt-1 text-lg text-zinc-800">{selectedPet.age}</p>
      </div>
    </div>
  );
}

function Notes({ selectedPet }: PetSectionsProps) {
  return (
    <section className="bg-white px-7 py-5 rounded-md mb-9 mx-8 flex-1 border border-light">
      {selectedPet.notes}
    </section>
  );
}

function EmptyView() {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-2xl font-medium">Not pet selected</p>
    </div>
  );
}
