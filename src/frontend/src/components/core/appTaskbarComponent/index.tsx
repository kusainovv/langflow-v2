import AlertDropdown from "@/alerts/alertDropDown";
import DataStaxLogo from "@/assets/DataStaxLogo.svg?react";
import LangflowLogo from "@/assets/LangflowLogo.svg?react";
import ForwardedIconComponent from "@/components/common/genericIconComponent";
import ShadTooltip from "@/components/common/shadTooltipComponent";
// import { Button } from "@/components/ui/button";
import { AppBar, Button, Counter, GroupBox, Handle, MenuList, Separator, TextInput, Toolbar } from "react95"
import { CustomOrgSelector } from "@/customization/components/custom-org-selector";
import { CustomProductSelector } from "@/customization/components/custom-product-selector";
import {
  ENABLE_DATASTAX_LANGFLOW,
  ENABLE_NEW_LOGO,
} from "@/customization/feature-flags";
import { useCustomNavigate } from "@/customization/hooks/use-custom-navigate";
// import useTheme from "@/customization/hooks/use-custom-theme";
import useAlertStore from "@/stores/alertStore";
import { useEffect, useRef, useState } from "react";
import { AccountMenu } from "./components/AccountMenu";
import FlowMenu from "./components/FlowMenu";
import GithubStarComponent from "./components/GithubStarButton";
import { AspisIcon } from "@/icons/AspisIcon";
import { ShadowForgeIcon } from "@/icons/ShadowForge";
import moment from "moment";

export default function AppTaskbar(): JSX.Element {

  const [currentTime, setCurrentTime] = useState(moment().format("hh:mm A"));

  const notificationCenter = useAlertStore((state) => state.notificationCenter);
  const navigate = useCustomNavigate();
  const [activeState, setActiveState] = useState<"notifications" | null>(null);
  const lastPath = window.location.pathname.split("/").filter(Boolean).pop();
  const notificationRef = useRef<HTMLButtonElement | null>(null);
  const notificationContentRef = useRef<HTMLDivElement | null>(null);
  // useTheme();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const isNotificationButton = notificationRef.current?.contains(target);
      const isNotificationContent =
        notificationContentRef.current?.contains(target);

      if (!isNotificationButton && !isNotificationContent) {
        setActiveState(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format("hh:mm A"));
    }, 1000 * 60); // Update every minute
  
    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const isNotificationButton = notificationRef.current?.contains(target);
      const isNotificationContent =
        notificationContentRef.current?.contains(target);

      if (!isNotificationButton && !isNotificationContent) {
        setActiveState(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={{
     borderTop: "1px solid white",
  boxShadow: "inset 0 1px 0 rgb(192, 192, 192)"
    }}
     className="taskbar z-0 flex h-fit py-[2px] px-[2px] w-full bg-[#c0c0c0] items-center justify-between border-b dark:bg-silver">
      {/* Left Section */}
      <div className={`w-full flex items-center`}>
        {/* <div
          onClick={() => navigate("/")}
          className="flex gap-2 text-xs items-center text-white cursor-pointer"
          data-testid="icon-ChevronLeft"
        > */}
          {/* {ENABLE_DATASTAX_LANGFLOW ? (
            <DataStaxLogo className="fill-black dark:fill-[white]" />
          ) : ENABLE_NEW_LOGO ? (
            <LangflowLogo className="h-5 w-6" />
          ) : (
            <></>
            // <span className="fill-black text-2xl dark:fill-white">⛓️</span>
          )} */}
          {/* <ShadowForgeIcon /> */}
          <button className="flex items-center gap-x-1" onClick={() => navigate("/")}>
            <img src="https://98.js.org/images/start.png" style={{ width: "16px", height: "14px" }} />
            <b className="text-xs font-extrabold">Start</b>
            {/* <img style={{ height: "14px", width: "45px" }} src="https://win98icons.alexmeub.com/images/start-button.png" /> */}
            {/* <Button fullWidth className="flex gap-x-1">
              <img src="https://win98icons.alexmeub.com/icons/png/windows-0.png" />
              <span className="text-base font-bold">Start</span>
            </Button> */}
          </button>

          <div className="flex items-center gap-x-1">
            <Separator orientation="vertical" size={"23px"} />
            {/* <Handle size={21} className="" /> */}
          </div>

          {/* <div className="w-[240px]">
            <TextInput placeholder="Type here..." fullWidth />
          </div> */}

          <div className="ml-auto flex items-center bg-[#c0c0c0]">
            <Separator className="" orientation="vertical" size={"21px"} />

            <div className="flex w-fit min-h-[21px] items-center py-xp px-2 ml-1 tray inset-shallow"> {/**shadow-button */}
              <span className="taskbar-time">{currentTime}</span>
            </div>
          </div>

              


        {/* </div> */}
        {/* {ENABLE_DATASTAX_LANGFLOW && (
          <>
            <CustomOrgSelector />
            <CustomProductSelector />
          </>
        )} */}
      </div>

      {/* Middle Section */}
      <div className="w-full flex-1 truncate md:max-w-[57%] lg:absolute lg:left-1/2 lg:max-w-[43%] lg:-translate-x-1/2 xl:max-w-[31%]">
        <FlowMenu />
      </div>

      {/* Right Section */}
      {/* <div className={`flex items-center gap-2`}> */}
        {/* {!ENABLE_DATASTAX_LANGFLOW && (
          <>
            <Button
              unstyled
              className="hidden items-center whitespace-nowrap pr-2 2xl:inline"
              onClick={() =>
                window.open("https://github.com/langflow-ai/langflow", "_blank")
              }
            >
              <GithubStarComponent />
            </Button>
          </>
        )} */}
        {/* <AlertDropdown
          notificationRef={notificationContentRef}
          onClose={() => setActiveState(null)}
        >
          <ShadTooltip
            content="Notifications and errors"
            side="bottom"
            styleClasses="z-10"
          >
            <AlertDropdown onClose={() => setActiveState(null)}>
              <Button
                ref={notificationRef}
                // variant="ghost"
                className={`relative ${activeState === "notifications" ? "    " : ""}`}
                onClick={() =>
                  setActiveState((prev) =>
                    prev === "notifications" ? null : "notifications",
                  )
                }
                data-testid="notification_button"
              >
                <span
                  className={
                    notificationCenter
                      ? `absolute w-[12px] h-[12px] right-[-12px] top-[-12px] h-1 w-1   bg-red-500`
                      : "hidden"
                  }
                />
                <ForwardedIconComponent
                  name="Bell"
                  className="side-bar-button-size h-[18px] w-[18px]"
                />
                <span className="hidden whitespace-nowrap 2xl:inline">
                  Notifications
                </span>
              </Button>
            </AlertDropdown>
          </ShadTooltip>
        </AlertDropdown> */}
        {/* {!ENABLE_DATASTAX_LANGFLOW && (
          <>
            <ShadTooltip
              content="Go to LangflowStore"
              side="bottom"
              styleClasses="z-10"
            >
              <Button
                variant="ghost"
                className={` ${lastPath === "store" ? "    " : ""}`}
                onClick={() => {
                  navigate("/store");
                }}
                data-testid="button-store"
              >
                <ForwardedIconComponent
                  name="Store"
                  className="side-bar-button-size h-[18px] w-[18px]"
                />
                <span className="hidden whitespace-nowrap 2xl:inline">
                  Store
                </span>
              </Button>
            </ShadTooltip>
            <Separator
              orientation="vertical"
              className="my-auto h-7 dark:border-zinc-700"
            />
          </>
        )}
        {ENABLE_DATASTAX_LANGFLOW && (
          <>
            <ShadTooltip content="Docs" side="bottom" styleClasses="z-10">
              <Button
                variant="ghost"
                className="flex text-sm font-medium"
                onClick={() =>
                  window.open(
                    "https://docs.datastax.com/en/langflow/index.html",
                    "_blank",
                  )
                }
              >
                <ForwardedIconComponent
                  name="book-open-text"
                  className="side-bar-button-size h-[18px] w-[18px]"
                />
                <span className="hidden whitespace-nowrap 2xl:inline">
                  Docs
                </span>
              </Button>
            </ShadTooltip>
            <ShadTooltip content="Settings" side="bottom" styleClasses="z-10">
              <Button
                data-testid="user-profile-settings"
                variant="ghost"
                className="flex text-sm font-medium"
                onClick={() => navigate("/settings")}
              >
                <ForwardedIconComponent
                  name="Settings"
                  className="side-bar-button-size h-[18px] w-[18px]"
                />
                <span className="hidden whitespace-nowrap 2xl:inline">
                  Settings
                </span>
              </Button>
            </ShadTooltip>
            <Separator
              orientation="vertical"
              className="my-auto h-7 dark:border-zinc-700"
            />
          </>
        )} */}
        {/* <div className="flex">
          <AccountMenu />
        </div> */}
      {/* </div> */}
    </div>
  );
}
