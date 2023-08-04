import {
  ButtonProps as MantineButtonProps,
  Button as MantineButton,
  clsx,
} from "@mantine/core";

import { PolymorphicComponentProps } from "@mantine/utils";

type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

type ButtonProps = PolymorphicComponentProps<"button", MantineButtonProps> & {
  size?: ButtonSize;
  variant?:
    | "gradient"
    | "filled"
    | "outline"
    | "light"
    | "white"
    | "default"
    | "subtle"
    | "link";
};

const sizeToClassMapper = (size: ButtonSize) => {
  switch (size) {
    case "xs":
      return "px-2 py-0.5 text-xs ";
    case "sm":
      return "px-3 py-0.5 text-sm";
    case "md":
      return "px-4 py-2";
    case "lg":
      return "text-lg py-1 px-5";
    default:
      return "text-xl py-1.5 px-5";
  }
};

const Button = ({
  children,
  variant = "filled",
  color = "indigo",
  size = "md",
  classNames,
  ...props
}: ButtonProps) => {
  return (
    <MantineButton
      {...props}
      color={color}
      variant={variant === "link" ? "subtle" : variant}
      classNames={{
        root: clsx("!h-[unset]", sizeToClassMapper(size), classNames?.root, {
          "!bg-transparent hover:brightness-75 transition-all":
            variant === "link",
        }),
        label: clsx("py-0.5", classNames?.label),
        ...classNames,
      }}
    >
      {children}
    </MantineButton>
  );
};

export default Button;
