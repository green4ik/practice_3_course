import { FC } from "react";
import Item from "./Item";

interface ItemGroup {
  header?: string;
  items: Item[];
}

const ItemGroup: FC<ItemGroup> = ({ header, items }) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-neutral-300 px-1 text-3.5 font-medium leading-3.5">
        {header}
      </h3>
      {items.length > 0 &&
        items.map((item) => (
          <Item key={item.iconSrc} iconSrc={item.iconSrc} title={item.title} />
        ))}
    </div>
  );
};

export default ItemGroup;
