import useDragStart from "@/components/core/cardComponent/hooks/use-on-drag-start";
import { useCustomNavigate } from "@/customization/hooks/use-custom-navigate";
import useFlowsManagerStore from "@/stores/flowsManagerStore";
import { FlowType } from "@/types/flow";
import { useParams } from "react-router-dom";
import { DesktopFlowIcon } from "@/features/desktop/components/entities/Flow/ui";

const ListComponent = ({ flowData }: { flowData: FlowType }) => {
  const navigate = useCustomNavigate();
  const { folderId } = useParams();
  const isComponent = flowData.is_component ?? false;
  const setFlowToCanvas = useFlowsManagerStore(
    (state) => state.setFlowToCanvas,
  );
  
  const editFlowLink = `/flow/${flowData.id}${folderId ? `/folder/${folderId}` : ""}`;

  const handleClick = async () => {
    if (!isComponent) {
      await setFlowToCanvas(flowData);
      navigate(editFlowLink);
    }
  };

  const { onDragStart } = useDragStart(flowData);

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
        <DesktopFlowIcon flowData={flowData} />
      </div>
    </>
  );
};

export default ListComponent;
