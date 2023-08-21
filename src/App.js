import './App.css';
import Setup from './components/Setup';
import Home from './pages/Home';
import DaoDetail from './pages/DaoDetail'
import {
  BrowserRouter as Router,
  Route, Routes
} from "react-router-dom";
import DaoHome from './pages/DaoHome';
import BuildDaoPage from './pages/BuildDaoPage';
import ProposalForm from './pages/ProposalForm';
import VotingPage from './pages/VotingPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/dao' element={<DaoDetail />} />
          <Route exact path='/dashboard' element={<DaoHome />} />
          <Route exact path='/create-dao' element={<BuildDaoPage />} />
          <Route exact path='/proposal' element={<ProposalForm />} />
          <Route exact path='/vote' element={<VotingPage />} />
       
        </Routes>
      </Router>
      {/* <Setup /> */}
    </div>
  );
}

export default App;
