import useDragStart from "@/components/core/cardComponent/hooks/use-on-drag-start";
import { FlowType } from "@/types/flow";
import { DesktopOpenFlowIcon } from "@/features/desktop/components/DesktopIcon/OpenFlow/ui";

const ListComponent = ({ flowData }: { flowData: FlowType }) => {

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
      >
        <DesktopOpenFlowIcon flowData={flowData} />
      </div>
    </>
  );
};

export default ListComponent;
