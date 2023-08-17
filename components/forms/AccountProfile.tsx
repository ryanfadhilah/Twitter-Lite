"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidation } from "@/lib/validations/user";

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
  const form = useForm({
    resolver: zodResolver(userValidation),
    defaultValues: {
      profile_photo: "",
      name: "",
      username: "",
      bio: "",
    },
  });

  return;
  // <Form>AccountProfile</Form>;
};

export default AccountProfile;
