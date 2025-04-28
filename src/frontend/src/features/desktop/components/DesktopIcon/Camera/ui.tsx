import { WindowsModal } from "@/modals/IOModal/window-modal";
import { useEffect, useRef, useState } from "react";
import { DesktopIcon } from "../../DesktopIcon/ui";
import photocall from "@/../public/assets/icons/ui/photocall.png"

const frameImage = new Image();
frameImage.src = photocall;

export const DesktopPhotoBooth = () => {
  const [isShowWindow, setShowWindow] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [currentFilters, setCurrentFilters] = useState<
    Array<"mirror" | "text" | "scanlines" | "vignette" | "static">
  >([]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = localStream;
      videoRef.current.play();
      setStreaming(true);
      setStream(localStream);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop()); 
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setStreaming(false);
    setStream(null);
  };

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !videoRef.current) return;

    const drawFrame = () => {
      if (!ctx || !videoRef.current) return;

      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

      const mirror = currentFilters.includes("mirror");
      const text = currentFilters.includes("text");
      const scanlines = currentFilters.includes("scanlines");
      const vignette = currentFilters.includes("vignette");
      const staticNoise = currentFilters.includes("static");

      if (mirror) {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(
          videoRef.current,
          -canvasRef.current!.width,
          0,
          canvasRef.current!.width,
          canvasRef.current!.height,
        );
        ctx.restore();
      } else {
        ctx.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current!.width,
          canvasRef.current!.height,
        );
      }

      if (staticNoise) {
        for (let i = 0; i < 3000; i++) {
          const x = Math.random() * canvasRef.current!.width;
          const y = Math.random() * canvasRef.current!.height;
          const brightness = Math.random() * 255;
          ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${Math.random()})`;
          ctx.fillRect(x, y, 1.5, 1.5);
        }
      }

      if (scanlines) {
        ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";
        for (let y = 0; y < canvasRef.current!.height; y += 3) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvasRef.current!.width, y);
          ctx.stroke();
        }
      }

      if (vignette) {
        const gradient = ctx.createRadialGradient(
          canvasRef.current!.width / 2,
          canvasRef.current!.height / 2,
          50,
          canvasRef.current!.width / 2,
          canvasRef.current!.height / 2,
          Math.max(canvasRef.current!.width, canvasRef.current!.height) / 1.1,
        );
        gradient.addColorStop(0, "rgba(0,0,0,0.3)");
        gradient.addColorStop(0.7, "rgba(0,0,0,0.9)");
        gradient.addColorStop(1, "rgba(0,0,0,0.1)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      }

      if (text) {
        ctx.font = "21px Comic Sans MS";
        ctx.fillStyle = "lime";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeText("🔥 #I_USE_VYLO! 🔥", 40, 100);
        ctx.fillText("🔥 #I_USE_VYLO! 🔥", 40, 100);
      }

      ctx.drawImage(frameImage, 0, 0, canvasRef.current!.width, canvasRef.current!.height);

      requestAnimationFrame(drawFrame);
    };

    requestAnimationFrame(drawFrame);
  }, [streaming, currentFilters]);

  const toggleFilter = (filter: "mirror" | "text" | "scanlines" | "vignette" | "static") => {
    setCurrentFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="flex flex-col items-start ">
      <DesktopIcon
        onDoubleClick={() => setShowWindow(true)}
        iconSrc={"https://win98icons.alexmeub.com/icons/png/camera3_vid-3.png"}
        label="Photo Camera"
      />

      <WindowsModal
        isOpen={isShowWindow}
        onClose={() => {
          setShowWindow(false);
          stopCamera(); 
        }}
        title="Photo Camera"
        maxHeight={400}
        maxWidth={800}
        maxContentHeight={400}
        defaultSize={{
          width: 400,
          height: 350,
        }}
        defaultPosition={{ x: 50, y: 50 }}
      >
        <video ref={videoRef} className="h-[0px] w-[0px] bg-black" />
        
        <canvas ref={canvasRef} width={400} height={300} className="border bg-black" />

        <div className="flex flex-wrap gap-1 p-1">
          {!streaming ? (
            <button onClick={startCamera} className="rounded  bg-blue-500 px-2 text-white">
              Start Camera
            </button>
          ) : (
            <>
              <button onClick={() => toggleFilter("mirror")} className={`rounded px-2 ${currentFilters.includes("mirror") ? "bg-green-600" : "bg-green-400"} text-white`}>
                Mirror
              </button>
              <button onClick={() => toggleFilter("text")} className={`rounded px-2 ${currentFilters.includes("text") ? "bg-red-600" : "bg-red-400"} text-white`}>
                Text
              </button>
              <button onClick={() => toggleFilter("scanlines")} className={`rounded px-2 ${currentFilters.includes("scanlines") ? "bg-purple-600" : "bg-purple-400"} text-white`}>
                Scanlines
              </button>
              <button onClick={() => toggleFilter("vignette")} className={`rounded ${currentFilters.includes("vignette") ? "bg-yellow-600" : "bg-yellow-400"} text-white`}>
                Vignette
              </button>
              <button onClick={() => toggleFilter("static")} className={`rounded px-2 ${currentFilters.includes("static") ? "bg-gray-600" : "bg-gray-400"} text-white`}>
                Static
              </button>
            </>
          )}
        </div>
      </WindowsModal>
    </div>
  );
};