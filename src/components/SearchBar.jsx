import { useNoteContext,  } from "@/context/NoteContext";
import { IoSearchOutline } from "react-icons/io5";
const SearchBar = () => {
  const { values } = useNoteContext();

  return (
    <div className="  flex   bg-gray-100 border p-2 rounded-md min-[200px]:w-full  lg:w-[400px] ">

        <span className=" border-r pr-1 border-gray-400">
            <IoSearchOutline size={22}/>
        </span>
      <input
        className="  outline-none w-full h-full px-4 bg-transparent a"
        type="text"
        value={values.searchQuery}
        onChange={values.handleSearchInputChange}
      />
    


 
    </div>
  );
};

export default SearchBar;
