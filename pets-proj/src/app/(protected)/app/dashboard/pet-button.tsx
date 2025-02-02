"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import PetForm from "./pet-form";
import { useState } from "react";
import { flushSync } from "react-dom";

type PetButtonProps = Readonly<{
  actionType: "add" | "edit" | "checkout";
  children?: React.ReactNode;
  //   className?: React.HTMLProps<HTMLElement>["className"];
  onClick?: React.HTMLProps<HTMLElement>["onClick"];
  disabled?: boolean;
}>;

export default function PetButton({
  actionType,
  children,
  onClick,
  disabled,
}: PetButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (actionType === "add" || actionType === "edit") {
    return (
      <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
        <DialogTrigger asChild>
          {actionType === "add" ? (
            <Button size="icon" onClick={onClick}>
              <Plus size={40} />
            </Button>
          ) : (
            <Button variant="secondary" onClick={onClick}>
              {children}
            </Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "add" ? "Add a new Pet" : "Edit pet"}
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <PetForm
            actionType={actionType}
            onFormSubmission={() => {
              flushSync(() => {
                setIsOpen(() => false);
              });
              // This is a workaround for the issue where the dialog doesn't close after form submission
              // setIsOpen(() => false);
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }

  if (actionType === "checkout") {
    return (
      <Button variant="secondary" onClick={onClick} disabled={disabled}>
        {children}
      </Button>
    );
  }

  return null;
}
