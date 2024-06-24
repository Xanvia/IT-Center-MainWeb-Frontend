"use client";

import { ReactNode, useState } from "react";
interface SidebarLinkGroupProps {
  children: (handleClick: () => void, open: boolean) => ReactNode;
  activeCondition: boolean;
}

const SidebarLinkGroup = ({
  children,
  activeCondition,
}: SidebarLinkGroupProps) => {
  const [open, setOpen] = useState<boolean>(activeCondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return <li>{children(handleClick, open)}</li>;
};

export default SidebarLinkGroup;

// Each instance of SidebarLinkGroup handles its own open/close state.
// Instead of having separate useState hooks for each group in the main sidebar component,
// each group maintains its state internally.
