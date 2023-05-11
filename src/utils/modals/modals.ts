import HelloWorldModal from "@/components/modals/HelloWorldModal";
import { MantineModal, ModalType, helloWorldModal, secondModal } from "./types";
import SecondModal from "@/components/modals/SecondModal";

export const modals: Record<ModalType, MantineModal<any>> = {
  [helloWorldModal]: HelloWorldModal,
  [secondModal]: SecondModal,
};
