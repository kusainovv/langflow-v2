import { useCustomNavigate } from "@/customization/hooks/use-custom-navigate";
import useAddFlow from "@/hooks/flows/use-add-flow";
import { useParams } from "react-router-dom";
import { DesktopIcon } from "../../DesktopIcon/ui";
import { track } from "@/customization/utils/analytics";
import notepad from "../../../../../../public/assets/icons/apps/notepad.png"

export const DesktopNewFlowIcon = () => {
    const addFlow = useAddFlow();
    const navigate = useCustomNavigate();
    const { folderId } = useParams();
    
    return <div onDoubleClick={() => {
        // setOpenModal(true)
        addFlow().then((id) => {
          navigate(
            `/flow/${id}${folderId ? `/folder/${folderId}` : ""}`,
          );
        });
        track("New Flow Created", { template: "Blank Flow" });
    
      }}>
         <DesktopIcon iconSrc={notepad} label="New Workflow"  />
      </div>
}