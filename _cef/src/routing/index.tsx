import { HashRouter, Route, Routes } from "react-router";

import { Master } from "@/master";
import { Auth } from "@/modules/auth/components";
import { CreateCharacter } from "@/modules/create-character/components";
import SpawnSelect from "@/modules/spawn-select/components";

export const Routing = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="" element={<Master />}>
          <Route path="/auth" element={<Auth />} />
          <Route path="/hud" element={<div>HUD</div>} />
          <Route path="/create-character" element={<CreateCharacter />} />
          <Route path="/spawn-select" element={<SpawnSelect />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
