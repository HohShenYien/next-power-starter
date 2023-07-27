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
import { useLogout } from "@/features/Auth/utils";

const Navbar = () => {
  const navStyle = useNavStyles();
  const router = useRouter();
  const { status } = useSession();
  const logout = useLogout();
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
                <Button variant="subtle" className="!py-1 text-lg">
                  Protected Page
                </Button>
              </Link>
              <Button
                variant="subtle"
                className="!py-1 text-lg"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="subtle"
                className="!py-1 text-lg"
                onClick={() => {
                  authAction(loginModal);
                }}
              >
                Sign in
              </Button>
              <Button
                className="!py-1 text-lg"
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
