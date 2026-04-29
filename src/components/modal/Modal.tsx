import React, { FC, useEffect, useRef, useState } from "react";
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

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  fields,
  title,
  initialData = {} as any
}) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setError('');
    setLoading(true);

    try {
      const submitData = formData as any;
      await onSubmit(submitData);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Ошибка сохранения');
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div ref={modalRef} className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          <button type="submit">Добавить задачу</button><br />
          <button type="button" onClick={onClose}>Закрыть</button>
        </form>
      </div>
    </div>
  )
}

export default Modal
