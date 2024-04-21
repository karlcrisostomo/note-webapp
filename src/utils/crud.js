"use client";

import { v4 as uuidv4 } from "uuid";
const STORAGE_KEY = "notes";

let items;
let updatedItems;
const getNotesFromLocalStorage = () => {
  if (typeof localStorage !== "undefined") {
    const storedNotes = localStorage.getItem(STORAGE_KEY);
    return storedNotes ? JSON.parse(storedNotes) : [];
  }
  return [];
};

const saveNotesToLocalStorage = async (projects) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }
};

export const getItems = () => {
  return getNotesFromLocalStorage() || [];
};

export const createItem = (newItem) => {
  items = getNotesFromLocalStorage();
  items.push({ id: uuidv4(), ...newItem });
  saveNotesToLocalStorage(items);

  return items;
};

export const updateItem = (id, newItems) => {
  items = getNotesFromLocalStorage();
  updatedItems = items.map((items) =>
    items.id === id ? { ...items, ...newItems } : items
  );
  saveNotesToLocalStorage(updatedItems);
  return updatedItems;
};

export const deleteItem = (id) => {
  items = getNotesFromLocalStorage();
  updatedItems = items.filter((item) => item.id !== id);
  saveNotesToLocalStorage(updatedItems);

  return updatedItems;
};
