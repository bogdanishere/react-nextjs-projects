import z from "zod";
import { DEFAULT_IMAGE_PET_URL } from "./constants";

export const PetSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { message: "Name must be at least 3 characters" })
      .max(50, { message: "Name must be at most 50 characters" }),
    ownerName: z
      .string()

      .trim()
      .min(3, { message: "Owner Name must be at least 3 characters" })
      .max(50, { message: "Owner Name must be at most 50 characters" }),
    imageUrl: z.union([
      z.string().url({
        message: "Invalid URL",
      }),
      z.literal(""),
    ]),
    age: z.coerce
      .number()
      .int()
      .positive()
      .min(0, { message: "Age must be at least 0" })
      .max(100, { message: "Age must be at most 100" }),
    notes: z.union([
      z
        .string()
        .trim()
        .max(200, { message: "Notes must be at most 200 characters" }),
      z.literal(""),
    ]),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl.trim() || DEFAULT_IMAGE_PET_URL,
  }));

export type PetSchemaType = z.infer<typeof PetSchema>;

export const petIdSchema = z
  .string()
  .regex(/^[a-z0-9]{25}$/, { message: "Invalid id" });
// .uuid doesn t work properly with the id from prisma

export type PetIdSchemaType = z.infer<typeof petIdSchema>;
