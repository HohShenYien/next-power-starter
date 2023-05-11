"use client";

import {
  Button as MantineButton,
  clsx,
  ButtonProps as MantineButtonProps,
} from "@mantine/core";

import { PolymorphicComponentProps } from "@mantine/utils";

type ButtonProps = PolymorphicComponentProps<"button", MantineButtonProps>;

const Button = ({ children, variant = "filled", ...props }: ButtonProps) => {
  return (
    <MantineButton
      {...props}
      className={clsx(props.className, "rounded-full transition-all", {
        "bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700":
          variant == "filled",
        "!bg-transparent text-indigo-500 hover:border-indigo-600 hover:text-indigo-600 active:text-indigo-700":
          variant == "subtle",
        "border-indigo-600 bg-transparent text-indigo-500 hover:border-indigo-600 hover:bg-indigo-500/20 active:bg-indigo-600/20":
          variant == "outline",
      })}
      variant={variant}
      classNames={{ root: "!h-[unset] py-1" }}
    >
      {children}
    </MantineButton>
  );
};

export default Button;
