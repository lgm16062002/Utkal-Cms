import { useState } from 'react';
import Layout from './componenets/layout/layout';
import Dashboard from './pages/dashboard';
import Notice from './pages/notice';
import Tender from './pages/tender';
import Publication from './pages/publication';
import Faculty from './pages/faculty';
import ResearchProject from './pages/research-project';
import ILMS from './pages/ilms';
import Seminar from './pages/seminar';
import Award from './pages/award';
import Scholar from './pages/scholar';
import Supervisor from './pages/supervisor';
import Gallery from './pages/gallery';
import News from './pages/news';
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
      case 'faculty':
        return <Faculty />;
      case 'research project':
        return <ResearchProject />;
      case 'ilms':
        return <ILMS />;
      case 'workshop/ seminar details':
        return <Seminar />;
      case 'achievements':
        return <Award />;
      case 'research scholars':
        return <Scholar />;
      case 'research supervisors':
        return <Supervisor />;
      case 'photo gallery':
        return <Gallery />;
      case 'events & news':
        return <News />;
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
