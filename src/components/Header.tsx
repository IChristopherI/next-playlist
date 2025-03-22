import { Home, User } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
interface Props {
  className?: string;
}

const Header: React.FC<Props> = () => {
  return (
    <div className=" max-w-7xl mx-auto flex justify-between p-3">
      <div className="flex gap-5 items-center">
        <div className="bg-neutral-700 p-3 rounded-[50%]">
          <Home size={30} color="white"/>
        </div>
        <Input type="text" size={40} placeholder="Что хочешь включить?"  className="border-gray-400 bg-neutral-800 text-blue-50 placeholder:text-gray-300"/>
      </div>

      <div className="">
        <div className="bg-neutral-700 p-3 rounded-[50%]">
          <User size={30} color="white"/>
        </div>
      </div>
    </div>
  );
};

export default Header;
