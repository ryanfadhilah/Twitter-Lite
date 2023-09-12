import React from "react";
import { RiLoaderFill } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { VscLoading } from "react-icons/vsc";

export default function Loading() {
  return (
    <div className="animate-spin text-heading4-medium text-blue grid w-full h-80 place-items-center">
      <VscLoading className="text-5xl shrink-0 animate-pulse" />
    </div>
  );
}
