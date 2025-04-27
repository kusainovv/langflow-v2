import { WindowsModal } from "@/modals/IOModal/window-modal";
import { useState } from "react";
import { DesktopIcon } from "../../DesktopIcon/ui";
import aboutPc from "../../../../../../public/assets/icons/apps/about_pc.png"

const defaultValue = `YOOOOO I AIN'T JACKASS BUT FOR MY COLLEGE'S GIRL I'M THE COOLEST GUY ALIVE🔥🔥🔥🔥🔥 I'm 💿~~ RATMIR // LEGEND OF THE 90s ~~💿  🎧 Playlist: Tupac, Nirvana, TLC, Beastie Boys YOOO 🛹 Skater by day, ICQ flirt by night YOOO 🎬 Favorite movies: The Matrix, Clueless, Fight Club YOOO 📺 Lives on MTV, Toonami, Fresh Prince reruns YOOO 📟 ICQ UIN: 123456789 – don’t page me unless it’s 🔥YOO 🖥️ Minesweeper > your GPA 💬 Away Message: “Out. Probably renting a VHS.” YOOOO 🎮 SNES champ // PS1 royalty 💾 Burning mix CDs with Winamp + love YOOO 🍕 Eats Pizza Rolls like it’s a sport 📼 Still cries when Blockbuster closes YOOOU 🕶 Looks like Keanu, vibes like Zack Morris 📡 Internet’s slow… but this style’s lightning SAY IT AGAIN 🧃 Capri Sun energy. Fruit Gushers attitude. 🌪️ Goosebumps on the shelf. Tamagotchi on the belt. 🔥 I don’t do drama — I do AOL chatroom warfare 💬 “You had me at dial-up tone.”`;

export const DesktopAboutMeIcon = () => {
  const [isShowWindow, setShowWindow] = useState(false);
  return (
    <>
      <DesktopIcon
        onDoubleClick={() => {
          setShowWindow(true);
        }}
        iconSrc={aboutPc}
        label="About Me"
      />

      <WindowsModal
        isOpen={isShowWindow}
        onClose={() => {
          setShowWindow(false);
        }}
        title="About Me"
        maxHeight={700}
        maxWidth={800}
        maxContentHeight={600}
        defaultSize={{
          width: 400,
          height: 400,
        }}
        defaultPosition={{ x: 50, y: 50 }}
      >
        {/* <div className="bg-red-500 h-full w-full"> */}

        {/* </div> */}
        <textarea
          className="font-inherit flex h-full w-full resize-none overflow-auto border-none bg-white p-1 text-base"
          style={{
            lineHeight: "inherit",
          }}
          defaultValue={defaultValue}
        />
      </WindowsModal>
    </>
  );
};
