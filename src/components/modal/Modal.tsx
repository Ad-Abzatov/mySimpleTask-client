import { FC, useEffect, useRef } from "react";
import "./Modal.css"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({isOpen, onClose}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div ref={modalRef} className="modal">
        <h2>Форма</h2>
        <form>
          <button type="button" onClick={onClose}>Закрыть</button>
        </form>
      </div>
    </div>
  )
}

export default Modal
