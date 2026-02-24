import { Auth } from "@/modules/auth/components";

import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div>
      <Toaster position="bottom-center" />
      <Auth />
    </div>
  );
}

export default App;
