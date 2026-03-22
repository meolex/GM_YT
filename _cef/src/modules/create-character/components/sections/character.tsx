import { useFormContext } from "react-hook-form";

import { ValueStepper } from "@/components/common/value-stepper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { cn, randomInt } from "@/lib/utils";
import { MarsIcon, VenusIcon } from "lucide-react";

import type { Section } from "..";
import { PARENT_FEMALE_NAMES_LIST, PARENT_MALE_NAMES_LIST } from "../../config";
import type { FormSchema } from "../../schema";

export const Character = ({ setStep }: { setStep: (step: Section) => void }) => {
  const form = useFormContext<FormSchema>();

  const handleRandomize = () => {
    const randomFather = randomInt(0, 21);
    const randomMother = randomInt(22, 41);

    const randomSimilarity = parseFloat(Math.random().toFixed(1));
    const randomSkinTone = parseFloat(Math.random().toFixed(1));

    form.reset({ ...form.getValues(), headBlendData: { father: randomFather, mother: randomMother, similarity: randomSimilarity, skinTone: randomSkinTone } });
  };

  return (
    <Card className="flex w-full flex-col justify-between rounded-l-none bg-secondary">
      <CardHeader>
        <CardTitle>Персонаж</CardTitle>
        <CardDescription>Создайте уникального персонажа</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <FormField
            name="headBlendData.mother"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ValueStepper label="Мать" options={PARENT_FEMALE_NAMES_LIST} onChange={field.onChange} value={field.value} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="headBlendData.father"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ValueStepper label="Отец" options={PARENT_MALE_NAMES_LIST} onChange={field.onChange} value={field.value} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="headBlendData.sex"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex max-w-sm items-center justify-between">
                  <FormLabel>Пол</FormLabel>
                  <div className="flex w-fit gap-2">
                    <Button
                      type="button"
                      size="icon"
                      onClick={() => field.onChange("male")}
                      className={cn("bg-blue-500 text-white opacity-50 hover:text-black", field.value === "male" && "opacity-100")}
                    >
                      <MarsIcon />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      onClick={() => field.onChange("female")}
                      className={cn("mr-11 bg-blue-500 text-white opacity-50 hover:text-black", field.value === "female" && "opacity-100")}
                    >
                      <VenusIcon />
                    </Button>
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="headBlendData.similarity"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex max-w-sm items-center justify-between gap-3">
                  <FormLabel>Схожесть</FormLabel>
                  <div className="flex w-[200px] gap-1">
                    <VenusIcon />
                    <Slider value={[field.value]} onValueChange={(value) => field.onChange(value[0])} max={1} min={0} step={0.1} />
                    <MarsIcon />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="headBlendData.skinTone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex max-w-sm items-center justify-between gap-3">
                  <FormLabel>Тональность</FormLabel>
                  <div className="flex w-[200px] gap-1">
                    <VenusIcon />
                    <Slider value={[field.value]} onValueChange={(value) => field.onChange(value[0])} max={1} min={0} step={0.1} />
                    <MarsIcon />
                  </div>
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
        <Button type="button" className="flex-1 bg-blue-500 text-white hover:text-black" onClick={() => setStep("appearance")}>
          Далее
        </Button>
      </div>
    </Card>
  );
};
