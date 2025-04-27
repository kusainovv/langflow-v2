
import { downloadFlow } from "@/utils/reactflowUtils";
import useDuplicateFlows from "@/pages/MainPage/hooks/use-handle-duplicate";
import useAlertStore from "@/stores/alertStore";
import useSelectOptionsChange from "@/pages/MainPage/hooks/use-select-options-change";
import { useState } from "react";
import DeleteConfirmationModal from "@/modals/deleteConfirmationModal";
import useDescriptionModal from "@/pages/MainPage/hooks/use-description-modal";
import { FlowType } from "@/types/flow";
import useDeleteFlow from "@/hooks/flows/use-delete-flow";
import { DesktopIcon } from "../ui";
import { useCustomNavigate } from "@/customization/hooks/use-custom-navigate";
import { useParams } from "react-router-dom";
import useFlowsManagerStore from "@/stores/flowsManagerStore";
import folderIcon from "../../../../../../public/assets/icons/apps/folder.png"

interface DesktopFlowIconProps {
    flowData: FlowType
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

    return <>
    
    <DesktopIcon label={props.flowData.name} onContextMenu={() => {
        // handleContextMenu
      }}
      onContextMenuNode={({ closeContextMenu }) => (
        <div className="dropdown">
          <div className="item bold" onClick={() => {
            handleSelectOptionsChange("export");
            closeContextMenu();
          }}>Download</div>
          <div className="divider horizontal"></div>
          <div className="item" onClick={() => {
             handleSelectOptionsChange("duplicate");
             closeContextMenu();
          }}>Duplicate</div>
          <div className="item" onClick={() => {
             setOpenDelete(true);
             closeContextMenu();
          }}>Delete</div>
        </div>
      )}  
      onDoubleClick={handleClick}
      iconSrc={folderIcon} />


{openDelete &&  <DeleteConfirmationModal
          open={openDelete}
          setOpen={setOpenDelete}
          onConfirm={handleDelete}
          description={descriptionModal}
        />}
    </>
}