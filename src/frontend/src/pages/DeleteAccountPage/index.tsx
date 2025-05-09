import LangflowLogo from "@/assets/LangflowLogo.svg?react";
import { ENABLE_NEW_LOGO } from "@/customization/feature-flags";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import BaseModal from "../../modals/baseModal";

export default function DeleteAccountPage() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteAccount = () => {
    // Implement your account deletion logic here
    // For example, make an API call to delete the account
    // Upon successful deletion, you can redirect the user to another page
    // Implement the logic to redirect the user after account deletion.
    // For example, use react-router-dom's useHistory hook.
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center  ">
      <div className="flex w-72 flex-col items-center justify-center gap-2">
        {/* {ENABLE_NEW_LOGO ? (
          <LangflowLogo
            title="Langflow logo"
            className="mb-4 h-10 w-10 scale-[1.5]"
          />
        ) : (
          <span className="mb-4 text-5xl">⛓️</span>
        )} */}
        <span className="mb-4 text-center text-2xl   text-black">
          Delete your account
        </span>
        <Input placeholder="Confirm password" />

        <BaseModal
          open={showConfirmation}
          setOpen={setShowConfirmation}
          size="x-small"
        >
          <BaseModal.Header description="This action is irreversible and will permanently erase all your data and information associated with the account. ">
            <h3>Are you sure ?</h3>
          </BaseModal.Header>
          <BaseModal.Trigger>
            <Button
              variant="default"
              className="w-full hover:bg-status-red"
              onClick={() => setShowConfirmation(true)}
            >
              Delete account
            </Button>
          </BaseModal.Trigger>
          <BaseModal.Content>
            <div className="flex h-full w-full flex-col justify-end">
              <Button
                variant="default"
                className="w-full hover:bg-status-red"
                onClick={() => handleDeleteAccount()}
              >
                Delete account
              </Button>
            </div>
          </BaseModal.Content>
        </BaseModal>
      </div>
    </div>
  );
}
