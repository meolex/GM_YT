import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { randomInt } from "@/lib/utils";

import type { Section } from "..";
import { BEARD_COLORS, HAIR_COLORS } from "../../config";
import type { FormSchema } from "../../schema";

export const Colors = ({ setStep }: { setStep: (step: Section) => void }) => {
  const form = useFormContext<FormSchema>();

  const handleRandomize = () => {
    const randomHairStyle = randomInt(0, 16);
    const randomBeardStyle = randomInt(0, 16);
    const randomEyeColor = randomInt(0, 14);
    const randomHairColor = randomInt(0, HAIR_COLORS.length);
    const randomBeardColor = randomInt(0, BEARD_COLORS.length);

    form.reset({
      ...form.getValues(),
      colors: {
        hairStyle: randomHairStyle,
        facialHair: randomBeardStyle,
        eyeColor: randomEyeColor,
        beardColor: BEARD_COLORS[randomBeardColor]?.index,
        hairColor: HAIR_COLORS[randomHairColor]?.index,
      },
    });
  };

  return (
    <Card className="w-full rounded-l-none bg-secondary">
      <CardHeader>
        <CardTitle>Цвета и прическа</CardTitle>
        <CardDescription>Задайте палитру цветов и прическу</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          name="colors.hairStyle"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mt-4">
              <div className="flex items-center justify-between">
                <FormLabel className="leading-6">Прическа</FormLabel>
                <output className="text-sm font-medium tabular-nums">{field.value}</output>
              </div>
              <FormControl>
                <Slider value={[field.value]} onValueChange={(value) => field.onChange(value[0])} max={15} min={0} step={1} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="colors.facialHair"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mt-4">
              <div className="flex items-center justify-between">
                <FormLabel className="leading-6">Борода</FormLabel>
                <output className="text-sm font-medium tabular-nums">{field.value}</output>
              </div>
              <FormControl>
                <Slider value={[field.value]} onValueChange={(value) => field.onChange(value[0])} max={28} min={0} step={1} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="colors.eyeColor"
          render={({ field }) => (
            <FormItem className="mt-4">
              <div className="flex items-center justify-between">
                <FormLabel className="leading-6">Цвет глаз</FormLabel>
                <output className="text-sm font-medium tabular-nums">{field.value}</output>
              </div>
              <FormControl>
                <Slider value={[field.value]} onValueChange={(value) => field.onChange(value[0])} max={14} min={0} step={1} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="colors.hairColor"
          render={({ field }) => (
            <FormItem className="mb-8 flex flex-col gap-2">
              <FormLabel>Цвет волос</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {HAIR_COLORS.map((color) => (
                    <button
                      type="button"
                      key={color.index}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => field.onChange(color.index)}
                      className={`h-8 w-8 rounded-full border-2 border-transparent ${field.value === color.index ? "ring-2 ring-blue-500" : ""}`}
                    />
                  ))}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="colors.beardColor"
          render={({ field }) => (
            <FormItem className="mb-8 flex flex-col gap-2">
              <FormLabel>Цвет бороды</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {BEARD_COLORS.map((color) => (
                    <button
                      type="button"
                      key={color.index}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => field.onChange(color.index)}
                      className={`h-8 w-8 rounded-full border-2 border-transparent ${field.value === color.index ? "ring-2 ring-blue-500" : ""}`}
                    />
                  ))}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </CardContent>
      <div className="flex gap-2 p-4">
        <Button type="button" className="flex-1 border border-blue-500 hover:border-blue-500/50 hover:bg-black/20" variant="secondary" onClick={handleRandomize}>
          Перемешать
        </Button>
        <Button type="button" className="flex-1 bg-blue-500 text-white hover:text-black" onClick={() => setStep("features")}>
          Далее
        </Button>
      </div>
    </Card>
  );
};
