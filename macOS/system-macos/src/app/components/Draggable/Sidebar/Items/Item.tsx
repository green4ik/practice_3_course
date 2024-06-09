import { FC } from "react";

interface Item {
  title: string;
  iconSrc: string;
}

const Item: FC<Item> = ({ iconSrc, title }) => {
  return (
    <div className="flex items-center justify-start gap-1 hover:bg-neutral-500/40 cursor-pointer px-1 py-0.5 rounded">
      <img src={iconSrc} className="w-6 h-6 rounded-3" alt={title} />
      <p className="select-none text-3.5 font-normal leading-4">{title}</p>
    </div>
  );
};

export default Item;
