import { useState, useRef, useEffect } from 'react';
import { Company } from '../../model';
import styles from './CompanyRow.module.scss';
import { Button, Checkbox } from '@/shared/ui';

interface CompanyRowProps {
  company: Company;
  onToggle: (id: string) => void;
  onEdit: (id: string, field: keyof Company, value: string) => void;
}

export const CompanyRow = ({ company, onToggle, onEdit }: CompanyRowProps) => {
  const [editingField, setEditingField] = useState<keyof Company | null>(null);
  const [localValue, setLocalValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Автофокус на инпут
  useEffect(() => {
    if (editingField && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingField]);

  const startEditing = (field: keyof Company) => {
    setEditingField(field);
    setLocalValue(company[field].toString());
  };

  const saveEdit = () => {
    if (editingField) {
      onEdit(company.id, editingField, localValue);
      setEditingField(null);
    }
  };

  const cancelEdit = () => {
    setEditingField(null);
  };

  return (
    <div
      className={`${styles.row} ${company.isSelected ? styles.selected : ''}`}
    >
      <div className={styles.cell}>
        <Checkbox
          checked={company.isSelected}
          onChange={() => onToggle(company.id)}
        />
      </div>

      <div className={styles.cell}>
        {editingField === 'name' ? (
          <div className={styles.editContainer}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Название компании"
              value={localValue}
              name="Company name"
              onChange={(e) => setLocalValue(e.target.value)}
            />
            <Button
              onClick={(e) => {
                saveEdit();
              }}
            >
              Сохранить
            </Button>
            <Button
              variants="destructive"
              onClick={(e) => {
                cancelEdit();
              }}
            >
              Отменить
            </Button>
          </div>
        ) : (
          <div className={styles.viewContainer}>
            <span>{company.name || 'Без названия'}</span>
            <Button onClick={() => startEditing('name')}>Изменить</Button>
          </div>
        )}
      </div>

      <div className={styles.cell}>
        {editingField === 'address' ? (
          <div className={styles.editContainer}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Адрес компании"
              name="Company address"
              value={localValue}
              onChange={(e) => setLocalValue(e.target.value)}
            />
            <Button
              onClick={() => {
                saveEdit();
              }}
            >
              Сохранить
            </Button>
            <Button
              variants="destructive"
              onClick={() => {
                cancelEdit();
              }}
            >
              Отменить
            </Button>
          </div>
        ) : (
          <div className={styles.viewContainer}>
            <span>{company.address || 'Адрес отсутствует'}</span>
            <Button onClick={() => startEditing('address')}>Изменить</Button>
          </div>
        )}
      </div>
    </div>
  );
};
