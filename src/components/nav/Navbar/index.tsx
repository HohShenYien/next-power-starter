import Button from "@/components/buttons/Button";
import Link from "next/link";
import Logo from "../../branding/Logo";
import { clsx } from "@mantine/core";
import useNavStyles from "./useNavStyles";
import openModal from "@/utils/modals/openModal";
import { loginModal, registerModal } from "@/utils/modals/types";
import { useRouter } from "next/router";
import useSession from "@/features/Auth/hooks/useSession";
import { authRedirectPath } from "@/configs/auth.config";
import { useLogoutMutation } from "@/features/Auth/queries";

const Navbar = () => {
  const navStyle = useNavStyles();
  const router = useRouter();
  const { isLoading, mutate: logout } = useLogoutMutation();

  const { status } = useSession();
  const authAction = (modal: typeof loginModal | typeof registerModal) => {
    if (status === "authenticated") {
      router.push(authRedirectPath);
    } else {
      openModal({
        type: modal,
        innerProps: {},
      });
    }
  };

  return (
    <div
      className={clsx(
        "fixed left-0 right-0 top-0 z-20 flex flex-row justify-center py-4"
      )}
      style={{ ...navStyle }}
    >
      <nav className="flex max-w-6xl flex-1 flex-row items-center justify-between">
        <Link href="/">
          <div className="flex items-center">
            <Logo size={96} />
          </div>
        </Link>
        <div className="space-x-4">
          {status === "authenticated" ? (
            <>
              <Link href="/protected">
                <Button variant="subtle" color="indigo" size="lg">
                  Protected Page
                </Button>
              </Link>
              <Button
                variant="subtle"
                size="lg"
                onClick={() => logout()}
                loading={isLoading}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="subtle"
                size="lg"
                onClick={() => {
                  authAction(loginModal);
                }}
              >
                Sign in
              </Button>
              <Button
                size="lg"
                onClick={() => {
                  authAction(registerModal);
                }}
              >
                Register
              </Button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
