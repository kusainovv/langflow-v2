import { Cross2Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import IconComponent from "../../components/common/genericIconComponent";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { ZERO_NOTIFICATIONS } from "../../constants/constants";
import useAlertStore from "../../stores/alertStore";
import { AlertDropdownType } from "../../types/alerts";
import SingleAlert from "./components/singleAlertComponent";
import { Button } from "@/components/ui/button";

export default function AlertDropdown({
  children,
  notificationRef,
  onClose,
}: AlertDropdownType): JSX.Element {
  const notificationList = useAlertStore((state) => state.notificationList);
  const clearNotificationList = useAlertStore(
    (state) => state.clearNotificationList,
  );
  const removeFromNotificationList = useAlertStore(
    (state) => state.removeFromNotificationList,
  );
  const setNotificationCenter = useAlertStore(
    (state) => state.setNotificationCenter,
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      onClose?.();
    }
  }, [open]);

  return (
    <Popover
      data-testid="notification-dropdown"
      open={open}
      onOpenChange={(target) => {
        setOpen(target);
        if (target) {
          setNotificationCenter(false);
        }
      }}
    >
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        ref={notificationRef}
        data-testid="notification-dropdown-content"
        className="noflow nowheel nopan nodelete nodrag p-0 z-10 flex h-[500px] w-[500px] flex-col shadow-tooltip-custom"
      >
        <div className="text-md flex flex-row items-start py-2 px-2 items-center justify-between bg-navy text-white text-sm">
          Notifications
          <div className="flex gap-1">
            <Button
              className="w-[24px] h-[24px] p-0 text-black"
              onClick={() => {
                setOpen(false);
                setTimeout(clearNotificationList, 100);
              }}
            >
              <IconComponent name="Trash2" className="h-4 w-4" />
            </Button>
            <Button
              className="w-[24px] h-[24px] p-0 text-black"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Cross2Icon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="text-high-foreground mt-3 flex h-full w-full flex-col overflow-y-scroll scrollbar-hide">
          {notificationList.length !== 0 ? (
            notificationList.map((alertItem, index) => (
              <SingleAlert
                key={alertItem.id}
                dropItem={alertItem}
                removeAlert={removeFromNotificationList}
              />
            ))
          ) : (
            <div className="flex h-full w-full items-center justify-center pb-16 text-ring">
              {ZERO_NOTIFICATIONS}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
