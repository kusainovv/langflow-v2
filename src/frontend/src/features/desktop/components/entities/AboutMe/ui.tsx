
import { MenuList, MenuListItem, Separator } from "react95";
import { downloadFlow } from "@/utils/reactflowUtils";
import { swatchColors } from "@/utils/styleUtils";
import { cn, getNumberFromString } from "@/utils/utils";
import { useGetTemplateStyle } from "@/pages/MainPage/utils/get-template-style";
import useDuplicateFlows from "@/pages/MainPage/hooks/use-handle-duplicate";
import useAlertStore from "@/stores/alertStore";
import useSelectOptionsChange from "@/pages/MainPage/hooks/use-select-options-change";
import { useState } from "react";
import DeleteConfirmationModal from "@/modals/deleteConfirmationModal";
import useDescriptionModal from "@/pages/MainPage/hooks/use-description-modal";
import { FlowType } from "@/types/flow";
import useDeleteFlow from "@/hooks/flows/use-delete-flow";
import { DesktopIcon } from "../../DesktopIcon/ui";
import { WindowsModal } from "@/modals/IOModal/window-modal";


interface DesktopFlowIconProps {
    flowData: FlowType
}

interface ContextMenuProps {
    flowData: FlowType

}

const ContextMenu = ({ flowData }: ContextMenuProps) => {
    const setSuccessData = useAlertStore((state) => state.setSuccessData);
    const [openDelete, setOpenDelete] = useState(false);
    const setErrorData = useAlertStore((state) => state.setErrorData);

    const { getIcon } = useGetTemplateStyle(flowData);

    const { handleDuplicate } = useDuplicateFlows({
      selectedFlowsComponentsCards: [flowData.id],
      allFlows: [flowData],
      setSuccessData,
    });
  
    const handleExport = () => {
      downloadFlow(flowData, flowData.name, flowData.description);
      setSuccessData({ title: `${flowData.name} exported successfully` });
    };
  
    const { handleSelectOptionsChange } = useSelectOptionsChange(
      [flowData.id],
      setErrorData,
      setOpenDelete,
      handleDuplicate,
      handleExport,
    );
  

    const descriptionModal = useDescriptionModal([flowData?.id], "flow");

    

  const { deleteFlow } = useDeleteFlow();

  const swatchIndex =
  (flowData.gradient && !isNaN(parseInt(flowData.gradient))
    ? parseInt(flowData.gradient)
    : getNumberFromString(flowData.gradient ?? flowData.id)) %
  swatchColors.length;

  const handleDelete = () => {
    deleteFlow({ id: [flowData.id] })
      .then(() => {
        setSuccessData({
          title: "Selected items deleted successfully",
        });
      })
      .catch(() => {
        setErrorData({
          title: "Error deleting items",
          list: ["Please try again"],
        });
      });
  };


    return (
      <MenuList className="xp-menu" style={{ position: 'absolute' }}>
        <MenuListItem   onClick={(e) => {
        e.stopPropagation();
        handleSelectOptionsChange("export");
      }} style={{ lineHeight: "1.8", height: "fit-content", fontSize: "12px" }} className="leading-1 text-xs" primary size="sm">Download</MenuListItem>
        <Separator />
        <MenuListItem onClick={(e) => {
        e.stopPropagation();
        handleSelectOptionsChange("duplicate");
      }} style={{ lineHeight: "1.8", height: "fit-content", fontSize: "12px" }} className="leading-1 text-xs" size="sm">Duplicate</MenuListItem>
        <MenuListItem  onClick={(e) => {
        e.stopPropagation();
        setOpenDelete(true);
      }} style={{ lineHeight: "1.8", height: "fit-content", fontSize: "12px" }} className="leading-1 text-xs" size="sm">Delete</MenuListItem>
      

      {openDelete && (
        <DeleteConfirmationModal
          open={openDelete}
          setOpen={setOpenDelete}
          onConfirm={handleDelete}
          description={descriptionModal}
        >
          <></>
        </DeleteConfirmationModal>
      )}


      </MenuList>
    );
}

const defaultValue = `💿~~ RATMIR // LEGEND OF THE 90s ~~💿
🎧 Playlist: Tupac, Nirvana, TLC, Beastie Boys
 🛹 Skater by day, ICQ flirt by night
🎬 Favorite movies: The Matrix, Clueless, Fight Club
📺 Lives on MTV, Toonami, Fresh Prince reruns
📟 ICQ UIN: 123456789 – don’t page me unless it’s 🔥
🖥️ Minesweeper > your GPA
💬 Away Message: “Out. Probably renting a VHS.”
🎮 SNES champ // PS1 royalty
💾 Burning mix CDs with Winamp + love
🍕 Eats Pizza Rolls like it’s a sport
📼 Still cries when Blockbuster closes
🕶 Looks like Keanu, vibes like Zack Morris
📡 Internet’s slow… but this style’s lightning
🧃 Capri Sun energy. Fruit Gushers attitude.
🌪️ Goosebumps on the shelf. Tamagotchi on the belt.
🔥 I don’t do drama — I do AOL chatroom warfare
💬 “You had me at dial-up tone.”
`;

export const DesktopAboutMeIcon = () => {
  const [isShowWindow, setShowWindow] = useState(false);
    return <>
      <DesktopIcon onDoubleClick={() => {
          setShowWindow(true)
      }} iconSrc="https://win98icons.alexmeub.com/images/computer_explorer-2.png" label="About Me" />

      <WindowsModal isOpen={isShowWindow} onClose={() => {
              setShowWindow(false)
            }} title="About Me" maxHeight={700} maxWidth={800} maxContentHeight={600} defaultSize={{
              width: 400,
              height: 400
            }} defaultPosition={{ x: 50, y: 50 }}>
              {/* <div className="bg-red-500 h-full w-full"> */}
              
              {/* </div> */}
            <textarea 
 className="w-full h-full flex bg-white overflow-auto resize-none p-1 border-none font-inherit text-xs"
 style={{
   lineHeight: "inherit",
 }}
defaultValue={defaultValue} />
      </WindowsModal>

    </> 
}