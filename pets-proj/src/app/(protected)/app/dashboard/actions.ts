"use server";

import prisma from "@/lib/prisma";
import { sleep } from "@/lib/utils";
import { petIdSchema, PetSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

//   pet: Omit<Pet, "id" | "createdAt" | "updatedAt">

// pet: Omit<Pet, "createdAt" | "updatedAt">

export const addPet = async (pet: unknown) => {
  const validatedPet = PetSchema.safeParse(pet);

  if (!validatedPet.success) {
    return {
      message: "Invalid data",
    };
  }

  try {
    await prisma.pet.create({
      data: validatedPet.data,
    });
  } catch {
    return { message: "Could not add pet" };
  }

  revalidatePath("/app/dashboard");
};

export const editPet = async (pet: unknown) => {
  const validatedPet = PetSchema.safeParse(pet);
  if (!validatedPet.success) {
    return {
      message: "Invalid data",
    };
  }

  const validatedId = petIdSchema.safeParse((pet as { id: string }).id);

  console.log("setver editPet", pet);

  if (!validatedId.success) {
    return {
      message: "Invalid id",
    };
  }

  try {
    await prisma.pet.update({
      where: {
        id: validatedId.data,
      },
      data: validatedPet.data,
    });
  } catch {
    return {
      message: "Cound not edit pet",
    };
  }

  revalidatePath("/app/dashboard");
};

export const deletePet = async (id: string) => {
  await sleep(1000);

  const validatedId = petIdSchema.safeParse(id);

  if (!validatedId.success) {
    return {
      message: "Invalid id",
    };
  }

  try {
    await prisma.pet.delete({
      where: {
        id: validatedId.data,
      },
    });
  } catch {
    return {
      message: "Cound not delete pet",
    };
  }

  revalidatePath("/app", "layout");
};
