import React, { FC, ReactNode } from "react";
import Sidebar from "./Sidebar/Sidebar";
import useDraggable from "@/app/hooks/useDraggable";

interface DraggableProps {
  children?: ReactNode | ReactNode[];
  sidebarContent: ReactNode | ReactNode[] | undefined;
  headerContent: ReactNode | ReactNode[] | undefined;
  enableSidebarSeparator?: boolean;
  enableHeaderSeparator?: boolean;
  opened: boolean;
  close?: () => void;
}

const Draggable: FC<DraggableProps> = ({
  children,
  headerContent,
  sidebarContent,
  enableHeaderSeparator,
  enableSidebarSeparator,
  opened,
  close,
}) => {
  if (!opened) {
    return;
  }

  useDraggable("modal-draggable");

  const headerSeparatorClasses = "border-b border-solid border-neutral-500/50";

  return (
    <div
      id="modal-draggable"
      className="flex absolute top-0 left-0 rounded-2.5 border border-solid border-neutral-500/50 border-collapse shadow-xl shadow-neutral-900/50 z-50 w-[60%]"
    >
      <Sidebar close={close} enableSeparator={enableSidebarSeparator}>
        {sidebarContent}
      </Sidebar>

      <span className="border-r border-neutral-900 m-0 p-0" />
      <div className="min-w-96 flex-grow bg-neutral-800 rounded-r-2.5">
        <div
          className={`bg-neutral-800 rounded-tr-2.5 ${
            enableHeaderSeparator && headerSeparatorClasses
          }`}
        >
          {headerContent}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Draggable;
