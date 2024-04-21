import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { createItem, updateItem, deleteItem, getItems } from "@/utils/crud";
const NoteContext = createContext();

export const useNoteContext = () => {
  return useContext(NoteContext);
};

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [editing, setEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    setNotes(getItems());
  }, []);

  const handleOpenModal = useCallback(
    (e) => {
      e.stopPropagation();
      setModalOpen(true);
      setFormData({ title: "", description: "" });
    },
    [setModalOpen, setFormData]
  );

  const handleCancel = useCallback(() => {
    setSelectedProjectId(null);
    setFormData({ title: "", description: "" });
    setEditing(false);
    setModalOpen(false);
  }, [setModalOpen, setFormData]);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    },
    [formData, setFormData]
  );

  const handleCreateItem = useCallback(() => {
    if (!formData.title.trim() || !formData.description.trim()) {
      return;
    }
    const newProject = {
      ...formData,
      created_at: new Date().toDateString(),
    };
    createItem(newProject);

    setNotes(getItems());
    setFormData({ title: "", description: "" });
  }, [formData, createItem, setNotes, setFormData]);

  const handleUpdateItems = useCallback(async () => {
    if (selectedProjectId) {
      const updatedProject = {
        ...formData,
      };
      await updateItem(selectedProjectId, updatedProject);
      setNotes(getItems());

      setSelectedProjectId(null);
    }
  }, [
    selectedProjectId,
    setSelectedProjectId,
    formData,
    setFormData,
    setNotes,
  ]);

  const handleDeleteItem = useCallback((id) => {
    deleteItem(id);
    setNotes(getItems());
  }, []);

  const handleSelectItem = (id) => {
    setSelectedProjectId(id);
    const selectedProject = notes.find((note) => note.id === id);

    setEditing(true);

    setFormData({
      title: selectedProject.title,
      description: selectedProject.description,
    });

    setModalOpen(true);
  };

  const handleSubmit = () => {
    if (editing) {
      handleUpdateItems()
      setEditing(false);
    } else {
      handleCreateItem();
    }
    setModalOpen(false);
  };

  const filteredNotes = notes.filter((note) =>
  note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInputChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const values = {
    notes: filteredNotes,
    editing,
    setEditing,
    searchQuery,
    setSearchQuery,
    setNotes,
    formData,
    isModalOpen,
    setModalOpen,
    hoveredProjectId,
    setHoveredProjectId,
    selectedProjectId,
    setSelectedProjectId,
    setFormData,
    handleSearchInputChange,
    handleSubmit,
    handleCancel,
    handleOpenModal,
    handleCreateItem,
    handleUpdateItems,
    handleDeleteItem,
    handleSelectItem,
    handleInputChange,
  };

  return (
    <NoteContext.Provider value={{ values }}> {children}</NoteContext.Provider>
  );
};
