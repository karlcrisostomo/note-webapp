import { useRef, useState } from "react";
import { useNoteContext } from "@/context/NoteContext";

const Modal = ({ isOpen }) => {
  const ref = useRef(null);
  const { values } = useNoteContext();

  return (
    <>
      {isOpen && (
        <section className=" flex justify-center items-center fixed bg-black/20  z-50 w-full left-0 right-0 top-0 bottom-0   ">
          <form action="" onSubmit={values.handleSubmit}>
            <div
              ref={ref}
              className="  p-5 bg-white  flex-col border  min-[200px]:min-w-[350px] sm:w-[450px] md:w-[500px] h-[500px]  rounded-lg  "
            >
              <h1 className="font-medium text-lg">
                {values.editing ? "Update Task" : "Create Task"}
              </h1>

              <div className="flex flex-col  py-4">
                <label>Title</label>
                <input
                  className="outline-1 px-2 mb-2 outline-double rounded-sm"
                  name="title"
                  value={values.formData.title}
                  onChange={values.handleInputChange}
                />
                <label className=" mb-2">Description</label>

                <textarea
                  name="description"
                  className=" outline-gray-200 p-2  border-gray-200 border-[1px] resize-none"
                  value={values.formData.description}
                  onChange={values.handleInputChange}
                  // maxLength={500}
                  cols="10"
                  rows="5"
                ></textarea>
                <div className="flex justify-between mt-4">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    Save
                  </button>
                  <button
                    onClick={values.handleCancel}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default Modal;
