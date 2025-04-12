import LoadingComponent from "@/components/common/loadingComponent";
import { cn } from "@/utils/utils";
import React, { useEffect, useState } from 'react';
import { Window, WindowHeader, WindowContent, Button } from 'react95';


const openEyes = `
⠤⠤⠤⠤⠤⠤⢤⣄⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠙⠒⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠤⠤⠶⠶⠶⠦⠤⠤⠤⠤⠤⢤⣤⣀⣀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⠄⢂⣠⣭⣭⣕⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠤⠀⠀⠀⠤⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠉⠉⠉
⠀⠀⢀⠜⣳⣾⡿⠛⣿⣿⣿⣦⡠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣤⣤⣤⣤⣤⣤⣤⣤⣤⣍⣀⣦⠦⠄⣀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠠⣄⣽⣿⠋⠀⡰⢿⣿⣿⣿⣿⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⡿⠛⠛⡿⠿⣿⣿⣿⣿⣿⣿⣷⣶⣿⣁⣂⣤⡄⠀⠀⠀⠀⠀⠀
⢳⣶⣼⣿⠃⠀⢀⠧⠤⢜⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⠟⠁⠀⠀⠀⡇⠀⣀⡈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡀⠁⠐⠀⣀⠀⠀
⠀⠙⠻⣿⠀⠀⠀⠀⠀⠀⢹⣿⣿⡝⢿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⡿⠋⠀⠀⠀⠀⠠⠃⠁⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣿⡿⠋⠀⠀
⠀⠀⠀⠙⡄⠀⠀⠀⠀⠀⢸⣿⣿⡃⢼⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⡏⠉⠉⠻⣿⡿⠋⠀⠀⠀⠀
⠀⠀⠀⠀⢰⠀⠀⠰⡒⠊⠻⠿⠋⠐⡼⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⠀⠀⠀⠀⣿⠇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠸⣇⡀⠀⠑⢄⠀⠀⠀⡠⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢖⠠⠤⠤⠔⠙⠻⠿⠋⠱⡑⢄⠀⢠⠟⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⠉⠒⠒⠻⠶⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡄⠀⠀⠀⠀⠀⠀⠀⠀⠡⢀⡵⠃⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠦⣀⠀⠀⠀⠀⠀⢀⣤⡟⠉⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠙⠛⠓⠒⠲⠿⢍⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`;

const closedEyes = openEyes.replace(/(⣿⣿|⣶⣿⣿|⣿⣿⣿⣿)/g, '⠀⠀');

const AsciiGirlAnimation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpen(false);
      setTimeout(() => setIsOpen(true), 500);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <>
    <div className="text-green-400 h-fit" style={{ fontFamily: 'monospace', fontSize: '14px',  background: 'transparent', display: 'flex', whiteSpace: 'pre', justifyContent: 'center', alignItems: 'center', margin: 0 }}>
      {isOpen ? openEyes : closedEyes}
    </div>
  </>
};

const terminalLines: string[] = [
  "C:\\WINDOWS\\system32> Hello, Vylo",
  "",
  "Processing",
  "Processing.",
  "Processing..",
  "Processing...",
  'Vylo> Hello, User <3',
];

export default function React98Terminal({
    onReadyToUnmount,
    animateWindow = false, // <-- ✅ declare it here
  }: {
    onReadyToUnmount?: () => void;
    animateWindow?: boolean; // <-- ✅ type it
  }) {
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [typing, setTyping] = useState('');
    const [showAsciiGirl, setShowAsciiGirl] = useState(false);
  
    useEffect(() => {
      if (currentLineIndex >= terminalLines.length) {
        setTimeout(() => {
          setShowAsciiGirl(true);
  
          // Wait 5 seconds AFTER showing the animation before unmounting
          setTimeout(() => {
            onReadyToUnmount?.(); // ← callback fires here
          }, 4000);
        }, 400);
        return;
      }
  
      const currentLine = terminalLines[currentLineIndex];
      let charIndex = 0;
  
      const typingInterval = setInterval(() => {
        if (charIndex <= currentLine.length) {
          setTyping(currentLine.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setDisplayedLines((prev) => [...prev, currentLine]);
            setTyping('');
            setCurrentLineIndex((prev) => prev + 1);
          }, 500);
        }
      }, 40);
  
      return () => clearInterval(typingInterval);
    }, [currentLineIndex]);
  
    return (
      <div className="w-screen h-screen bg-[#008080] flex items-center justify-center">
        <Window   className={cn(
    "w-full h-full flex flex-col border border-black shadow-lg",
    "bg-black", // default
  )}>
          <WindowHeader className="flex justify-between items-center px-2 py-1 bg-blue-700 text-white font-bold text-sm">
            <span>Command Prompt</span>
            <div className="flex gap-1">
              <Button className="px-1">_</Button>
              <Button className="px-1">□</Button>
              <Button className="px-1">X</Button>
            </div>
          </WindowHeader>
  
          <WindowContent className="flex-1 bg-black h-full text-green-400 font-mono text-sm p-3 overflow-auto">
            {showAsciiGirl ? (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <AsciiGirlAnimation />
              </div>
            ) : (
              <>
                {displayedLines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
                {typing && <p>{typing}</p>}
              </>
            )}
          </WindowContent>
        </Window>
      </div>
    );
  }

  export function LoadingPage({
    overlay = false,
    onDone,
    isFilling = false,
  }: {
    overlay?: boolean;
    onDone?: () => void;
    isFilling?: boolean;
  }) {
    return (
      <div
        className={cn(
          "flex h-screen w-screen items-center justify-center bg-black",
          overlay && "fixed left-0 top-0 z-[999]",
        )}
      >
        <React98Terminal onReadyToUnmount={onDone} animateWindow={true} />
      </div>
    );
  }









export const PreloadScreen = () => {
    const [show, setShow] = useState(false);       // Controls initial mount
    const [isFilling, setIsFilling] = useState(false); // Triggers the gray screen
    const [isDone, setIsDone] = useState(false);   // Controls unmount
  
    useEffect(() => {
      setShow(true);
    }, []);
  
    const handleTerminalDone = () => {
      // At 3 seconds, show the gray fill
      setTimeout(() => {
        setIsFilling(true);
      }, 2400); // gray fill shows at 3s
  
      // At 4 seconds, unmount everything
      setTimeout(() => {
        setIsDone(true);
      }, 3000);
    };

    if (isDone) {
        return <></>;
    }
  
    if (isFilling) {
       return           <div className="absolute w-full h-full bg-red-500 inset-0 bg-[#c0c0c0] animate-bg-to-gray z-50 transition-opacity duration-500 opacity-100" />

    }

    return (
      <div className="relative">
        {/* Terminal shown if we’re not yet filling */}
        <LoadingPage overlay isFilling={isFilling} onDone={handleTerminalDone} />
  

        {/* Gray fill div that appears after 3 seconds */}
        {/* {isFilling && (
          <div className="absolute w-full h-full bg-red-500 inset-0 bg-[#c0c0c0] z-50 transition-opacity duration-500 opacity-100" />
        )} */}
      </div>
    );
  };