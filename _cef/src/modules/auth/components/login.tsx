import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login with email:", email, "and password:", password);
  };

  return (
    <div className="space-y-5">
      <h3 className="py-4 text-5xl font-bold">Авторизация</h3>
      <div>
        <span>Email</span>
        <Input type="text" placeholder="Введите пошту" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <span>Пароль</span>
        <Input type="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button className="w-full" disabled={!email || !password} onClick={handleLogin}>
        Войти
      </Button>
    </div>
  );
};
