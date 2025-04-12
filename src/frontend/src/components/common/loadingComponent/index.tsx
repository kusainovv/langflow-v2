import React from "react";
import { ProgressBar } from "react95";
import { LoadingComponentProps } from "../../../types/components";

type ExtendedProps = LoadingComponentProps & {
  progress?: number;
};

export default function LoadingComponent({
  remSize,
  progress = 0,
}: ExtendedProps): JSX.Element {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-4 w-[300px] max-w-[80vw]">
      <span className="animate-pulse text-lg text-black">Loading...</span>
      <ProgressBar value={progress} />
    </div>
  );
}