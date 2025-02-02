"use client";

import {
  addPet,
  deletePet,
  editPet,
} from "@/app/(protected)/app/dashboard/actions";
import { PetListProps } from "@/lib/types";
import { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

type PetContextType = {
  pets: PetListProps[];
  selectedPetId: string | null;
  selectedPet: PetListProps | undefined;
  numberOfPets: number;
  setSelectedPetId: React.Dispatch<React.SetStateAction<string | null>>;
  handleSelectedPetId: (id: string) => void;
  handleCheckout: (id: string) => Promise<void>;
  handleAddPet: (
    newPet: Omit<PetListProps, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;

  handleEditPet: (
    pet: Omit<PetListProps, "id" | "createdAt" | "updatedAt">,
    petId: string
  ) => Promise<void>;
};

type PetContextProviderProps = Readonly<{
  children: React.ReactNode;
  data: PetListProps[];
}>;

export const PetContext = createContext<PetContextType | null>(null);

export default function PetContextProvider({
  children,
  data,
}: PetContextProviderProps) {
  // state

  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [
            ...state,
            { ...payload, id: new Date().getTime().toString() },
          ];
        case "edit":
          return state.map((pet) =>
            pet.id === payload.id ? { ...pet, ...payload.newPet } : pet
          );
        case "delete":
          return state.filter((pet) => pet.id !== payload);
        default:
          return state;
      }
    }
  );
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  // events /actions
  const handleSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  const handleAddPet = async (
    newPet: Omit<PetListProps, "id" | "createdAt" | "updatedAt">
  ) => {
    setOptimisticPets({
      action: "add",
      payload: newPet,
    });

    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleCheckout = async (id: string) => {
    setOptimisticPets({ action: "delete", payload: id });

    await deletePet(id);
    setSelectedPetId(null);
  };

  const handleEditPet = async (
    newPet: Omit<PetListProps, "id" | "createdAt" | "updatedAt">,
    petId: string
  ) => {
    const updatedPet = {
      ...newPet,
      id: petId,
      createdAt: selectedPet?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    setOptimisticPets({
      action: "edit",
      payload: updatedPet,
    });

    const error = await editPet(updatedPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
    // setSelectedPetId(null);
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        handleAddPet,
        selectedPetId,
        setSelectedPetId,
        handleSelectedPetId,
        selectedPet,
        numberOfPets,
        handleCheckout,

        handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
