import { NUMBER_OF_EVENTS } from "@/lib/constants";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const btnStyles =
  "text-white px-5 py-3 bg-white/5 rounded-md opacity-75 flex items-center gap-x-2 hover:opacity-100 transition text-sm";

type PaginationControlsProps = {
  city: string;
  page: number;
  totalCount: number;
};

export default function PaginationControls({
  city,
  page,
  totalCount,
}: PaginationControlsProps) {
  const prevPath = page > 1 ? `/events/${city}?page=${page - 1}` : null;
  const nextPath =
    page > totalCount / NUMBER_OF_EVENTS
      ? null
      : `/events/${city}?page=${page + 1}`;

  return (
    <section className="flex justify-center gap-10 w-full">
      {prevPath && (
        <Link href={prevPath} className={btnStyles}>
          <ArrowLeftIcon className="w-5 h-5" />
          Previous
        </Link>
      )}

      {nextPath && (
        <Link href={nextPath} className={btnStyles}>
          Next
          <ArrowRightIcon className="w-5 h-5" />
        </Link>
      )}
    </section>
  );
}
