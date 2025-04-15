import { useCustomNavigate } from "@/customization/hooks/use-custom-navigate";
import useAddFlow from "@/hooks/flows/use-add-flow";
import { useParams } from "react-router-dom";
import { DesktopIcon } from "../../DesktopIcon/ui";
import { track } from "@/customization/utils/analytics";

export const DesktopNewFlowIcon = () => {
    const addFlow = useAddFlow();
    const navigate = useCustomNavigate();
    const { folderId } = useParams();
    
    return <div   onClick={() => {
        // setOpenModal(true)
        addFlow().then((id) => {
          navigate(
            `/flow/${id}${folderId ? `/folder/${folderId}` : ""}`,
          );
        });
        track("New Flow Created", { template: "Blank Flow" });
    
      }}>
         <DesktopIcon iconSrc="https://win98icons.alexmeub.com/icons/png/notepad-4.png" label="New Workflow"  />
      </div>
}