import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateCompanies } from '@/entities/company/lib';
import {
  addCompany,
  removeSelected,
  setCompanies,
  toggleSelect,
  toggleSelectAll,
  updateCompany,
} from '@/entities/company/model';
import { CompanyTable } from '@/entities/company/ui';
import { randomToken } from '@/shared/lib/algo';
import { Button } from '@/shared/ui';
import styles from './CompanyListPage.module.scss';

export const CompanyListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const companies = useSelector(
    (state: RootState) => state.companies.companies
  );
  const handleAddCompany = () => {
    dispatch(
      addCompany({
        id: randomToken(),
        name: '',
        address: '',
        isSelected: false,
      })
    );
  };

  //Заполнение списка компаний
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const companies = generateCompanies(10000);
      dispatch(setCompanies(companies));
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Список компаний</h1>
        <div className={styles.actionsContainer}>
          <Button onClick={handleAddCompany}>Добавить компанию</Button>
          <Button
            variants="destructive"
            onClick={() => dispatch(removeSelected())}
          >
            Удалить выделенные
          </Button>
        </div>
      </header>
      <div className={styles.tableContainer}>
        <CompanyTable
          companies={companies}
          onToggleAll={() => dispatch(toggleSelectAll())}
          onToggle={(id) => dispatch(toggleSelect(id))}
          onEdit={(id, field, value) =>
            dispatch(updateCompany({ id, field, value }))
          }
        />
      </div>
    </div>
  );
};
