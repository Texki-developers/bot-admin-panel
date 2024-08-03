import { ISideNavList } from "../../../types/components/sideNav/sideNav.types";
import { RiChatPrivateFill } from "react-icons/ri";

export const sideNavList: ISideNavList[] = [
  {
    id: crypto.randomUUID(),
    title: "Manage Secret Code",
    path: "/secret-code",
    icon: <RiChatPrivateFill />,
    isProtected: true,
  },
];
