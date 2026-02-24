import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import rpc from "rage-rpc";
import { toast } from "sonner";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    const response = await rpc.callServer("auth:login", { email, password });
    setIsLoading(false);

    if (response.error) return toast.error(response.error);
    toast.success("Вы успешно вошли в систему!");
  };

  return (
    <div className="space-y-5">
      <h3 className="py-4 text-5xl font-bold">Авторизация</h3>
      <div>
        <span>Email</span>
        <Input type="text" placeholder="Введите пошту" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
      </div>
      <div>
        <span>Пароль</span>
        <Input type="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
      </div>
      <Button className="w-full" disabled={!email || !password || isLoading} onClick={handleLogin}>
        {isLoading ? "Загрузка..." : "Войти"}
      </Button>
    </div>
  );
};
