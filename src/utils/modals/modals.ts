import HelloWorldModal from "@/components/modals/HelloWorldModal";
import {
  MantineModal,
  ModalType,
  helloWorldModal,
  loginModal,
  registerModal,
  secondModal,
} from "./types";
import SecondModal from "@/components/modals/SecondModal";
import LoginModal from "@/features/Auth/modals/LoginModal";
import RegisterModal from "@/features/Auth/modals/RegisterModal";

export const modals: Record<ModalType, MantineModal<any>> = {
  [helloWorldModal]: HelloWorldModal,
  [secondModal]: SecondModal,
  [loginModal]: LoginModal,
  [registerModal]: RegisterModal,
};
