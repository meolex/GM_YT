import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import rpc from "rage-rpc";
import { toast } from "sonner";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    const response = await rpc.callServer("auth:register", { email, password });
    setIsLoading(false);

    if (response.error) return toast.error(response.error);
    toast.success("Вы успешно зарегистрировались в системе!");
  };

  return (
    <div className="space-y-5">
      <h3 className="py-4 text-5xl font-bold">Регистрация</h3>
      <div>
        <span>Email</span>
        <Input type="text" placeholder="Введите пошту" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
      </div>
      <div>
        <span>Пароль</span>
        <Input type="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
      </div>
      <div>
        <span>Подтвердите пароль</span>
        <Input type="password" placeholder="Подтвердите пароль" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={isLoading} />
      </div>
      <Button className="w-full" disabled={!email || !password || !confirmPassword || password !== confirmPassword || isLoading} onClick={handleRegister}>
        {isLoading ? "Загрузка..." : "Зарегистрироваться"}
      </Button>
    </div>
  );
};
