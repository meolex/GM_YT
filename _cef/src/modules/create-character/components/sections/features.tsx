import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import type { Section } from "..";
import { FACE_FEATURES } from "../../config";
import type { FormSchema } from "../../schema";

export const Features = ({ setStep }: { setStep: (step: Section) => void }) => {
  const form = useFormContext<FormSchema>();

  const handleRandomize = () => FACE_FEATURES.forEach((feature) => form.setValue(`faceFeature.${feature.formName}`, +(Math.random() * 2 - 1).toFixed(1)));

  return (
    <Card className="w-full rounded-l-none bg-secondary">
      <CardHeader>
        <CardTitle>Черты лица</CardTitle>
        <CardDescription>Задайте детали черт лица</CardDescription>
      </CardHeader>
      <CardContent>
        <ChevronUpIcon className="mx-auto" />
        <ScrollArea className="h-[300px] w-full border-b border-t border-blue-500/50 py-2 pr-2">
          {FACE_FEATURES.map((feature) => (
            <FormField
              name={`faceFeature.${feature.formName}`}
              key={feature.formName}
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-4">
                  <div className="flex items-center justify-between">
                    <FormLabel className="leading-6">{feature.label}</FormLabel>
                    <output className="text-sm font-medium tabular-nums">{field.value}</output>
                  </div>
                  <FormControl>
                    <Slider value={[+field.value]} onValueChange={(value) => field.onChange(value[0])} max={1} min={-1} step={0.1} />
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
        <Button type="button" className="flex-1 bg-blue-500 text-white hover:text-black" onClick={() => setStep("clothes")}>
          Далее
        </Button>
      </div>
    </Card>
  );
};
