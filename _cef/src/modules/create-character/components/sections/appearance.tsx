import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { randomInt } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import type { Section } from "..";
import { HEAD_OVERLAY } from "../../config";
import type { FormSchema } from "../../schema";

export const Appearance = ({ setStep }: { setStep: (step: Section) => void }) => {
  const form = useFormContext<FormSchema>();

  const handleRandomize = () => HEAD_OVERLAY.forEach((overlay) => form.setValue(`headOverlay.${overlay.formName}`, randomInt(overlay.min, overlay.max)));

  return (
    <Card className="w-full rounded-l-none bg-secondary">
      <CardHeader>
        <CardTitle>Внешний вид</CardTitle>
        <CardDescription>Задайте детали внешнего вида</CardDescription>
      </CardHeader>
      <CardContent>
        <ChevronUpIcon className="mx-auto" />
        <ScrollArea className="h-[300px] w-full border-b border-t border-blue-500/50 py-2 pr-2">
          {HEAD_OVERLAY.map((overlay) => (
            <FormField
              name={`headOverlay.${overlay.formName}`}
              key={overlay.formName}
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-4">
                  <div className="flex items-center justify-between">
                    <FormLabel className="leading-6">{overlay.label}</FormLabel>
                    <output className="text-sm font-medium tabular-nums">{field.value}</output>
                  </div>
                  <FormControl>
                    <Slider value={[+field.value]} onValueChange={(value) => field.onChange(value[0])} max={overlay.max} min={overlay.min} step={1} />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
        </ScrollArea>
        <ChevronDownIcon className="mx-auto" />
      </CardContent>
      <div className="flex gap-2 p-4">
        <Button type="button" className="flex-1 border border-blue-500 hover:border-blue-500/50 hover:bg-black/20" variant="secondary" onClick={handleRandomize}>
          Перемешать
        </Button>
        <Button type="button" className="flex-1 bg-blue-500 text-white hover:text-black" onClick={() => setStep("colors")}>
          Далее
        </Button>
      </div>
    </Card>
  );
};
