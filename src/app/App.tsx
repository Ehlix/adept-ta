import { StoreProvider } from './providers/StoreProvider';
import { CompanyListPage } from '@/pages/CompanyListPage/ui';

const App = () => {
  return (
    <StoreProvider>
      <CompanyListPage />
    </StoreProvider>
  );
};

export default App;
