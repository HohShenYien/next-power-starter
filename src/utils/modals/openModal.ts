"use client";

import { modals as allModals } from "./modals";
import { modals } from "@mantine/modals";
import { ModalInnerProps, ModalType } from "./types";
import { Box } from "@mantine/core";

interface OpenModalProps<T extends ModalType> {
  type: T;
  innerProps: ModalInnerProps[T];
}

function openModal<T extends ModalType>({
  type,
  innerProps,
}: OpenModalProps<T>) {
  const modalProperties = allModals[type].properties;
  modals.openContextModal({
    padding: 0,
    modal: type,
    innerProps,
    closeButtonProps: { size: 28 },
    radius: "lg",
    centered: true,
    scrollAreaComponent: Box as any,
    ...modalProperties,
    classNames: {
      header: "absolute bg-transparent top-1 right-1",
      close: "!bg-transparent text-black hover:text-gray-800",
      inner: "overflow-hidden",
      content: "!overflow-hidden",
      ...modalProperties?.classNames,
    },
  });
}

export default openModal;
