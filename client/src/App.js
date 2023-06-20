import Login from "./components/loginPage.jsx";
import { Routes, Route} from 'react-router-dom';
import Homepage from "./components/Homepage.jsx";
import EditJournal from "./components/EditJournal.jsx";
import ViewJournal from "./components/ViewJournal.jsx";
import TestComponent from "./components/TestComponent.jsx";


function App() {
  return(
      <Routes>
        <Route path="/homepage/:username" element={<Homepage />} />
        <Route path="/" element={<Login />} />
        <Route path="/:username/create" element={<EditJournal />}/>
        <Route path="/:username/view" element={<ViewJournal  />} />
        <Route path="/testApi" element = {<TestComponent />} />
      </Routes>
  )

}

export default App;