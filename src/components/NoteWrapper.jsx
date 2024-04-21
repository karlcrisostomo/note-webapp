import { IoIosAdd } from "react-icons/io";

import { Card, Modal, SearchBar, ThemeButton } from "@/components";
import { useNoteContext } from "@/context/NoteContext";
import { useThemeContext } from "@/context/ThemeContext";

const NoteWrapper = () => {
  const { values } = useNoteContext();
const {isDark} = useThemeContext()
  return (
    <section className=" z-40  h-full ">
      <div className=" flex justify-between  items-center">
        <SearchBar />
        <ThemeButton/>
      </div>

      <div className=" py-12 flex flex-col w-fit">
        <button
          className="  bg-blue-600 hover:bg-blue-700 transition-all duration-200 rounded-md p-4   "
          title="Create New Note"
          onClick={(e) => values.handleOpenModal(e)}
        >
          <IoIosAdd size={42} color="white" />
        </button>
        <span className={!isDark ? "text-black": "text-white"}>New Note</span>
      </div>

      <ul className=" grid   md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3  gap-4   ">
        {values.notes.map((note) => (
          <Card key={note.id} note={note} />
        ))}
      </ul>

      <Modal isOpen={values.isModalOpen} />
    </section>
  );
};

export default NoteWrapper;
