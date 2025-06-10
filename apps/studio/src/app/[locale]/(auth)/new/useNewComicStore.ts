import uniqueObjects, { type Obj } from "unique-objects";
import { create } from "zustand";

export type NewComicState = {
  addFiles: (files: File[]) => void;
  files: File[];
  setFiles: (files: File[]) => void;
};

const useNewComicStore = create<NewComicState>((set) => ({
  addFiles: (files): void =>
    set((state) => ({
      files: uniqueObjects([...state.files, ...files] as unknown as Obj[], [
        "lastModified",
        "name",
        "size",
      ]) as unknown as File[],
    })),
  files: [],
  setFiles: (files): void => set({ files }),
}));

export default useNewComicStore;
