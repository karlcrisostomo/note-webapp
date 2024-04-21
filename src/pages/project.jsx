import { useEffect, useRef, useState } from "react";

import { IoIosAdd } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Modal, SearchBar } from "@/components";
import { useTodoContext } from "@/context/NoteContext";

const ProjectList = () => {
  const { values } = useTodoContext();

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
      <SearchBar />
      <div className=" flex items-center">
        <button onClick={(e) => values.handleOpenModal(e)}>
          <IoIosAdd size={32} />
        </button>
      </div>

      <ul className="  grid grid-cols-3 gap-4  ">
        {values.projects.map((project) => (
          <div
            className="  mb-14 rounded-md shadow-sm bg-white p-4  min-w-[400px] h-fit     justify-between    "
            key={project.id}
          >
            <li ref={selectRef} className="    ">
              <div className=" bg-white relative ">
                <div className=" flex items-center justify-between">
                  <h1 className=" font-medium">{project.title}</h1>
                  <button
                    className=" hover:bg-gray-100  p-2 rounded-full "
                    onClick={(e) => toggleOption(project.id, e)}
                  >
                    <HiOutlineDotsVertical size={22} />
                  </button>
                  {isOptionOpen === project.id && (
                    <div className=" absolute bg-white  bottom-24  rounded-md shadow-lg shadow-gray-300   outline-2 outline-gray-200 outline-double  w-[200px]   h-fit  py-4 flex flex-col justify-center  right-2 ">
                      <button
                        onClick={() => {
                          values.handleSelectProject(project.id);
                        }}
                        className=" hover:bg-green-700 hover:text-white w-full"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          values.handleDeleteProject(project.id);
                        }}
                        className=" hover:bg-red-600 hover:text-white w-full"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                <div className="  min-h-[150px]">
                  <p className=" py-2">{project.description}</p>
                </div>

                <p className=" text-end border-t py-2 ">
                  {" "}
                  {project.created_at}
                </p>
              </div>
            </li>
          </div>
        ))}
      </ul>

      <Modal isOpen={values.isModalOpen} />
    </section>
  );
};
const ProjectPage = () => {
  <h1>Project</h1>;
  return (
    <section className="  relative z-30">
      <div className=" flex gap-2">
        <ProjectList key={1} color={"bg-red-600"} />
      </div>
    </section>
  );
};

export default ProjectPage;
