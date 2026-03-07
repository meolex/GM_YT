import { HashRouter, Navigate, Route, Routes } from "react-router";

import { Master } from "@/master";
import { Auth } from "@/modules/auth/components";
import { CreateCharacter } from "@/modules/create-character/components";

export const Routing = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="" element={<Master />}>
          <Route index element={<Navigate to="/create-character" replace />} />

          <Route path="/auth" element={<Auth />} />

          <Route path="/create-character" element={<CreateCharacter />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
