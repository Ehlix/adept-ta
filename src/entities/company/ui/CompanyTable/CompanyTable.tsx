import { Company } from '../../model';
import { VirtualList, Checkbox } from '@/shared/ui';
import { CompanyRow } from '../CompanyRow/CompanyRow';
import styles from './CompanyTable.module.scss';

interface CompanyTableProps {
  companies: Company[];
  onToggleAll: () => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, field: keyof Company, value: string) => void;
}

export const CompanyTable = ({
  companies,
  onToggleAll,
  onToggle,
  onEdit,
}: CompanyTableProps) => {
  const areAllSelected =
    !!companies.length && companies.every((company) => company.isSelected);

  return (
    <VirtualList
      itemHeight={45}
      items={companies}
      gap={10}
      renderHead={() => (
        <div className={styles.header}>
          <div className={styles.cell}>
            <Checkbox checked={areAllSelected} onChange={onToggleAll} />
          </div>
          <h3 className={styles.cell}>Название компании</h3>
          <h3 className={styles.cell}>Адрес</h3>
        </div>
      )}
      renderItem={(company) => (
        <CompanyRow
          key={company.id}
          company={company}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      )}
    />
  );
};
