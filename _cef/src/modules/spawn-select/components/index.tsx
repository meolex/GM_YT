import { Card, CardContent } from "@/components/ui/card";
import { HomeIcon, MapPinIcon } from "lucide-react";

import { useSelectSpawn } from "../api/mutations/select-spawn";

const SpawnSelect = () => {
  const { mutate, isPending } = useSelectSpawn();

  return (
    <div className="flex h-screen w-full items-center justify-center gap-6">
      <Card
        onClick={() => !isPending && mutate("last")}
        className="flex h-[280px] w-[280px] cursor-pointer flex-col items-center justify-center transition-all hover:scale-105 hover:bg-accent"
      >
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <MapPinIcon className="size-16 text-primary" />
          <span className="text-xl font-bold">Последнее место</span>
        </CardContent>
      </Card>

      <Card
        onClick={() => !isPending && mutate("default")}
        className="flex h-[280px] w-[280px] cursor-pointer flex-col items-center justify-center transition-all hover:scale-105 hover:bg-accent"
      >
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <HomeIcon className="size-16 text-primary" />
          <span className="text-xl font-bold">Стандартный спавн</span>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpawnSelect;
