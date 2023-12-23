import React, { useState } from "react";

import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import OutsideClickHandler from "react-outside-click-handler";

import { GroupingOptions, OrderingOptions } from "../constant";

const Header = ({ grouping, setGrouping, ordering, setOrdering }) => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  return (
    <div className="Header h-16 bg-white border-b-2 border-gray-300 p-2 flex justify-between items-center relative">
      <button
        className="Display__button h-7 bg-white border border-gray-300 rounded-md px-6 font-normal text-gray-600 cursor-pointer transition duration-300 ease-in-out flex items-center gap-1"
        onClick={() => {
          setOpen1((e) => !e);
          setOpen2(false);
          setOpen3(false);
        }}
      >
        <TuneIcon /> <span>Display</span> <KeyboardArrowDownIcon />
      </button>
      {open1 && (
        <OutsideClickHandler
          onOutsideClick={() => {
            setOpen1(false);
          }}
        >
          <div className="DropdownBox absolute top-16 left-3 bg-white border border-gray-300 rounded-md shadow-md flex flex-col gap-4 p-2 z-10">
            <div className="flex items-center gap-4 text-gray-600">
              <span>Grouping</span>
              <button
                className="Display__button h-6 bg-white border border-gray-300 rounded-md px-6 font-semibold text-gray-600 cursor-pointer transition duration-300 ease-in-out flex items-center gap-1"
                onClick={() => {
                  setOpen2((e) => !e);
                  setOpen3(false);
                }}
              >
                {GroupingOptions[grouping]} <KeyboardArrowDownIcon />
              </button>
              {open2 && (
                <OutsideClickHandler
                  onOutsideClick={() => {
                    setOpen2(false);
                  }}
                >
                  <div className="DropdownBox absolute top-8 left-32 bg-white border border-gray-300 rounded-md shadow-md flex flex-col gap-4 p-2">
                    {GroupingOptions.map((option, id) => (
                      <button
                        className="hover:bg-gray-100 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2 rounded-md"
                        key={id}
                        onClick={() => {
                          setGrouping(id);
                          localStorage.setItem("grouping", id);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </OutsideClickHandler>
              )}
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <span>Ordering</span>
              <button
                className="Display__button h-8 bg-white border border-gray-300 rounded-md px-6 font-semibold text-gray-600 cursor-pointer transition duration-300 ease-in-out flex items-center gap-1"
                onClick={() => {
                  setOpen3((e) => !e);
                  setOpen2(false);
                }}
              >
                {OrderingOptions[ordering]} <KeyboardArrowDownIcon />
              </button>
              {open3 && (
                <OutsideClickHandler
                  onOutsideClick={() => {
                    setOpen3(false);
                  }}
                >
                  <div className="DropdownBox absolute top-20 left-28 bg-white border border-gray-300 rounded-md shadow-md flex flex-col gap-4 p-2">
                    {OrderingOptions.map((option, id) => (
                      <button
                        className="hover:bg-gray-100 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2 rounded-md"
                        key={id}
                        onClick={() => {
                          setOrdering(id);
                          localStorage.setItem("ordering", id);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </OutsideClickHandler>
              )}
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default Header;
