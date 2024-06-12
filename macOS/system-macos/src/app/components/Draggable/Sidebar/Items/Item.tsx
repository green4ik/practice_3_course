import { FC } from "react";

interface Item {
  id: string;
  title: string;
  iconSrc: string;
  selectedItem: Item | undefined;
  setSelectedItem: React.Dispatch<React.SetStateAction<Item | undefined>>;
}

const Item: FC<Item> = ({ selectedItem, setSelectedItem, ...item }) => {
  return (
    <div
      onClick={() => setSelectedItem(item as Item)}
      className={`[&.opened]:bg-neutral-500/40 ${
        item.id === selectedItem?.id ? "opened" : ""
      } flex items-center justify-start gap-1 hover:bg-neutral-500/40 cursor-pointer px-1 py-0.5 rounded`}
    >
      <img
        src={item.iconSrc}
        className="w-6 h-6 pointer-events-none"
        alt={item.title}
      />
      <p className="select-none text-3.5 font-normal leading-4 pointer-events-none">
        {item.title}
      </p>
    </div>
  );
};

export default Item;
