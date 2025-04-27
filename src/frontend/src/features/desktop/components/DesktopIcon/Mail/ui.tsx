"use client";

import React, { useEffect, useState } from "react";
import { Mail, Calendar, ContactIcon as Contacts, WorkflowIcon as Tasks, StickyNoteIcon as Notes } from "lucide-react";
import { DesktopIcon } from "../ui";
import { WindowsModal } from "@/modals/IOModal/window-modal";
import mailIcon from "../../../../../../public/assets/icons/apps/mail.png";

interface ThreadMeta {
  id: string;
  messages: Array<{
    id: string;
    snippet: string;
    payload: {
      headers: Array<{ name: string; value: string }>;
    };
  }>;
}

export function Outlook98() {
  const [selectedEmail, setSelectedEmail] = useState(0);
  const [selectedFolder, setSelectedFolder] = useState("Inbox");
  const [threads, setThreads] = useState<ThreadMeta[]>([]);
  const [isAuthenticated, setAuthenticated] = useState(false);

  const fetchThreads = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/messages", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 401) {
        setAuthenticated(false);
        setThreads([]);
      } else if (res.ok) {
        const data: ThreadMeta[] = await res.json();
        setAuthenticated(true);
        setThreads(data);
      } else {
        console.error("Unexpected server status:", res.status);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  return (
    <div className="h-full overflow-y-hidden">
      <div className="flex flex-1 overflow-hidden h-[calc(400px-40px)]">
        {/* Sidebar */}
        <div className="w-[200px] border-r border-gray-500 bg-[#c0c0c0]">
          <div className="p-1 font-bold text-xs">Outlook Shortcuts</div>
          <div className="pl-2">
            {["Inbox", "Outbox", "Sent Items", "Deleted Items"].map((label) => (
              <FolderItem
                key={label}
                icon={<Mail className="h-4 w-4" />}
                label={label}
                selected={selectedFolder === label}
                onClick={() => setSelectedFolder(label)}
                count={label === "Inbox" ? threads.length : undefined}
              />
            ))}
          </div>

          <div className="p-1 font-bold text-xs mt-2">Other Shortcuts</div>
          <div className="pl-2">
            <FolderItem icon={<Calendar className="h-4 w-4" />} label="Calendar" selected={selectedFolder === "Calendar"} onClick={() => setSelectedFolder("Calendar")} />
            <FolderItem icon={<Contacts className="h-4 w-4" />} label="Contacts" selected={selectedFolder === "Contacts"} onClick={() => setSelectedFolder("Contacts")} />
            <FolderItem icon={<Tasks className="h-4 w-4" />} label="Tasks" selected={selectedFolder === "Tasks"} onClick={() => setSelectedFolder("Tasks")} />
            <FolderItem icon={<Notes className="h-4 w-4" />} label="Notes" selected={selectedFolder === "Notes"} onClick={() => setSelectedFolder("Notes")} />
          
            {/* <div className="pt-2">
            {!isAuthenticated ? (
              <button onClick={signIn} className="px-1 py-1 border border-black bg-[#c0c0c0] hover:bg-[#d0d0d0]">
                Sign In & Load Mail
              </button>
            ) : (
              <button onClick={fetchThreads} className="px-1 py-1 border border-black bg-[#c0c0c0] hover:bg-[#d0d0d0]">
                {loading ? "Loading..." : "Refresh Mail"}
              </button>
            )}
          </div> */}
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col w-[600px] h-[calc(400px - 20px)] bg-[#c0c0c0]">
          {/* Top Bar */}

          {/* Email list */}
          <div className="h-[200px] border-b border-gray-500 overflow-auto">
            <div className="flex text-xs font-bold bg-[#c0c0c0] border-b border-gray-500">
              <div className="w-[160px] p-1 border-r border-gray-500">From</div>
              <div className="flex-1 w-[160px] p-1 border-r border-gray-500">Subject</div>
              <div className="w-[160px] p-1">Received</div>
            </div>

            {threads.map((thread, index) => {
              const headers = thread.messages[0]?.payload?.headers || [];
              const subject = headers.find((h) => h.name === "Subject")?.value;
              const from = headers.find((h) => h.name === "From")?.value;
              const date = headers.find((h) => h.name === "Date")?.value;

              return (
                <div
                  key={thread.id}
                  className={`flex text-xs hover:bg-[#000080] hover:text-white cursor-pointer ${
                    selectedEmail === index ? "bg-[#000080] text-white" : "bg-white"
                  }`}
                  onClick={() => setSelectedEmail(index)}
                >
                  {/* <div className="p-1 border-r border-gray-200 flex items-center justify-center"> */}
                    {/* No unread dot handling yet */}
                  {/* </div> */}
                  <div className="w-[160px] p-1 border-r border-gray-200 truncate">{from}</div>
                  <div className="w-[160px] flex-1 p-1 border-r border-gray-200 truncate">{subject}</div>
                  <div className="w-[160px] p-1 truncate">{new Date(date || "").toLocaleDateString()}</div>
                </div>
              );
            })}
          </div>

          {/* Email preview */}
          <div className="h-[calc(200px-40px)] mt-1 bg-white p-2 overflow-auto">
            <div className="text-sm">
              {threads[selectedEmail] ? (
                <>
                  <div><strong>From:</strong> {threads[selectedEmail]?.messages[0]?.payload?.headers.find(h => h.name === "From")?.value}</div>
                  <div><strong>Subject:</strong> {threads[selectedEmail]?.messages[0]?.payload?.headers.find(h => h.name === "Subject")?.value}</div>
                  <div><strong>Date:</strong> {threads[selectedEmail]?.messages[0]?.payload?.headers.find(h => h.name === "Date")?.value}</div>
                  <div className="mt-4">
                    {threads[selectedEmail]?.messages[0]?.snippet || "No preview available."}
                  </div>
                </>
              ) : (
                <div>No email selected.</div>
              )}
            </div>
          </div>
        </div>
        
      </div>
      
      

      {/* Status bar */}
      
      <div className="flex items-center px-2 py-0.5 text-xs bg-[#c0c0c0] border-t border-gray-500">
        <div>{threads.length} items</div>
        <div className="ml-auto">{isAuthenticated ? "Connected" : "Disconnected"}</div>
      </div>
    </div>
  );
}

function FolderItem({
  icon,
  label,
  selected,
  onClick,
  count,
}: {
  icon: React.ReactNode;
  label: string;
  selected: boolean;
  onClick: () => void;
  count?: number;
}) {
  return (
    <div
      className={`flex items-center gap-1 px-1 py-0.5 text-xs cursor-pointer ${
        selected ? "bg-[#000080] text-white" : "hover:bg-[#d0d0d0]"
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
      {count && <span className="ml-auto bg-[#c0c0c0] text-black px-1 rounded-sm text-[10px]">{count}</span>}
    </div>
  );
}

export const DesktopMailIcon = () => {
  const [isShowWindow, setShowWindow] = useState(false);

  return (
    <>
      <div onDoubleClick={() => setShowWindow(true)}>
        <DesktopIcon iconSrc={mailIcon} label="Mail" />
      </div>

      <WindowsModal
        isOpen={isShowWindow}
        onClose={() => setShowWindow(false)}
        title="ShadowForge Mail"
        maxHeight={700}
        maxWidth={800}
        maxContentHeight={400}
        defaultSize={{ width: 800, height: 400 }}
        defaultPosition={{ x: 50, y: 50 }}
      >
        <Outlook98 />
      </WindowsModal>
    </>
  );
};