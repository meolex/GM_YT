export const PARENT_NAMES = [
  { label: "Benjamin", value: 0 },
  { label: "Daniel", value: 1 },
  { label: "Joshua", value: 2 },
  { label: "Noah", value: 3 },
  { label: "Andrew", value: 4 },
  { label: "Joan", value: 5 },
  { label: "Alex", value: 6 },
  { label: "Isaac", value: 7 },
  { label: "Evan", value: 8 },
  { label: "Ethan", value: 9 },
  { label: "Vincent", value: 10 },
  { label: "Angel", value: 11 },
  { label: "Diego", value: 12 },
  { label: "Adrian", value: 13 },
  { label: "Gabriel", value: 14 },
  { label: "Michael", value: 15 },
  { label: "Santiago", value: 16 },
  { label: "Kevin", value: 17 },
  { label: "Louis", value: 18 },
  { label: "Samuel", value: 19 },
  { label: "Anthony", value: 20 },
  { label: "Hannah", value: 21 },
  { label: "Audrey", value: 22 },
  { label: "Jasmine", value: 23 },
  { label: "Giselle", value: 24 },
  { label: "Amelia", value: 25 },
  { label: "Isabella", value: 26 },
  { label: "Zoe", value: 27 },
  { label: "Ava", value: 28 },
  { label: "Camilla", value: 29 },
  { label: "Violet", value: 30 },
  { label: "Sophia", value: 31 },
  { label: "Eveline", value: 32 },
  { label: "Nicole", value: 33 },
  { label: "Ashley", value: 34 },
  { label: "Grace", value: 35 },
  { label: "Brianna", value: 36 },
  { label: "Natalie", value: 37 },
  { label: "Olivia", value: 38 },
  { label: "Elizabeth", value: 39 },
  { label: "Charlotte", value: 40 },
  { label: "Emma", value: 41 },
];

export const PARENT_MALE_NAMES_LIST = PARENT_NAMES.slice(0, 21);
export const PARENT_FEMALE_NAMES_LIST = PARENT_NAMES.slice(21);

export const HEAD_OVERLAY = [
  { label: "Пятна", formName: "blemishes", min: 0, max: 23, index: 0 },
  { label: "Брови", formName: "eyebrows", min: 0, max: 33, index: 2 },
  { label: "Старение", formName: "ageing", min: 0, max: 14, index: 3 },
  { label: "Макияж", formName: "makeup", min: 0, max: 15, index: 4 },
  { label: "Комплекция", formName: "complexion", min: 0, max: 11, index: 6 },
  { label: "Повреждение солнцем", formName: "sunDamage", min: 0, max: 10, index: 7 },
  { label: "Помада", formName: "lipstick", min: 0, max: 9, index: 8 },
  { label: "Родинки/Веснушки", formName: "molesFreckles", min: 0, max: 17, index: 9 },
] as const;

export const FACE_FEATURES = [
  { formName: "noseWidth", label: "Ширина носа", index: 0 },
  { formName: "noseHeight", label: "Высота носа", index: 1 },
  { formName: "noseLength", label: "Длина носа", index: 2 },
  { formName: "noseBridge", label: "Переносица", index: 3 },
  { formName: "noseTip", label: "Кончик носа", index: 4 },
  { formName: "noseBridgeShift", label: "Смещение переносицы", index: 5 },
  { formName: "browHeight", label: "Высота бровей", index: 6 },
  { formName: "browWidth", label: "Ширина бровей", index: 7 },
  { formName: "cheekboneHeight", label: "Высота скул", index: 8 },
  { formName: "cheekboneWidth", label: "Ширина скул", index: 9 },
  { formName: "cheeksWidth", label: "Ширина щёк", index: 10 },
  { formName: "eyes", label: "Глаза", index: 11 },
  { formName: "lips", label: "Губы", index: 12 },
  { formName: "jawWidth", label: "Ширина челюсти", index: 13 },
  { formName: "jawHeight", label: "Высота челюсти", index: 14 },
  { formName: "chinLength", label: "Длина подбородка", index: 15 },
  { formName: "chinPosition", label: "Положение подбородка", index: 16 },
  { formName: "chinWidth", label: "Ширина подбородка", index: 17 },
  { formName: "chinShape", label: "Форма подбородка", index: 18 },
  { formName: "neckWidth", label: "Ширина шеи", index: 19 },
] as const;

export const HAIR_COLORS = [
  { hex: "#1c1f21", index: 0 },
  { hex: "#5c3b24", index: 5 },
  { hex: "#99815d", index: 10 },
  { hex: "#dac38e", index: 15 },
  { hex: "#640f0a", index: 20 },
  { hex: "#aa4e2b", index: 25 },
  { hex: "#aaaaaa", index: 28 },
  { hex: "#463955", index: 30 },
  { hex: "#f299bc", index: 35 },
  { hex: "#217c61", index: 40 },
  { hex: "#dcb857", index: 45 },
  { hex: "#1f1814", index: 55 },
  { hex: "#1f1814", index: 55 },
];

export const BEARD_COLORS = [
  { hex: "#1c1f21", index: 0 },
  { hex: "#5c3b24", index: 5 },
  { hex: "#99815d", index: 10 },
  { hex: "#dac38e", index: 15 },
  { hex: "#640f0a", index: 20 },
  { hex: "#aa4e2b", index: 25 },
  { hex: "#aaaaaa", index: 28 },
  { hex: "#463955", index: 30 },
  { hex: "#f299bc", index: 35 },
  { hex: "#217c61", index: 40 },
  { hex: "#dcb857", index: 45 },
  { hex: "#1f1814", index: 55 },
];

export const TOP_CLOTHES = {
  male: [
    { label: "Футболка", value: 0 },
    { label: "Пиджак", value: 3 },
    { label: "Худи", value: 7 },
    { label: "Поло", value: 9 },
  ],
  female: [
    { label: "Футболка", value: 0 },
    { label: "Кофта", value: 75 },
    { label: "Худи", value: 3 },
    { label: "Рубашка", value: 9 },
  ],
};

export const BOTTOM_CLOTHES = {
  male: [
    { label: "Джинсы", value: 4 },
    { label: "Спортивные штаны", value: 5 },
    { label: "Шорты", value: 12 },
  ],
  female: [
    { label: "Джинсы", value: 4 },
    { label: "Юбка", value: 12 },
    { label: "Леггинсы", value: 27 },
  ],
};

export const SHOES = {
  male: [
    { label: "Кроссовки", value: 1 },
    { label: "Сланцы", value: 5 },
    { label: "Шлёпанцы", value: 6 },
  ],
  female: [
    { label: "Кроссовки", value: 1 },
    { label: "Туфли", value: 0 },
    { label: "Сланцы", value: 5 },
  ],
};
