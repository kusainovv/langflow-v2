import { DesktopIcon } from "../../DesktopIcon/ui";

export const DesktopGoogleSignInIcon = () => {

  const signIn = () => {
    window.location.href = 'http://localhost:4000/auth/google'
  }

  return (
    <div className="flex flex-col gap-2 items-start">
      <DesktopIcon
        onDoubleClick={() => signIn()}
        iconSrc={"https://win98icons.alexmeub.com/icons/png/users_key-3.png"}
        label="Google Sign In"
      />
    </div>
  );
};