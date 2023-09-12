import React from "react";
import { RiLoader4Fill, RiLoader5Fill } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { VscLoading } from "react-icons/vsc";

export default function Loading() {
  return (
    <div className="animate-spin text-heading4-medium text-blue grid w-full h-80 place-items-center">
      <div className="relative w-fit h-[24px] animate-spin">
        <RiLoader5Fill className=" shrink-0 text-heading3-bold " />
        <RiLoader4Fill className=" shrink-0 text-heading3-bold absolute bottom-0 text-white/30" />
      </div>
    </div>
  );
}
