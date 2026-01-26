import { FC, useState } from "react";

interface MenuItem {
  label: string;
  onClick: () => void;
}

interface KebabMenuProps {
  items: MenuItem[];
}

const KebabMenu: FC<KebabMenuProps> = ({items}) => {
  const [isOpen, setIsOpen] = useState(false);

  return ()
}
