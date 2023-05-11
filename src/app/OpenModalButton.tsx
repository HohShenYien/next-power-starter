"use client";

import Button from "@/components/buttons/Button";
import openModal from "@/utils/modals/openModal";
import { helloWorldModal } from "@/utils/modals/types";

const OpenModalButton = () => {
  return (
    <Button
      className="text-xl"
      onClick={() => {
        openModal({
          type: helloWorldModal,
          innerProps: { name: "Shen Yien" },
        });
      }}
    >
      Show Hello World Modal
    </Button>
  );
};

export default OpenModalButton;
