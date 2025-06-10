import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import Image from "next/image";
import { AspectRatio } from "radix-ui";
import { memo, useMemo } from "react";
import styles from "./style.module.css";

export type ItemProps = {
  file: File;
  onClick: () => void;
};

const Item = memo(function Item({
  file,
  onClick,
}: ItemProps): React.JSX.Element {
  const {
    attributes,
    isDragging,
    listeners,
    setActivatorNodeRef,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: JSON.stringify({
      lastModified: file.lastModified,
      name: file.name,
      size: file.size,
    }),
  });
  const url = useMemo(() => URL.createObjectURL(file), [file]);

  return (
    <li
      className={clsx(styles.item, {
        [styles.dragging]: isDragging,
      })}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      ref={setNodeRef}
    >
      <div {...attributes} {...listeners} ref={setActivatorNodeRef}>
        <AspectRatio.Root ratio={294 / 400}>
          <Image
            alt={file.name}
            className={styles.thumbnail}
            fill={true}
            quality={100}
            src={url}
          />
        </AspectRatio.Root>
      </div>
    </li>
  );
});

export default Item;
