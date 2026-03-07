import { useFormContext, useWatch } from "react-hook-form";

import { ValueStepper } from "@/components/common/value-stepper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem } from "@/components/ui/form";

import { BOTTOM_CLOTHES, SHOES, TOP_CLOTHES } from "../../config";
import type { FormSchema } from "../../schema";

export const Clothes = ({ isLoading }: { isLoading: boolean }) => {
  const form = useFormContext<FormSchema>();

  const sex = useWatch({ control: form.control }).headBlendData?.sex || "male";

  return (
    <Card className="flex w-full flex-col justify-between rounded-l-none bg-secondary">
      <CardHeader>
        <CardTitle>Одежда</CardTitle>
        <CardDescription>Выберите комплект одежды</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <FormField
            name="clothes.TORSO"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ValueStepper label="Верхняя одежда" options={TOP_CLOTHES[sex]} onChange={field.onChange} value={field.value} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            name="clothes.LEGS"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ValueStepper label="Нижняя одежда" options={BOTTOM_CLOTHES[sex]} onChange={field.onChange} value={field.value} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            name="clothes.FEET"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ValueStepper label="Обувь" options={SHOES[sex]} onChange={field.onChange} value={field.value} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
      <div className="mt-36 p-4">
        <Button type="submit" className="w-full flex-1 bg-blue-500 text-white hover:text-black" disabled={isLoading}>
          Завершить
        </Button>
      </div>
    </Card>
  );
};
