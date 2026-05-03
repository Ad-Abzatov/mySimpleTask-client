import React, { FC, lazy, useEffect, useRef, useState } from "react";
import "./Modal.css"

interface FormField {
  name: string;
  type: 'text' | 'number';
  label?: string;
}

interface FormData {
  [key: string]: string;
}
interface ModalProps<T = {[key: string]: string | number}> {
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
  title = 'Форма',
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
          {fields.map((field) => (
            <div key={field.name}>
              {field.label && (
                <label htmlFor={field.name}>{field.label}</label>
              )}
              <input type={field.type} name={field.name} onChange={handleChange} value={formData[field.name]} />
            </div>
          ))}
          <button type="submit">Добавить задачу</button><br />
          <button type="button" onClick={onClose}>Закрыть</button>
        </form>
      </div>
    </div>
  )
}

export default Modal
