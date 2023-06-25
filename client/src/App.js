import Login from './components/login/loginPage.jsx';
import { Routes, Route} from 'react-router-dom';
import Homepage from "./components/homepage/Homepage.jsx";
import EditJournal from './components/editJournal/EditJournal.jsx';

function App() {
  return(
      <Routes>
        <Route path="/homepage/:username" element={<Homepage />} />
        <Route path="/" element={<Login />} />
        <Route path="/:username/create" element={<EditJournal />}/>
      </Routes>
  )

}

export default App;