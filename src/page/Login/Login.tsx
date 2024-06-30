import React from "react";
import { UserDataTriggerInterface } from "../../app/types";
import { LoginForm } from "../../components/Login/LoginForm";

export const Login: React.FC<UserDataTriggerInterface> = ({
  userDataTrigger,
}) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <LoginForm userDataTrigger={userDataTrigger} />
    </div>
  );
};
