import { useMutation } from "@tanstack/react-query";
import rpc from "rage-rpc";
import { toast } from "sonner";

import type { FormSchema } from "../../schema";

export const useCreateCharacter = () => {
  return useMutation({
    mutationFn: async (values: FormSchema) => {
      const res = await rpc.callServer("create-character:create", values);
      if (res.error) throw new Error(res.error);
      return res;
    },
    onSuccess: () => toast.success("Персонаж успешно создан!"),
    onError: () => toast.error("Произошла ошибка при создании персонажа. Попробуйте еще раз."),
  });
};
