import { FC, useEffect, useRef, useState } from "react";

export interface MenuItem {
  label: string;
  onClick: () => void;
}

interface KebabMenuProps {
  items: MenuItem[];
}

const KebabMenu: FC<KebabMenuProps> = ({items}) => {
  const [isOpen, setIsOpen] = useState(false);
  const muneRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (muneRef.current && !muneRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="kebab-menu" ref={muneRef}>
      <button
        onClick={handleToggle}
        className="kebab-button"
        aria-label="Открыть меню">
          <span></span><span></span><span></span>
      </button>
      {isOpen && (
        <div className="menu=dropdown">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              className="menu-item">
                {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default KebabMenu
