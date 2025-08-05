import Header from './Header';
import RemesasList from '../../features/remesas/components/RemesasList';
import './MainContent.css';

const MainContent = () => {
  return (
    <main className="main-content">
      <Header />
      <div className="main-content__body">
        <RemesasList />
      </div>
    </main>
  );
};

export default MainContent;
