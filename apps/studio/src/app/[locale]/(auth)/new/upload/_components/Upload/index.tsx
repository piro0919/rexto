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
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Spacer from "react-spacer";
import { useBoolean } from "usehooks-ts";
import { useShallow } from "zustand/react/shallow";
import { useRouter } from "@/i18n/navigation";
import useNewComicStore from "../../../useNewComicStore";
import Item from "../Item";
import PreviewModal from "../PreviewModal";
import UploadModal from "../UploadModal";
import styles from "./style.module.css";

export default function Upload(): React.JSX.Element {
  const { addFiles, files, setFiles } = useNewComicStore(
    useShallow((state) => ({
      addFiles: state.addFiles,
      files: state.files,
      setFiles: state.setFiles,
    })),
  );
  const { getInputProps, open } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop: (acceptedFiles) => addFiles(acceptedFiles),
  });
  const router = useRouter();
  const {
    setFalse: offIsOpenUploadModal,
    setTrue: onIsOpenUploadModal,
    setValue: setIsOpenUploadModal,
    value: isOpenUploadModal,
  } = useBoolean(false);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const {
    setTrue: onIsOpenPreviewModal,
    setValue: setIsOpenPreviewModal,
    value: isOpenPreviewModal,
  } = useBoolean(false);
  const [initialSlide, setInitialSlide] = useState(0);

  return (
    <>
      <section className={styles.section}>
        <div className={styles.content}>
          <h2 className={styles.h2}>画像のアップロード</h2>
          <p className={styles.description}>
            画像は4枚以上からアップロードできます。アップロードする画像ファイルを
            <span className={styles.clickable} onClick={open}>
              選択
            </span>
            または
            <span className={styles.clickable} onClick={onIsOpenUploadModal}>
              ドラッグ＆ドロップ
            </span>
            することもできます。
          </p>
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
                {files.map((file, index) => (
                  <Item
                    key={JSON.stringify({
                      lastModified: file.lastModified,
                      name: file.name,
                      size: file.size,
                    })}
                    onClick={() => {
                      console.log("hoge");

                      setInitialSlide(index);
                      onIsOpenPreviewModal();
                    }}
                    file={file}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        </div>
        <footer className={styles.footer}>
          <Spacer grow={1} />
          <button
            className={styles.nextButton}
            disabled={files.length < 4}
            onClick={() => router.push("/new/order")}
          >
            次へ
          </button>
        </footer>
      </section>
      <input {...getInputProps()} />
      <UploadModal
        isOpen={isOpenUploadModal}
        offIsOpen={offIsOpenUploadModal}
        onIsOpen={onIsOpenUploadModal}
        setIsOpen={setIsOpenUploadModal}
      />
      <PreviewModal
        initialSlide={initialSlide}
        isOpen={isOpenPreviewModal}
        setIsOpen={setIsOpenPreviewModal}
      />
    </>
  );
}
