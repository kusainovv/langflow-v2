import ForwardedIconComponent from "@/components/common/genericIconComponent";
import useDragStart from "@/components/core/cardComponent/hooks/use-on-drag-start";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCustomNavigate } from "@/customization/hooks/use-custom-navigate";
import useDeleteFlow from "@/hooks/flows/use-delete-flow";
import DeleteConfirmationModal from "@/modals/deleteConfirmationModal";
import useAlertStore from "@/stores/alertStore";
import useFlowsManagerStore from "@/stores/flowsManagerStore";
import { FlowType } from "@/types/flow";
import { swatchColors } from "@/utils/styleUtils";
import { cn, getNumberFromString } from "@/utils/utils";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useDescriptionModal from "../../hooks/use-description-modal";
import { useGetTemplateStyle } from "../../utils/get-template-style";
import { timeElapsed } from "../../utils/time-elapse";
import DropdownComponent from "../dropdown";
import { MenuList, MenuListItem, Separator } from "react95";
import useSelectOptionsChange from "../../hooks/use-select-options-change";
import useDuplicateFlows from "../../hooks/use-handle-duplicate";
import { downloadFlow } from "@/utils/reactflowUtils";
import { DesktopIcon } from "@/features/desktop/components/DesktopIcon/ui";
import { DesktopFlowIcon } from "@/features/desktop/components/entities/Flow/ui";

const ListComponent = ({ flowData }: { flowData: FlowType }) => {
  const navigate = useCustomNavigate();

  const [openDelete, setOpenDelete] = useState(false);
  const setSuccessData = useAlertStore((state) => state.setSuccessData);
  const { deleteFlow } = useDeleteFlow();
  const setErrorData = useAlertStore((state) => state.setErrorData);
  const { folderId } = useParams();
  const isComponent = flowData.is_component ?? false;
  const setFlowToCanvas = useFlowsManagerStore(
    (state) => state.setFlowToCanvas,
  );
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

  
  const editFlowLink = `/flow/${flowData.id}${folderId ? `/folder/${folderId}` : ""}`;

  const handleClick = async () => {
    if (!isComponent) {
      await setFlowToCanvas(flowData);
      navigate(editFlowLink);
    }
  };

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


  const { onDragStart } = useDragStart(flowData);

  const descriptionModal = useDescriptionModal([flowData?.id], "flow");

  const swatchIndex =
    (flowData.gradient && !isNaN(parseInt(flowData.gradient))
      ? parseInt(flowData.gradient)
      : getNumberFromString(flowData.gradient ?? flowData.id)) %
    swatchColors.length;

    const ContextMenu = ({ x, y }) => {
      return (
        <MenuList className="xp-menu bg-red-500" style={{ top: y, left: x, position: 'absolute' }}>
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
        
        </MenuList>
      );
    }

    // display: grid
    // ;
    //     grid-template-columns: min-content min-content min-content min-content min-content min-content;
    //     grid-auto-rows: min-content;

  const columns = Number(flowData.data?.nodes?.length) / 6;

  return (
    <>
      <div
      onDragStart={onDragStart}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, min-content)`,
        gridAutoRows: "min-content"
      }}
      onDoubleClick={handleClick}
      >

        {/* key={flowData.id}
        draggable
        onDragStart={onDragStart}
        onClick={handleClick}
        className={`my-2 flex flex-row bg-light-gray ${
          isComponent ? "cursor-default" : "cursor-pointer"
        } group justify-between border border-border p-4`}
        data-testid="list-card" */}
        <DesktopFlowIcon flowData={flowData} />
        {/* <DesktopIcon label={flowData.name} onContextMenu={() => {
          // handleContextMenu
        }} onContextMenuNode={<ContextMenu />} iconSrc="https://win98icons.alexmeub.com/icons/png/directory_closed_cool-2.png" /> */}
        {/* left side */}
        {/* <div
          className={`flex min-w-0 ${
            isComponent ? "cursor-default" : "cursor-pointer"
          } flex flex-col items-start overflow-hidden`}
        > */}
          {/* Icon */}
          {/* <img src={"https://win98icons.alexmeub.com/icons/png/directory_closed_cool-2.png"} width={32} height={32} /> */}

          {/* <div
            className={cn(
              `item-center flex justify-center p-3`,
              swatchColors[swatchIndex],
            )}
          >
            <ForwardedIconComponent
              name={flowData?.icon || getIcon()}
              aria-hidden="true"
              className="flex h-5 w-5 items-center justify-center"
            />
          </div> */}

          {/* <div className="flex flex-col justify-start"> */}
            {/* <div className="line-clamp-1 flex min-w-0 items-baseline truncate max-md:flex-col"> */}
              {/* <div className="text-xs flex pr-2   max-md:w-full"> */}
                {/* <span className="text-xs">{flowData.name}</span> */}
              {/* </div> */}
              {/* <div className="item-baseline flex text-xs   ">
                Edited {timeElapsed(flowData.updated_at)} ago
              </div> */}
            {/* </div> */}
            {/* <div className="overflow-hidden text-sm text-black">
              <span className="block max-w-[110ch] truncate">
                {flowData.description}
              </span>
            </div> */}
          {/* </div> */}
        {/* </div> */}

        {/* right side */}
        {/* <div className="ml-5 flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger  asChild>
              <Button
                variant="ghost"
                size="iconMd"
                data-testid="home-dropdown-menu"
                className="group"
              >
                <ForwardedIconComponent
                  name="Ellipsis"
                  aria-hidden="true"
                  className="h-5 w-5   group-hover:text-foreground"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[185px]"
              sideOffset={5}
              side="bottom"
            >
              <DropdownComponent
                flowData={flowData}
                setOpenDelete={setOpenDelete}
                handlePlaygroundClick={() => {
                  // handlePlaygroundClick();
                }}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
      </div>

      {/* {openDelete && (
        <DeleteConfirmationModal
          open={openDelete}
          setOpen={setOpenDelete}
          onConfirm={handleDelete}
          description={descriptionModal}
        >
          <></>
        </DeleteConfirmationModal>
      )} */}

      {/* {openDelete && (
        <DeleteConfirmationModal
          open={openDelete}
          setOpen={setOpenDelete}
          onConfirm={handleDelete}
          description={descriptionModal}
        >
          <></>
        </DeleteConfirmationModal>
      )} */}
    </>
  );
};

export default ListComponent;
