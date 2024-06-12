import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Dispatch, FC, SetStateAction } from "react";

interface ScreenContextMenuProps {
  setDraggableOpen: Dispatch<SetStateAction<boolean>>;
}

const ScreenContextMenu: FC<ScreenContextMenuProps> = ({
  setDraggableOpen,
}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="absolute inset-0 z-0"></ContextMenuTrigger>
      <ContextMenuContent className="w-44 border-neutral-400/50 bg-black/30 text-neutral-200 overflow-visible backdrop-blur-3xl">
        <ContextMenuItem className="!text-3 hover:!bg-blue-500 hover:!text-neutral-200 py-0.5">
          New Folder
        </ContextMenuItem>
        <ContextMenuSeparator className="mx-2 bg-neutral-500/50" />
        <ContextMenuItem className="!text-3 hover:!bg-blue-500 hover:!text-neutral-200 py-0.5">
          Get Info
        </ContextMenuItem>
        <ContextMenuItem
          className="!text-3 hover:!bg-blue-500 hover:!text-neutral-200 py-0.5"
          onClick={() => setDraggableOpen((prev) => !prev)}
        >
          Change Wallpaper...
        </ContextMenuItem>
        <ContextMenuItem className="!text-3 hover:!bg-blue-500 hover:!text-neutral-200 py-0.5">
          Edit Widgets...
        </ContextMenuItem>
        <ContextMenuSeparator className="mx-2 bg-neutral-500/50" />
        <ContextMenuItem className="!text-3 hover:!bg-blue-500 hover:!text-neutral-200 py-0.5">
          Use Stacks
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger className="!text-3 hover:!bg-blue-500 hover:!text-neutral-200 py-0.5">
            Sort by...
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-44 border-neutral-400/50 bg-black/30 ml-2 text-neutral-200 overflow-visible">
            <ContextMenuItem className="!text-3 hover:!bg-blue-500 hover:!text-neutral-200 py-0.5">
              Save Page As...
            </ContextMenuItem>
            <ContextMenuItem className="!text-3 hover:!bg-blue-500 hover:!text-neutral-200 py-0.5">
              Create Shortcut...
            </ContextMenuItem>
            <ContextMenuItem className="!text-3 hover:!bg-blue-500 hover:!text-neutral-200 py-0.5">
              Name Window...
            </ContextMenuItem>
            <ContextMenuSeparator className="mx-2 bg-neutral-500/50" />
            <ContextMenuItem className="!text-3 hover:!bg-blue-500 hover:!text-neutral-200 py-0.5">
              Developer Tools
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem className="!text-3 hover:!bg-blue-500 hover:!text-neutral-200 py-0.5">
          Clean Up
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger className="!text-3">
            Clean Up By...
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-44 border-neutral-400/50 bg-black/30 ml-2 text-neutral-200 overflow-visible">
            <ContextMenuItem className="!text-3 hover:!bg-blue-500 hover:!text-neutral-200 py-0.5 ">
              Save Page As...
            </ContextMenuItem>
            <ContextMenuItem className="!text-3 hover:!bg-blue-500 hover:!text-neutral-200 py-0.5">
              Create Shortcut...
            </ContextMenuItem>
            <ContextMenuItem className="!text-3 hover:!bg-blue-500 hover:!text-neutral-200 py-0.5">
              Name Window...
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem className="!text-3 hover:!bg-blue-500 hover:!text-neutral-200 py-0.5">
              Developer Tools
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem className="!text-3 hover:!bg-blue-500 hover:!text-neutral-200 py-0.5">
          Show View Options
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ScreenContextMenu;
