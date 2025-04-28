import { Button } from "@/components/ui/button";
import { memo } from "react";

import { ForwardedIconComponent } from "@/components/common/genericIconComponent";
import ShadTooltip from "@/components/common/shadTooltipComponent";
import { cn } from "@/utils/utils";
import ShortcutDisplay from "../shortcutDisplay";

export const ToolbarButton = memo(
  ({
    onClick,
    icon,
    label,
    shortcut,
    className,
    dataTestId,
  }: {
    onClick: () => void;
    icon: string;
    label?: string;
    shortcut?: any;
    className?: string;
    dataTestId?: string;
  }) => (
    <ShadTooltip content={<ShortcutDisplay {...shortcut} />} side="top">
      <Button
      className="whitespace-nowrap"
        // className={cn("node-toolbar-buttons", className)}
        onClick={onClick}
        data-testid={dataTestId}
      >
        {/* <ForwardedIconComponent name={icon} className="h-4 w-4" /> */}
        {label && <span>{label}</span>}
      </Button>
    </ShadTooltip>
  ),
);
