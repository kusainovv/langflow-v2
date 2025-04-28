import useAlertStore from "@/stores/alertStore";
import { FlowType } from "@/types/flow";
import { DesktopIcon } from "../ui";
import { useCustomNavigate } from "@/customization/hooks/use-custom-navigate";
import { useParams } from "react-router-dom";
import folderIcon from "../../../../../../public/assets/icons/apps/folder.png"
import { createFileUpload } from "@/helpers/create-file-upload";
import { getObjectsFromFilelist } from "@/helpers/get-objects-from-filelist";
import useUploadFlow from "@/hooks/flows/use-upload-flow";
import {
    usePostUploadFolders,
} from "@/controllers/API/queries/folders";

export const DesktopUploadFlowIcon = () => {

  const handleClick = async () => {
    handleUploadFlowsToFolder()
  };

  const setSuccessData = useAlertStore((state) => state.setSuccessData);

  const setErrorData = useAlertStore((state) => state.setErrorData);

  const uploadFlow = useUploadFlow();
  const { mutate } = usePostUploadFolders();


  const handleUploadFlowsToFolder = () => {
    createFileUpload().then((files: File[]) => {
      if (files?.length === 0) {
        return;
      }

      getObjectsFromFilelist<any>(files).then((objects) => {
        if (objects.every((flow) => flow.data?.nodes)) {
          uploadFlow({ files }).then(() => {
            setSuccessData({
              title: "Uploaded successfully",
            });
          });
        } else {
          files.forEach((folder) => {
            const formData = new FormData();
            formData.append("file", folder);
            mutate(
              { formData },
              {
                onSuccess: () => {
                  setSuccessData({
                    title: "Folder uploaded successfully.",
                  });
                },
                onError: (err) => {
                  console.log(err);
                  setErrorData({
                    title: `Error on uploading your folder, try dragging it into an existing folder.`,
                    list: [err["response"]["data"]["message"]],
                  });
                },
              },
            );
          });
        }
      });
    });
  };

    return <>
    
    <DesktopIcon label={"Upload a Flow"} onContextMenu={null}   // handleContextMenu
      onDoubleClick={handleClick}
      iconSrc={"https://win98icons.alexmeub.com/icons/png/write_wordpad-1.png"} />

    </>
}