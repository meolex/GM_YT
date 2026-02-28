import { HashRouter, Route, Routes } from "react-router";

import { Master } from "@/master";
import { Auth } from "@/modules/auth/components";

export const Routing = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="" element={<Master />}>
          <Route path="/auth" element={<Auth />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
