"use client";
import { Dialog } from "radix-ui";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useEventListener } from "usehooks-ts";
import useNewComicStore from "../../../useNewComicStore";
import styles from "./style.module.css";

export type UploadModalProps = {
  isOpen: boolean;
  offIsOpen: () => void;
  onIsOpen: () => void;
  setIsOpen: (isOpen: boolean) => void;
};

export default function UploadModal({
  isOpen,
  offIsOpen,
  onIsOpen,
  setIsOpen,
}: UploadModalProps): React.JSX.Element {
  const addFiles = useNewComicStore((state) => state.addFiles);
  const { getInputProps, getRootProps, open } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    noClick: true,
    onDrop: (acceptedFiles) => {
      addFiles(acceptedFiles);
      offIsOpen();
    },
  });
  const onDragOver = useCallback(
    (e: DragEvent) => {
      e.preventDefault();

      onIsOpen();
    },
    [onIsOpen],
  );

  useEventListener("dragover", onDragOver);

  return (
    <Dialog.Root onOpenChange={setIsOpen} open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <header className={styles.header}>
            <Dialog.Title className={styles.title}>
              画像のアップロード
            </Dialog.Title>
          </header>
          <main
            {...getRootProps({ className: "dropzone" })}
            className={styles.main}
          >
            <input {...getInputProps()} />
            <Dialog.Description className={styles.description}>
              アップロードする画像ファイルをドラッグ＆ドロップします
            </Dialog.Description>
            <button className={styles.selectButton} onClick={open}>
              ファイルを選択
            </button>
          </main>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
