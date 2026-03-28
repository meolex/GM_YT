import { useMutation } from "@tanstack/react-query";
import rpc from "rage-rpc";
import { toast } from "sonner";

export const useSelectSpawn = () => {
  return useMutation({
    mutationFn: async (type: "last" | "default") => {
      const res = await rpc.callServer("spawn-select:select", { type });
      if (res.error) throw new Error(res.error);
      return res;
    },
    onError: (error) => toast.error(error.message),
  });
};
