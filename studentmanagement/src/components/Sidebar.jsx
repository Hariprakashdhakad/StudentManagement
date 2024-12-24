import React from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { PiStudent } from "react-icons/pi";
import { GrChapterAdd } from "react-icons/gr";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { TbReport, TbSettings2 } from "react-icons/tb";
import logo from "../../public/vector.png";

const Sidebar = () => (
  <div className="sidebar-container  h-[400px] w-[224px] flex flex-col items-center py-6">
    <div className=" text-left mb-10  ">
      <img src={logo} alt="Logo" />
    </div>

    {/* Navigation Menu */}
    <ul className="menu flex flex-col gap-[30px] w-full px-4 cursor-pointer">
      <li>
        <a className="menu-item flex items-center text-gray-500 hover:text-blue-500">
          <AiOutlineDashboard className="icon mr-3" /> Dashboard
        </a>
      </li>
      <li>
        <a className="menu-item flex items-center text-gray-500 hover:text-blue-500">
          <PiStudent className="icon mr-3" /> Students
        </a>
      </li>
      <li>
        <a className="menu-item flex items-center text-gray-500 hover:text-blue-500">
          <GrChapterAdd className="icon mr-3" /> Chapters
        </a>
      </li>
      <li>
        <a className="menu-item flex items-center text-gray-500 hover:text-blue-500">
          <IoIosHelpCircleOutline className="icon mr-3" /> Help
        </a>
      </li>
      <li>
        <a className="menu-item flex items-center text-gray-500 hover:text-blue-500">
          <TbReport className="icon mr-3" /> Reports
        </a>
      </li>
      <li>
        <a className="menu-item flex items-center text-gray-500 hover:text-blue-500">
          <TbSettings2 className="icon mr-3" /> Settings
        </a>
      </li>
    </ul>
  </div>
);

export default Sidebar;
