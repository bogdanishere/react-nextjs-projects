import type { Pet } from "@prisma/client";

// export type PetListProps = {
//   id: string;
//   name: string;
//   ownerName: string;
//   imageUrl: string;
//   age: number;
//   notes: string;
// };

export type PetListProps = Omit<Pet, "createdAt" | "updatedAt">;
