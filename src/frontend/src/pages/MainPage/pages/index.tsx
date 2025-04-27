import LoadingComponent from "@/components/common/loadingComponent";
import CardsWrapComponent from "@/components/core/cardsWrapComponent";
import SideBarFoldersButtonsComponent from "@/components/core/folderSidebarComponent/components/sideBarFolderButtons";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useDeleteFolders } from "@/controllers/API/queries/folders";
import { useCustomNavigate } from "@/customization/hooks/use-custom-navigate";
import useAlertStore from "@/stores/alertStore";
import useFlowsManagerStore from "@/stores/flowsManagerStore";
import { useFolderStore } from "@/stores/foldersStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useFileDrop from "../hooks/use-on-file-drop";
import ModalsComponent from "../oldComponents/modalsComponent";
import EmptyPage from "./emptyPage";
import background from "../../../../public/assets/wallpapers/background.jpg"
import { DesktopAboutMeIcon } from "@/features/desktop/components/DesktopIcon/AboutMe/ui";
import { DesktopNewFlowIcon } from "@/features/desktop/components/DesktopIcon/NewFlow/ui";
import { DesktopMailIcon } from "@/features/desktop/components/DesktopIcon/Mail/ui";
import { DesktopGoogleSignInIcon } from "@/features/desktop/components/DesktopIcon/GoogleSignIn/ui";

export default function CollectionPage(): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteFolderModal, setOpenDeleteFolderModal] = useState(false);
  const setFolderToEdit = useFolderStore((state) => state.setFolderToEdit);
  const navigate = useCustomNavigate();
  const flows = useFlowsManagerStore((state) => state.flows);
  const examples = useFlowsManagerStore((state) => state.examples);
  const handleFileDrop = useFileDrop("flow");
  const setSuccessData = useAlertStore((state) => state.setSuccessData);
  const setErrorData = useAlertStore((state) => state.setErrorData);
  const folderToEdit = useFolderStore((state) => state.folderToEdit);
  const folders = useFolderStore((state) => state.folders);
  const queryClient = useQueryClient();

  useEffect(() => {
    return () => queryClient.removeQueries({ queryKey: ["useGetFolder"] });
  }, []);

  const { mutate } = useDeleteFolders();

  const handleDeleteFolder = () => {
    mutate(
      {
        folder_id: folderToEdit?.id!,
      },
      {
        onSuccess: () => {
          setSuccessData({
            title: "Folder deleted successfully.",
          });
          navigate("/all");
        },
        onError: (err) => {
          console.error(err);
          setErrorData({
            title: "Error deleting folder.",
          });
        },
      },
    );
  };

  const ITEM_HEIGHT = 78; // px
  const GAP = 8; // px
  const totalItemHeight = ITEM_HEIGHT + GAP;

  const maxVisibleRows = Math.floor(
    (window.innerHeight - GAP) / totalItemHeight,
  );

  return (
    <SidebarProvider>
      <div
        className={`h-full w-full bg-[#008080]`}
        style={{
          // backgroundImage: "url(https://i.pinimg.com/736x/f2/4f/64/f24f6477aae49fb93b2042d18cd133f3.jpg)",
          // backgroundSize: "cover",
          // imageRendering: "pixelated",
          filter: "saturate(1.2)",
          // objectFit: "cover"
        }}
      >
        <img
          src={background}
          draggable={false}
          style={{
            imageRendering: "pixelated",
            objectFit: "contain",
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: -1,
            filter:
              "sepia(0.2) hue-rotate(2deg) brightness(0.9) contrast(1.2) saturate(1.3)",
            // filter: "sepia(0.2) hue-rotate(10deg) contrast(1.1)",
          }}
        />
        <div className="bg-transparent select-text w-full h-full">
          <div
            style={{
              display: "grid",
              gridTemplateRows: `repeat(${maxVisibleRows}, min-content)`,
              gap: `${GAP}px`,
              gridAutoFlow: "column", // fill top-to-bottom, then left-to-right
              gridAutoColumns: "min-content", // size each column based on its content
            }}
            className={`h-fit w-fit overflow-auto px-4 py-2`}
          >
            <Outlet />
            {/* bg-[#2f7f7f] */}

            <DesktopNewFlowIcon />

            <DesktopAboutMeIcon />

            <DesktopMailIcon />

            <DesktopGoogleSignInIcon />

            {/* <DesktopIcon iconSrc="https://win98icons.alexmeub.com/images/computer_explorer-2.png" label="About Me" />             */}
          </div>

        </div>


        {/* <SideBarFoldersButtonsComponent /> */}
        {/* {flows &&
          examples &&
          folders &&
          (flows?.length !== examples?.length || folders?.length > 1) && (
            <SideBarFoldersButtonsComponent
              handleChangeFolder={(id: string) => {
                navigate(`all/folder/${id}`);
              }}
              handleDeleteFolder={(item) => {
                setFolderToEdit(item);
                setOpenDeleteFolderModal(true);
              }}
            />
          )} */}
      </div>

      {/* <h1>main page test</h1> */}
      {/* {flows &&
        examples &&
        folders &&
        (flows?.length !== examples?.length || folders?.length > 1) && (
          <SideBarFoldersButtonsComponent
            handleChangeFolder={(id: string) => {
              navigate(`all/folder/${id}`);
            }}
            handleDeleteFolder={(item) => {
              setFolderToEdit(item);
              setOpenDeleteFolderModal(true);
            }}
          />
        )}
      <main className="flex h-full w-full overflow-hidden">
        {flows && examples && folders ? (
          <div
            className={`relative mx-auto flex h-full w-full flex-col overflow-hidden`}
          >
            <CardsWrapComponent
              onFileDrop={handleFileDrop}
              dragMessage={`Drop your file(s) here`}
            >
              {flows?.length !== examples?.length || folders?.length > 1 ? (
                <Outlet />
              ) : (
                <EmptyPage setOpenModal={setOpenModal} />
              )}
            </CardsWrapComponent>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <LoadingComponent remSize={30} />
          </div>
        )}
      </main>
      <ModalsComponent
        openModal={openModal}
        setOpenModal={setOpenModal}
        openDeleteFolderModal={openDeleteFolderModal}
        setOpenDeleteFolderModal={setOpenDeleteFolderModal}
        handleDeleteFolder={handleDeleteFolder}
      /> */}
    </SidebarProvider>
  );
}
