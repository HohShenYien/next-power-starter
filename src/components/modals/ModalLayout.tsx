import { ReactNode } from "react";
import { clsx } from "@mantine/core";

interface ModalLayoutProps {
  title?: string;
  children: ReactNode;
  padding?: boolean;
}

const ModalLayout = ({ title, children, padding = true }: ModalLayoutProps) => {
  return (
    <div>
      {title && (
        <div className="border-b-solid border-b-[1px] border-b-gray-300 px-10 py-2 text-center">
          <div className="text-lg font-semibold">{title}</div>
        </div>
      )}
      <div
        className={clsx(
          "max-h-[95vh] min-h-[40vh] overflow-y-auto",
          {
            "px-3 py-2": padding,
            "max-h-[95vh]": !title,
            "max-h-[80vh]": title,
          },
          "relative"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
