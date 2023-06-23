import Login from "./components/loginPage.jsx";
import { Routes, Route} from 'react-router-dom';
import Homepage from "./components/Homepage.jsx";
import EditJournal from "./components/EditJournal.jsx";


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