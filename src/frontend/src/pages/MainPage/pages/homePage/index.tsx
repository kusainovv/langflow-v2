import { useGetFolderQuery } from "@/controllers/API/queries/folders/use-get-folder";
import { useFolderStore } from "@/stores/foldersStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListComponent from "../../components/list";
const HomePage = ({ type }) => {
  const savedView = localStorage.getItem("view");
  const view = savedView === "grid" || savedView === "list" ? savedView : "list";
  const { folderId } = useParams();
  const [search] = useState("");

  const myCollectionId = useFolderStore((state) => state.myCollectionId);

  const { data: folderData } = useGetFolderQuery({
    id: folderId ?? myCollectionId!,
    is_component: type === "components",
    is_flow: type === "flows",
    search,
  });

  const data = {
    flows: folderData?.flows?.items ?? [],
    name: folderData?.folder?.name ?? "",
    description: folderData?.folder?.description ?? "",
    parent_id: folderData?.folder?.parent_id ?? "",
    components: folderData?.folder?.components ?? [],
  };

  useEffect(() => {
    localStorage.setItem("view", view);
  }, [view]);

  return data.flows?.map((flow) => (
    <ListComponent key={flow.id} flowData={flow} />
  ));
};

export default HomePage;
