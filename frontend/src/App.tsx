import React, { useState, useEffect } from "react";
import NavBar from './components/NavBar'
import AllEntries from './routes/AllEntries'
import NewEntry from './routes/NewEntry'
import EditEntry from './routes/EditEntry'
import { EntryProvider } from './utilities/globalContext'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const themes = {
  light: {
    backgroundColor: '#ffffff',

  },
  dark: {
    backgroundColor: '#ffffff',
    filter: 'invert(100%)'

  }
}

export default function App() {
  const [theme, setTheme] = useState(themes.light)
  const changeTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light)
  }
  
  const [themeText, setThemeText] = useState('Dark Mode')
  const changeThemeText = () => {
    setThemeText(themeText === "Light Mode" ? "Dark Mode" : "Light Mode");
  }
 
  const toggleTheme = () => {
    changeTheme() 
    changeThemeText()
  }

  return (
    <div id={'page'} style={theme}>
    <button onClick={toggleTheme} className="m-2 p-3 text-l bg-blue-400 hover:bg-blue-500 rounded-md font-medium fontsize-small text-white">{themeText}</button>
    <section >
    <Router>
    <EntryProvider>
    <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<AllEntries/>}>
        </Route>
        <Route path="create" element={<NewEntry/>}>
        </Route>
        <Route path="edit/:id" element={<EditEntry/>}>
        </Route>
      </Routes>
    </EntryProvider>
    </Router>
    </section>
    </div>
  );
}
