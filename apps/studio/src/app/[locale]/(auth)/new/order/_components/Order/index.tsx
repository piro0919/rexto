"use client";
import {
  closestCenter,
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { ArrowLeft, Play } from "feather-icons-react";
import Spacer from "react-spacer";
import { useBoolean } from "usehooks-ts";
import { useShallow } from "zustand/react/shallow";
import { Link } from "@/i18n/navigation";
import Item from "../../../upload/_components/Item";
import useNewComicStore from "../../../useNewComicStore";
import PreviewModal from "../PreviewModal";
import styles from "./style.module.css";

export default function Order(): React.JSX.Element {
  const { files, setFiles } = useNewComicStore(
    useShallow((state) => ({
      files: state.files,
      setFiles: state.setFiles,
    })),
  );
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const {
    setTrue: onIsOpen,
    setValue: setIsOpen,
    value: isOpen,
  } = useBoolean(false);

  return (
    <>
      <section className={styles.section}>
        <div className={styles.content}>
          <header className={styles.header}>
            <Link href="/new/upload">
              <ArrowLeft size={21} />
            </Link>
            <h2 className={styles.h2}>画像の順番</h2>
          </header>
          <DndContext
            onDragEnd={({ active, over }) => {
              if (!over || active.id === over.id) {
                return;
              }

              const oldIndex = files.findIndex(
                ({ lastModified, name, size }) =>
                  JSON.stringify({ lastModified, name, size }) === active.id,
              );
              const newIndex = files.findIndex(
                ({ lastModified, name, size }) =>
                  JSON.stringify({ lastModified, name, size }) === over.id,
              );
              const newFiles = arrayMove(files, oldIndex, newIndex);

              setFiles(newFiles);
            }}
            collisionDetection={closestCenter}
            sensors={sensors}
          >
            <SortableContext
              items={files.map(({ lastModified, name, size }) =>
                JSON.stringify({ lastModified, name, size }),
              )}
              strategy={horizontalListSortingStrategy}
            >
              <ul className={styles.list}>
                {files.map((file) => (
                  <Item
                    key={JSON.stringify({
                      lastModified: file.lastModified,
                      name: file.name,
                      size: file.size,
                    })}
                    file={file}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        </div>
        <footer className={styles.footer}>
          <button className={styles.previewButton} onClick={onIsOpen}>
            <Play size={15} />
            <span>漫画のプレビュー</span>
          </button>
          <Spacer grow={1} />
          <button className={styles.nextButton}>次へ</button>
        </footer>
      </section>
      <PreviewModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
