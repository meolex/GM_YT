import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";

import { type FormSchema, formSchema } from "../schema";
import { Appearance } from "./sections/appearance";
import { Character } from "./sections/character";
import { Clothes } from "./sections/clothes";
import { Colors } from "./sections/colors";
import { Features } from "./sections/features";

export { zodResolver } from "@hookform/resolvers/zod";

export type Section = "character" | "appearance" | "colors" | "features" | "clothes";

const sections: { label: string; value: Section }[] = [
  { label: "Персонаж", value: "character" },
  { label: "Внешний вид", value: "appearance" },
  { label: "Цвет и волосы", value: "colors" },
  { label: "Особенности", value: "features" },
  { label: "Одежда", value: "clothes" },
];

export const CreateCharacter = () => {
  const [currentSection, setCurrentSection] = useState<Section>("character");

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Ray Washington",
      age: 18,

      headBlendData: {
        mother: 21,
        father: 0,
        sex: "male",
        similarity: 1,
        skinTone: 1,
      },

      faceFeature: {
        noseWidth: 0,
        noseHeight: 0,
        noseLength: 0,
        noseBridge: 0,
        noseTip: 0,
        noseBridgeShift: 0,
        browHeight: 0,
        browWidth: 0,
        cheekboneHeight: 0,
        cheekboneWidth: 0,
        cheeksWidth: 0,
        eyes: 0,
        lips: 0,
        jawWidth: 0,
        jawHeight: 0,
        chinLength: 0,
        chinPosition: 0,
        chinWidth: 0,
        chinShape: 0,
        neckWidth: 0,
      },

      headOverlay: {
        ageing: 0,
        blemishes: 0,

        complexion: 0,
        eyebrows: 0,
        lipstick: 0,
        makeup: 0,
        molesFreckles: 0,
        sunDamage: 0,
      },

      colors: {
        hairStyle: 0,
        facialHair: 0,
        eyeColor: 0,
        hairColor: 1,
        beardColor: 1,
      },

      clothes: {
        TORSO: 0,
        FEET: 1,
        LEGS: 4,
      },
    },
  });

  const handleSubmit = (data: FormSchema) => {
    console.log(data);
  };

  const handleRotation = () => {};

  const renderSection = () => {
    switch (currentSection) {
      case "character":
        return <Character setStep={setCurrentSection} />;

      case "appearance":
        return <Appearance setStep={setCurrentSection} />;

      case "colors":
        return <Colors setStep={setCurrentSection} />;

      case "features":
        return <Features setStep={setCurrentSection} />;

      case "clothes":
        return <Clothes isLoading={false} />;
    }
  };

  return (
    <div className="relative h-screen w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="h-full w-full">
          <Card className="absolute left-2 top-1/4 flex w-2/6">
            <Card className="w-2/3 rounded-r-none">
              <CardHeader className="w-1/3">
                <CardTitle className="text-nowrap text-center">Создание Персонажа</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent>
                <div className="space-y-2">
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-muted-foreground">Имя</FormLabel>
                        <FormControl>
                          <Input placeholder="Joe Doe" {...field} className="placeholder:text-xs" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="age"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-muted-foreground">Возраст</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Separator />
                <div className="mt-4 flex flex-col space-y-2">
                  {sections.map((section) => (
                    <Button
                      key={section.value}
                      type="button"
                      className="justify-start"
                      disabled={false}
                      onClick={() => setCurrentSection(section.value)}
                      variant={section.value === currentSection ? "secondary" : "ghost"}
                    >
                      {section.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            {renderSection()}
          </Card>
        </form>
      </Form>
    </div>
  );
};
