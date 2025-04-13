interface DesktopIconProps {
    label: string
    iconSrc: string
}

export const DesktopIcon = (props: DesktopIconProps) => {
    return <div className="w-[78px] flex flex-col justify-center items-center text-center">
    <img className="m-auto" src={props.iconSrc} />
    <span className="pt-2 text-center text-[8px] text-white">{props.label}</span>
  </div>
}