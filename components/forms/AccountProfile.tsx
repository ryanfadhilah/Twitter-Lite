"use client";

// import { Form } from "../ui/form";
// import {} from "react-hook-form";

interface interfaceAccountProfile {
  user: {
    id: string;
    objectId: string;
    username: string;
    bio: string;
    image: string;
  };
  buttonTitle: string;
}

const AccountProfile = ({ user, buttonTitle }: interfaceAccountProfile) => {
  return;
  // <Form>AccountProfile</Form>;
};

export default AccountProfile;
