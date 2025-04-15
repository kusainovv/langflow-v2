
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
      <MenuList className="xp-menu bg-red-500" style={{ position: 'absolute' }}>
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

export const DesktopAboutMeIcon = () => {
    return <DesktopIcon onDoubleClick={() => {
      alert('')
    }} iconSrc="https://win98icons.alexmeub.com/images/computer_explorer-2.png" label="About Me" />
}