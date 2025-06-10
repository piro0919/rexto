"use client";
import clsx from "clsx";
import Image from "next/image";
import { Dialog } from "radix-ui";
import { useMemo, useState } from "react";
import useMeasure from "react-use-measure";
import { Keyboard, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useNewComicStore from "../../../useNewComicStore";
import styles from "./style.module.css";

export type PreviewModalProps = {
  initialSlide: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function PreviewModal({
  initialSlide,
  isOpen,
  setIsOpen,
}: PreviewModalProps): React.JSX.Element {
  const files = useNewComicStore((state) => state.files);
  const [slidesPerView, setSlidesPerView] = useState<1 | 2>(1);
  const [ref, { height }] = useMeasure();
  const isSingle = useMemo(() => slidesPerView === 1, [slidesPerView]);

  return (
    <Dialog.Root onOpenChange={setIsOpen} open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <header className={styles.header}>
            <Dialog.Title className={styles.title}>
              漫画のプレビュー
            </Dialog.Title>
          </header>
          <main className={styles.main} ref={ref}>
            <Swiper
              centeredSlides={isSingle}
              className={clsx({ [styles.twoSlidesPerView]: !isSingle })}
              dir="rtl"
              initialSlide={initialSlide}
              keyboard={{ enabled: true }}
              modules={[Keyboard, Virtual]}
              slidesPerGroup={slidesPerView}
              slidesPerView={slidesPerView}
              virtual={true}
            >
              {!isSingle ? <SwiperSlide /> : null}
              {files.map((file, index) => (
                <SwiperSlide
                  key={JSON.stringify({
                    lastModified: file.lastModified,
                    name: file.name,
                    size: file.size,
                  })}
                  className={styles.swiperSlide}
                  virtualIndex={index}
                >
                  <div className={styles.slideInner} style={{ height }}>
                    <Image
                      alt=""
                      className={styles.thumbnail}
                      fill={true}
                      quality={100}
                      src={URL.createObjectURL(file)}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </main>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
