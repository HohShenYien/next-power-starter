import { MantineModal } from "@/utils/modals/types";
import ModalLayout from "./ModalLayout";

export interface HelloWorldModalProps {
  name: string;
}

const HelloWorldModal: MantineModal<HelloWorldModalProps> = ({
  innerProps: { name },
}) => {
  return <ModalLayout title="Hello World">Hello {name}</ModalLayout>;
};

HelloWorldModal.properties = {
  classNames: { close: "hover:bg-gray-200" },
};

export default HelloWorldModal;
