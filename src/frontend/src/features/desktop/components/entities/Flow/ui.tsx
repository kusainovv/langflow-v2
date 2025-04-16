
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
import { useCustomNavigate } from "@/customization/hooks/use-custom-navigate";
import { useParams } from "react-router-dom";
import useFlowsManagerStore from "@/stores/flowsManagerStore";


interface DesktopFlowIconProps {
    flowData: FlowType
}

interface ContextMenuProps {
  onDelete: Function,
  onDownload: Function
  onDuplicate: Function
}

const ContextMenu = (props: ContextMenuProps) => {

  

    return <>
      <MenuList className="xp-menu" style={{ position: 'absolute' }}>
        <MenuListItem   onClick={props.onDownload} style={{ lineHeight: "1.8", height: "fit-content", fontSize: "12px" }} className="leading-1 text-xs" primary size="sm">Download</MenuListItem>
        <Separator />
        <MenuListItem onClick={props.onDuplicate} style={{ lineHeight: "1.8", height: "fit-content", fontSize: "12px" }} className="leading-1 text-xs" size="sm">Duplicate</MenuListItem>
        <MenuListItem  onClick={props.onDelete} style={{ lineHeight: "1.8", height: "fit-content", fontSize: "12px" }} className="leading-1 text-xs" size="sm">Delete</MenuListItem>
    


      </MenuList>



    </>
  }

interface DesktopFlowIconProps {
    flowData: FlowType
}

export const DesktopFlowIcon = (props: DesktopFlowIconProps) => {

  const navigate = useCustomNavigate();
  const { folderId } = useParams();
  const isComponent = props.flowData.is_component ?? false;
  const setFlowToCanvas = useFlowsManagerStore(
    (state) => state.setFlowToCanvas,
  );

  const editFlowLink = `/flow/${props.flowData.id}${folderId ? `/folder/${folderId}` : ""}`;

  const handleClick = async () => {
    if (!isComponent) {
      await setFlowToCanvas(props.flowData);
      navigate(editFlowLink);
    }
  };



  const descriptionModal = useDescriptionModal([props.flowData?.id], "flow");

    

  const { deleteFlow } = useDeleteFlow();




  const swatchIndex =
  (props.flowData.gradient && !isNaN(parseInt(props.flowData.gradient))
    ? parseInt(props.flowData.gradient)
    : getNumberFromString(props.flowData.gradient ?? props.flowData.id)) %
  swatchColors.length;

  const setSuccessData = useAlertStore((state) => state.setSuccessData);
    const [openDelete, setOpenDelete] = useState(false);
    
  const handleDelete = () => {
    deleteFlow({ id: [props.flowData.id] })
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


  const setErrorData = useAlertStore((state) => state.setErrorData);

  const { getIcon } = useGetTemplateStyle(props.flowData);

  const { handleDuplicate } = useDuplicateFlows({
    selectedFlowsComponentsCards: [props.flowData.id],
    allFlows: [props.flowData],
    setSuccessData,
  });

  const handleExport = () => {
    downloadFlow(props.flowData, props.flowData.name, props.flowData.description);
    setSuccessData({ title: `${props.flowData.name} exported successfully` });
  };

  const { handleSelectOptionsChange } = useSelectOptionsChange(
    [props.flowData.id],
    setErrorData,
    setOpenDelete,
    handleDuplicate,
    handleExport,
  );

  
  const onDownload = (e) => {
    e.stopPropagation();
    handleSelectOptionsChange("export");
  }

  const onDuplicate = (e) => {
    e.stopPropagation();
    handleSelectOptionsChange("duplicate");
  }

  const onDelete = (e) => {
    e.stopPropagation();
    setOpenDelete(true);
  }

    return <>
    
    <DesktopIcon label={props.flowData.name} onContextMenu={() => {
        // handleContextMenu
      }}
      onContextMenuNode={({ closeContextMenu }) => (
        <MenuList className="xp-menu">
          <MenuListItem onClick={() => {
            handleSelectOptionsChange("export");
            closeContextMenu();
          }} style={{ lineHeight: "1.8", height: "fit-content", fontSize: "12px" }} className="leading-1 text-xs">
            Download
          </MenuListItem>
          <Separator />
          <MenuListItem onClick={() => {
            handleSelectOptionsChange("duplicate");
            closeContextMenu();
          }} style={{ lineHeight: "1.8", height: "fit-content", fontSize: "12px" }} className="leading-1 text-xs">
            Duplicate
          </MenuListItem>
          <MenuListItem onClick={() => {
            setOpenDelete(true);
            closeContextMenu();
          }} style={{ lineHeight: "1.8", height: "fit-content", fontSize: "12px" }} className="leading-1 text-xs">
            Delete
          </MenuListItem>
        </MenuList>
      )}  
      onDoubleClick={handleClick}
      iconSrc="https://win98icons.alexmeub.com/icons/png/directory_closed_cool-2.png" />


{openDelete &&  <DeleteConfirmationModal
          open={openDelete}
          setOpen={setOpenDelete}
          onConfirm={handleDelete}
          description={descriptionModal}
        >
          <></>
        </DeleteConfirmationModal>}
    </>
}