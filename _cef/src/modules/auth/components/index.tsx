import { useState } from "react";

import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Login } from "@/modules/auth/components/login";
import { Register } from "@/modules/auth/components/register";

export const Auth = () => {
  const [flow, setFlow] = useState<"login" | "register">("login");

  const isLogin = flow === "login";

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[url('assets/images/auth-bg.png')] bg-cover bg-no-repeat">
      <div className="absolute inset-0 bg-black/50" />
      <Card className="z-10 w-[400px]">
        <CardContent>{isLogin ? <Login /> : <Register />}</CardContent>

        <CardFooter>
          <div>{isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}</div>
          <Button variant="link" className="text-blue-500" onClick={() => setFlow(isLogin ? "register" : "login")}>
            {isLogin ? "Зарегестрироваться" : "Войти"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
