import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePetContext } from "@/hooks/usePetContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { PetSchema, type PetSchemaType } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition } from "react";
import { DEFAULT_IMAGE_PET_URL } from "@/lib/constants";

type PetFormProps = Readonly<{
  actionType: "add" | "edit";
  onFormSubmission: () => void;
}>;

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  const {
    register,
    getValues,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<PetSchemaType>({
    resolver: zodResolver(PetSchema),
    defaultValues: {
      name: actionType === "edit" ? selectedPet?.name : "",
      ownerName: actionType === "edit" ? selectedPet?.ownerName : "",
      imageUrl:
        actionType === "edit" ? selectedPet?.imageUrl : DEFAULT_IMAGE_PET_URL,
      age: actionType === "edit" ? selectedPet?.age : 0,
      notes: actionType === "edit" ? selectedPet?.notes : "",
    },
  });

  // const onSubmit = async (data: PetSchemaType) => {
  //   console.log(data);

  //   if (actionType === "add") {
  //     startTransition(async () => {
  //       await handleAddPet(data);
  //     });
  //     toast.success("Pet added successfully");
  //   } else {
  //     if (!selectedPet) {
  //       toast.warning("No pet selected to edit");
  //       return;
  //     }
  //     startTransition(async () => {
  //       await handleEditPet(data, selectedPet?.id);
  //     });

  //     toast.success("Pet edited successfully");
  //   }

  //   onFormSubmission();
  // };

  return (
    <form
      className="flex flex-col"
      action={async () => {
        const response = await trigger();

        if (!response) {
          return;
        }

        const data = getValues(); // doesn't trigger validation doesnt  transform the data to the schema

        if (actionType === "add") {
          startTransition(async () => {
            await handleAddPet(data);
          });
          toast.success("Pet added successfully");
        } else {
          if (!selectedPet) {
            toast.warning("No pet selected to edit");
            return;
          }
          startTransition(async () => {
            await handleEditPet(data, selectedPet?.id);
          });

          toast.success("Pet edited successfully");
        }
        onFormSubmission();
      }}
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" {...register("name")} />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" type="text" {...register("ownerName")} />
          {errors.ownerName && (
            <span className="text-red-500 text-sm">
              {errors.ownerName.message}
            </span>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input id="imageUrl" type="text" {...register("imageUrl")} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" type="number" {...register("age")} />
          {errors.age && (
            <span className="text-red-500 text-sm">{errors.age.message}</span>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" rows={3} {...register("notes")} />
          {errors.notes && (
            <span className="text-red-500 text-sm">{errors.notes.message}</span>
          )}
        </div>
      </div>

      <Button type="submit" className="mt-5 self-end">
        {actionType === "add" && !isSubmitting && " Add a new Pet"}
        {actionType === "edit" && !isSubmitting && " Edit pet"}
        {isSubmitting && "Submitting..."}
      </Button>
    </form>
  );
}
