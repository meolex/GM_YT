import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Имя обязательно"),
  age: z.number().min(18, "Возраст должен быть не меньше 18"),

  headBlendData: z.object({
    mother: z.number(),
    father: z.number(),
    sex: z.enum(["male", "female"]),
    similarity: z.number(),
    skinTone: z.number(),
  }),

  headOverlay: z.object({
    blemishes: z.number().min(0).max(23),
    eyebrows: z.number().min(0).max(33),
    ageing: z.number().min(0).max(14),
    makeup: z.number().min(0).max(15),
    complexion: z.number().min(0).max(11),
    sunDamage: z.number().min(0).max(10),
    lipstick: z.number().min(0).max(9),
    molesFreckles: z.number().min(0).max(17),
  }),

  colors: z.object({
    hairStyle: z.number().min(0).max(15),
    facialHair: z.number().min(0).max(28),
    eyeColor: z.number(),
    hairColor: z.number(),
    beardColor: z.number(),
  }),

  faceFeature: z.object({
    noseWidth: z.number().min(-1).max(1),
    noseHeight: z.number().min(-1).max(1),
    noseLength: z.number().min(-1).max(1),
    noseBridge: z.number().min(-1).max(1),
    noseTip: z.number().min(-1).max(1),
    noseBridgeShift: z.number().min(-1).max(1),
    browHeight: z.number().min(-1).max(1),
    browWidth: z.number().min(-1).max(1),
    cheekboneHeight: z.number().min(-1).max(1),
    cheekboneWidth: z.number().min(-1).max(1),
    cheeksWidth: z.number().min(-1).max(1),
    eyes: z.number().min(-1).max(1),
    lips: z.number().min(-1).max(1),
    jawWidth: z.number().min(-1).max(1),
    jawHeight: z.number().min(-1).max(1),
    chinLength: z.number().min(-1).max(1),
    chinPosition: z.number().min(-1).max(1),
    chinWidth: z.number().min(-1).max(1),
    chinShape: z.number().min(-1).max(1),
    neckWidth: z.number().min(-1).max(1),
  }),

  clothes: z.object({
    TORSO: z.number(),
    LEGS: z.number(),
    FEET: z.number(),
  }),
});

export type FormSchema = z.infer<typeof formSchema>;
