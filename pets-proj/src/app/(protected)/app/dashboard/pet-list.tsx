"use client";

import { usePetContext } from "@/hooks/usePetContext";
import { useSearchContext } from "@/hooks/useSearchContext";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMemo } from "react";

export default function PetList() {
  const { pets, selectedPetId, handleSelectedPetId } = usePetContext();
  const { searchValue } = useSearchContext();

  const filteredPets = useMemo(
    () =>
      pets.filter((pet) =>
        pet.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [pets, searchValue]
  );

  return (
    <ul className="bg-white border-b border-light">
      {filteredPets.map((pet) => (
        <li key={pet.id}>
          <button
            className={cn(
              "flex h-[70px] cursor-pointer w-full items-center px-5 text-base gap-3 hover:bg-[#eff1f2] focus:bg-[#eff1f2] transition",
              {
                "bg-[#eff1f2]": selectedPetId === pet.id,
              }
            )}
            onClick={() => handleSelectedPetId(pet.id)}
          >
            <Image
              src={pet.imageUrl}
              width={45}
              height={45}
              alt="Pet Image"
              className="rounded-full object-cover w-[45px] h-[45px]"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
