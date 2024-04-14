import React from "react";
import { RegisterBlock } from "../../components/Register/RegisterBlock";
import { UserDataTriggerInterface } from "../../app/types";

export const Register: React.FC<UserDataTriggerInterface> = ({
  userDataTrigger,
}) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <RegisterBlock userDataTrigger={userDataTrigger} />
    </div>
  );
};
