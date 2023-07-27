import { HelloWorldModalProps } from "@/components/modals/HelloWorldModal";
import { ContextModalProps, modals } from "@mantine/modals";
import { ReactElement } from "react";

export const helloWorldModal = "Hello World Modal";
export const secondModal = "Second Modal";
export const loginModal = "Login Modal";
export const registerModal = "Register Modal";

export type ModalType =
  | typeof helloWorldModal
  | typeof secondModal
  | typeof loginModal
  | typeof registerModal;

export type ModalInnerProps = {
  [key in typeof helloWorldModal]: HelloWorldModalProps;
} & {
  [key in typeof secondModal | typeof registerModal | typeof loginModal]: {};
};

export type MantineModal<P extends Record<string, any> = {}> = ((
  props: ContextModalProps<P>
) => ReactElement) & {
  properties?: Omit<
    Parameters<typeof modals.openContextModal>[0],
    "modal" | "innerProps"
  >;
};
