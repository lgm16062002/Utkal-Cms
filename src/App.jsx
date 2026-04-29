import { useState } from 'react';
import Layout from './componenets/layout/layout';
import Dashboard from './pages/dashboard';
import Notice from './pages/notice';
import Tender from './pages/tender';
import Publication from './pages/publication';
import './index.css'

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'notice':
        return <Notice />;
      case 'tender':
        return <Tender />;
      case 'publication':
        return <Publication />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      {renderPage()}
    </Layout>
  );
}

export default App;
