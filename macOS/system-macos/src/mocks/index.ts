import * as uuid from "uuid";

export const itemGroups = [
  {
    header: "Appearance",
    items: [
      {
        id: uuid.v4(),
        iconSrc: "/image/icons/dock/books.png",
        title: "Wallpaper",
      },
    ],
  },
  {
    header: "General",
    items: [
      {
        id: uuid.v4(),
        iconSrc: "/image/icons/dock/mail.png",
        title: "Mail",
      },
      {
        id: uuid.v4(),
        iconSrc: "/image/icons/dock/photos.png",
        title: "Photos",
      },
      {
        id: uuid.v4(),
        iconSrc: "/image/icons/dock/notes.png",
        title: "Notes",
      },
    ],
  },
];
