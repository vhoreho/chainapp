import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthContext } from "@/hooks/context";

export const Dashboard = () => {
  const { logout } = useAuthContext();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Добро пожаловать в панель управления!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Вы успешно вошли в систему.</p>
          <Button onClick={logout} variant="outline">
            Выйти
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
