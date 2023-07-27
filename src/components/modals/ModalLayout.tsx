import { ReactNode } from "react";
import { clsx } from "@mantine/core";

interface ModalLayoutProps {
  title?: string;
  children: ReactNode;
  minHeight?: boolean;
  padding?: boolean;
  titleNode?: ReactNode;
}

const ModalLayout = ({
  title,
  children,
  titleNode,
  minHeight = true,
  padding = true,
}: ModalLayoutProps) => {
  return (
    <div>
      {(title || titleNode) && (
        <div className="border-b-solid border-b-[1px] border-b-gray-300 px-10 py-2 text-center">
          {title && <div className="text-lg font-semibold">{title}</div>}
          {titleNode}
        </div>
      )}
      <div
        className={clsx(
          "overflow-y-auto",
          {
            "px-4 py-4": padding,
            "max-h-[95vh]": !(title || titleNode),
            "max-h-[70vh]": title || titleNode,
            "min-h-[40vh]": minHeight,
          },
          "flex flex-col"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
