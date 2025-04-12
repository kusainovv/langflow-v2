import LoadingComponent from "@/components/common/loadingComponent";
import { cn } from "@/utils/utils";

export function LoadingPage({
  overlay = false,
  progress,
}: {
  overlay?: boolean;
  progress?: number;
}) {
  return (
    <div
      className={cn(
        "flex h-screen w-screen items-center justify-center bg-silver",
        overlay && "fixed left-0 top-0 z-[999]"
      )}
    >
      <LoadingComponent remSize={50} progress={progress} />
    </div>
  );
}