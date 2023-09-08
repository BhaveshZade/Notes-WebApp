import './App.css';

import { HashRouter as Router, Routes, Switch, Route, Link} from "react-router-dom"

import Header from './components/Header';
import NotesListPage from './pages/NotesListPage'
import NotePage from './pages/NotePage';

function App() {
  return (
    <Router>
      <>
        <div className='container dark'>
          <div className='app'>
            <Header/>
            <Routes>
              <Route path='/' exact element={<NotesListPage/>}/>
              <Route path='/note/:id' exact element={<NotePage/>}/>
            </Routes>
          </div>
        </div>
      </>
    </Router>
  );
}

export default App;
