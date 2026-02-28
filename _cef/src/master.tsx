import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

import rpc from "rage-rpc";
import { toast } from "sonner";

import { Toaster } from "./components/ui/sonner";

export const Master = () => {
  const navigate = useNavigate();

  useEffect(() => {
    rpc.register("cef:pushNotification", ({ message, type }: { message: string; type: "success" | "error" | "info" }) => toast[type](message));

    rpc.register("cef:navigateTo", ({ to, state }: { to: string; state?: any }) => {
      console.log("Navigating to:", to, "with state:", state);

      navigate(to, { state });
    });
  }, []);

  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
};
