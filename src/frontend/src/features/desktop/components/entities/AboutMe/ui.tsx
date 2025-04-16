import { useState } from "react";
import { FlowType } from "@/types/flow";
import { DesktopIcon } from "../../DesktopIcon/ui";
import { WindowsModal } from "@/modals/IOModal/window-modal";

interface ContextMenuProps {
    flowData: FlowType

}

const defaultValue = `💿~~ RATMIR // LEGEND OF THE 90s ~~💿
🎧 Playlist: Tupac, Nirvana, TLC, Beastie Boys
 🛹 Skater by day, ICQ flirt by night
🎬 Favorite movies: The Matrix, Clueless, Fight Club
📺 Lives on MTV, Toonami, Fresh Prince reruns
📟 ICQ UIN: 123456789 – don’t page me unless it’s 🔥
🖥️ Minesweeper > your GPA
💬 Away Message: “Out. Probably renting a VHS.”
🎮 SNES champ // PS1 royalty
💾 Burning mix CDs with Winamp + love
🍕 Eats Pizza Rolls like it’s a sport
📼 Still cries when Blockbuster closes
🕶 Looks like Keanu, vibes like Zack Morris
📡 Internet’s slow… but this style’s lightning
🧃 Capri Sun energy. Fruit Gushers attitude.
🌪️ Goosebumps on the shelf. Tamagotchi on the belt.
🔥 I don’t do drama — I do AOL chatroom warfare
💬 “You had me at dial-up tone.”
`;

export const DesktopAboutMeIcon = () => {
  const [isShowWindow, setShowWindow] = useState(false);
    return <>
      <DesktopIcon onDoubleClick={() => {
          setShowWindow(true)
      }} iconSrc="https://win98icons.alexmeub.com/images/computer_explorer-2.png" label="About Me" />

      <WindowsModal isOpen={isShowWindow} onClose={() => {
              setShowWindow(false)
            }} title="About Me" maxHeight={700} maxWidth={800} maxContentHeight={600} defaultSize={{
              width: 400,
              height: 400
            }} defaultPosition={{ x: 50, y: 50 }}>
              {/* <div className="bg-red-500 h-full w-full"> */}
              
              {/* </div> */}
            <textarea 
 className="w-full h-full flex bg-white overflow-auto resize-none p-1 border-none font-inherit text-base"
 style={{
   lineHeight: "inherit",
 }}
defaultValue={defaultValue} />
      </WindowsModal>

    </> 
}