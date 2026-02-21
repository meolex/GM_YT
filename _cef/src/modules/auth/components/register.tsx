import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }

    console.log("Register with email:", email, "and password:", password);
  };

  return (
    <div className="space-y-5">
      <h3 className="py-4 text-5xl font-bold">Регистрация</h3>
      <div>
        <span>Email</span>
        <Input type="text" placeholder="Введите пошту" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <span>Пароль</span>
        <Input type="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <span>Подтвердите пароль</span>
        <Input type="password" placeholder="Подтвердите пароль" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>
      <Button className="w-full" disabled={!email || !password || !confirmPassword || password !== confirmPassword} onClick={handleRegister}>
        Зарегистрироваться
      </Button>
    </div>
  );
};
