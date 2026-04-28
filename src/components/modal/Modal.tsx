import { FC, useEffect, useRef, useState } from "react";
import "./Modal.css"

interface FormField {
  name: string;
  type: 'text' | 'number';
}

interface FormData {
  [key: string]: string;
}
interface ModalProps<T extends FormData = FormData> {
  isOpen: boolean;
  fields: FormField[];
  title?: string;
  onSubmit: (data: T) => Promise<void>;
  onClose: () => void;
  initialData?: Partial<T>;
}

const Modal: FC<ModalProps> = ({isOpen, onClose, onSubmit, fields, title, initialData = {} as any}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData as Record<string, string>);
      setError('');
    }
  }, [isOpen, initialData]);

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
          <button type="submit">Добавить задачу</button><br />
          <button type="button" onClick={onClose}>Закрыть</button>
        </form>
      </div>
    </div>
  )
}

export default Modal
