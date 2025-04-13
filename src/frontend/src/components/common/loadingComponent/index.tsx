import React from "react";
import { ProgressBar } from "react95";
import { LoadingComponentProps } from "../../../types/components";

type ExtendedProps = LoadingComponentProps & {
  progress?: number;
  label: string
};

export default function LoadingComponent({
  remSize,
  progress = 0,
  label = "Loading...",
}: ExtendedProps): JSX.Element {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-4 w-[300px] max-w-[80vw]">
       <span className="text-sm text-black animate-pulse">{label}</span>
      <ProgressBar variant="tile" value={progress} />
    </div>
  );
}