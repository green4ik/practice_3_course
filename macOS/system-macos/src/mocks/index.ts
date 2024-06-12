import * as uuid from "uuid";

export const itemGroups = [
  {
    header: "General",
    items: [
      {
        id: uuid.v4(),
        iconSrc: "/image/icons/draggable/appearance.png",
        title: "Appearance",
      },
      {
        id: uuid.v4(),
        iconSrc: "/image/icons/draggable/general.png",
        title: "General",
      },
      {
        id: uuid.v4(),
        iconSrc: "/image/icons/draggable/siri.png",
        title: "Siri & Spotlight",
      },
    ],
  },
  {
    header: "Appearance",
    items: [
      {
        id: uuid.v4(),
        iconSrc: "/image/icons/draggable/wallpaper.png",
        title: "Wallpaper",
      },
    ],
  },
];
