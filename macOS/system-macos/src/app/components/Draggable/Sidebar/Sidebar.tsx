import { FC, ReactNode } from "react";

interface SidebarProps {
  children?: ReactNode | ReactNode[];
  enableSearch?: boolean;
  enableSeparator?: boolean;
  close?: () => void;
}

const Sidebar: FC<SidebarProps> = ({
  children,
  enableSearch,
  enableSeparator,
  close,
}) => {
  return (
    <div className="bg-black/40 backdrop-blur-3xl rounded-l-2.5 flex flex-col w-[200px] flex-shrink-0">
      <div className="h-13 w-full px-5 py-[9px] flex items-center">
        <div className="flex gap-2">
          <span
            className="w-3 h-3 rounded-full bg-sunsetOrange border border-red-500 cursor-pointer"
            onClick={close}
          ></span>
          <span className="w-3 h-3 rounded-full bg-ripeMango border border-amber-500 cursor-pointer"></span>
          <span className="w-3 h-3 rounded-full bg-limeGreen border border-green-500 cursor-pointer"></span>
        </div>
      </div>
      {enableSeparator && (
        <span className="border-b border-solid border-neutral-500/50" />
      )}
      <div className="flex flex-col gap-4 p-2.5">{children}</div>
    </div>
  );
};

export default Sidebar;
