import React from "react";
import { LoginBlock } from "../../components/Login/LoginBlock";

interface UserDataTriggerInterface {
  userDataTrigger: any;
}

export const Login: React.FC<UserDataTriggerInterface> = ({
  userDataTrigger,
}) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <LoginBlock userDataTrigger={userDataTrigger} />
    </div>
  );
};
