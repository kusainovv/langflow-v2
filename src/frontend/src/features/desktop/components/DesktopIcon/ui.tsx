import { ReactNode, useEffect, useRef, useState } from "react";

interface DesktopIconProps {
  label: string;
  iconSrc: string;
  onContextMenu?: any;
  onContextMenuNode?: ReactNode;
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

export const DesktopIcon = (props: DesktopIconProps) => {
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuPosition({ x: e.pageX, y: e.pageY });
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuPosition(null);
      }
    };

    if (menuPosition) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuPosition]);

  return (
    <>
      <div
        onDoubleClick={props?.onDoubleClick}
        onContextMenu={handleContextMenu}
        className="w-[78px] h-fit flex flex-col justify-center items-center text-center"
      >
        <img className="mx-auto my-0" src={props.iconSrc} />
        <span className="pt-2 text-center text-[8px] text-white">{props.label}</span>
      </div>

      {menuPosition && (
        <div
          ref={menuRef}
          style={{
            top: menuPosition.y,
            left: menuPosition.x,
            position: "absolute",
            zIndex: 1000,
          }}
        >
          {props.onContextMenuNode}
        </div>
      )}
    </>
  );
};