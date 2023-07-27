import {
  ButtonProps as MantineButtonProps,
  Button as MantineButton,
  clsx,
} from "@mantine/core";

import { PolymorphicComponentProps } from "@mantine/utils";

type ButtonProps = PolymorphicComponentProps<"button", MantineButtonProps> & {
  gray?: boolean;
};

const Button = ({
  children,
  variant = "filled",
  gray = false,
  ...props
}: ButtonProps) => {
  return (
    <MantineButton
      {...props}
      className={clsx(props.className, "rounded-md py-2 transition-all", {
        "border-gray-400 text-gray-500 hover:border-gray-500 hover:bg-gray-200/25 active:bg-gray-200/50":
          gray,
        "bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700":
          variant == "filled",
        "!bg-transparent text-indigo-500 hover:border-indigo-600 hover:text-indigo-600 active:text-indigo-700":
          variant == "subtle",
        "border-indigo-600 bg-transparent text-indigo-500 hover:border-indigo-600 hover:bg-indigo-500/20 active:bg-indigo-600/20":
          variant == "outline",
        "text-indigo-500 hover:text-indigo-600 hover:underline active:text-indigo-700":
          variant == "link",
        "border-none bg-transparent text-indigo-500 hover:bg-indigo-100 hover:text-indigo-600 active:bg-indigo-200":
          variant == "default",
      })}
      variant={variant}
      classNames={{ root: "!h-[unset]", label: "py-0.5" }}
    >
      {children}
    </MantineButton>
  );
};

export default Button;
