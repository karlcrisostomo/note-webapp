import { useEffect, useRef, useState } from "react";

import { HiOutlineDotsVertical } from "react-icons/hi";

import { useNoteContext } from "@/context/NoteContext";
import { useThemeContext } from "@/context/ThemeContext";

const Card = ({ note }) => {
  const { values } = useNoteContext();
  const {isDark} = useThemeContext()

  const selectRef = useRef(null);
  const [isOptionOpen, setOptionOpen] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setOptionOpen(null);
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [setOptionOpen]);

  const toggleOption = (id, e) => {
    e.stopPropagation();
    setOptionOpen((item) => (item === id ? null : id));
  };

  return (
    <section>
      <div className={`  ${!isDark ? "bg-white/55" : " bg-white/65  outline-double border-none  outline-2 outline-white/70 " }  rounded-md shadow-sm   backdrop-blur-md   border p-4  min-[200px]:w-full    lg:min-w-[350px]     h-fit     justify-between     `}>
        <li className="    ">
          <div className=" relative ">
            <div className=" flex items-center justify-between">
              <h1 className=" font-medium">{note.title}</h1>
              <button
                className=" hover:bg-gray-100  p-2 rounded-full "
                onClick={(e) => toggleOption(note.id, e)}
              >
                <HiOutlineDotsVertical size={22} />
              </button>
              {isOptionOpen === note.id && (
                <div
                  ref={selectRef}
                  className=" absolute  bg-white border   bottom-24  rounded-md shadow-sm     w-[200px]   h-fit  py-4 flex flex-col justify-center  right-2 "
                >
                  <button
                    onClick={() => {
                      values.handleSelectItem(note.id);
                    }}
                    className=" hover:bg-green-700 hover:text-white w-full"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      values.handleDeleteItem(note.id);
                    }}
                    className=" hover:bg-red-600 hover:text-white w-full"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            <div className="  min-h-[150px]">
              <p className=" py-2">{note.description}</p>
            </div>

            <p className=" text-end border-t py-2 "> {note.created_at}</p>
          </div>
        </li>
      </div>
    </section>
  );
};

export default Card;
