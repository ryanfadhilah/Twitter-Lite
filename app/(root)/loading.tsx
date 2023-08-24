import React from "react";
import { RiLoaderFill } from "react-icons/ri";

export default function Loading() {
  return (
    <div className="animate-spin text-heading4-medium text-blue grid w-full h-80 place-items-center">
      <RiLoaderFill className=" shrink-0 animate-pulse" />
    </div>
  );
}
