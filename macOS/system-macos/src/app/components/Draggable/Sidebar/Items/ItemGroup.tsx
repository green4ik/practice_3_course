import { FC, ReactNode } from "react";

interface ItemGroup {
  header?: string;
  children: ReactNode | ReactNode[];
}

const ItemGroup: FC<ItemGroup> = ({ header, children }) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-neutral-300 px-1 text-3.5 font-medium leading-3.5">
        {header}
      </h3>
      {children}
    </div>
  );
};

export default ItemGroup;
