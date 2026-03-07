import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "../ui/button";

interface ValueStepperProps {
  label: string;
  value: string | number;
  options: { label: string; value: string | number }[];
  onChange: (value: string | number) => void;
}

export const ValueStepper = ({ label, value, options, onChange }: ValueStepperProps) => {
  const currentIndex = options.findIndex((option) => option.value === value);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;

  const prev = () => {
    const newIndex = (safeIndex - 1 + options.length) % options.length;
    onChange(options[newIndex].value);
  };

  const next = () => {
    const newIndex = (safeIndex + 1) % options.length;
    onChange(options[newIndex].value);
  };

  return (
    <div className="flex w-full max-w-sm items-center justify-between">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <Button variant="ghost" type="button" onClick={prev} size="icon">
          <ChevronLeftIcon className="size-4" />
        </Button>
        <span>{options[safeIndex]?.label}</span>
        <Button variant="ghost" type="button" onClick={next} size="icon">
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
};
