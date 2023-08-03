import Button from "@/components/buttons/Button";
import ModalLayout from "@/components/modals/ModalLayout";
import openModal from "@/utils/modals/openModal";
import { MantineModal, registerModal } from "@/utils/modals/types";
import { TextInput, PasswordInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import Image from "next/image";
import { z } from "zod";
import { useLoginMutation } from "../queries";

export interface LoginModalProps {}

const authSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type AuthType = z.infer<typeof authSchema>;

const LoginModal: MantineModal<LoginModalProps> = () => {
  const mutation = useLoginMutation();
  const form = useForm<AuthType>({
    validate: zodResolver(authSchema),
    initialValues: {
      email: "hohshenyien@gmail.com",
      password: "asdf",
    },
  });

  const submitForm = (data: AuthType) => {
    mutation.mutateAsync(data).catch((err) => {
      notifications.show({
        message: err.response.data.message,
        color: "red",
      });
    });
  };

  return (
    <ModalLayout padding={false}>
      <div className="grid h-[500px] grid-cols-12">
        <div className="col-span-6 space-y-4 px-6 py-8">
          <h2 className="text-2xl font-semibold">Login</h2>
          <form className="space-y-2" onSubmit={form.onSubmit(submitForm)}>
            <TextInput
              label="Email"
              placeholder="example@mail.com"
              variant="filled"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              variant="filled"
              {...form.getInputProps("password")}
            />

            <Button
              fullWidth
              className="!mt-5"
              type="submit"
              loading={mutation.isLoading}
            >
              Sign In
            </Button>
          </form>
          <div className="!mt-6 text-center text-sm">
            <p className="text-center text-zinc-500">
              {"Don't have an account yet?"}
            </p>
            <Button
              variant="link"
              onClick={() =>
                openModal({
                  type: registerModal,
                  innerProps: {},
                  closeAll: true,
                })
              }
            >
              Register
            </Button>
          </div>
        </div>

        <div className="relative col-span-6 h-full">
          <Image alt="Mountains" src="/random-image.jpg" fill />
        </div>
      </div>
    </ModalLayout>
  );
};

LoginModal.properties = {
  withCloseButton: false,
  size: "lg",
};

export default LoginModal;
