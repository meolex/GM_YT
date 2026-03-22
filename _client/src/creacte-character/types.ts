export interface CreateCharacterData {
  name: string;
  age: number;

  headBlendData: {
    mother: number;
    father: number;
    sex: "male" | "female";
    similarity: number;
    skinTone: number;
  };

  headOverlay: {
    blemishes: number;
    eyebrows: number;
    ageing: number;
    makeup: number;
    complexion: number;
    sunDamage: number;
    lipstick: number;
    molesFreckles: number;
  };

  faceFeature: {
    noseWidth: number;
    noseHeight: number;
    noseLength: number;
    noseBridge: number;
    noseTip: number;
    noseBridgeShift: number;
    browHeight: number;
    browWidth: number;
    cheekboneHeight: number;
    cheekboneWidth: number;
    cheeksWidth: number;
    eyes: number;
    lips: number;
    jawWidth: number;
    jawHeight: number;
    chinLength: number;
    chinPosition: number;
    chinWidth: number;
    chinShape: number;
    neckWidth: number;
  };

  colors: {
    hairStyle: number;
    facialHair: number;
    eyeColor: number;
    hairColor: number;
    beardColor: number;
  };

  clothes: {
    TORSO: number;
    LEGS: number;
    FEET: number;
  };
}
