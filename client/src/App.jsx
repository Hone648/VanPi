import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import TopBar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import UserInfo from './scenes/userInfo';
import Batteries from './scenes/battery';
import Notifications from './scenes/notifications';
import Tanks from './scenes/tanks';
import { useState } from 'react';
import Settings from './scenes/settings';
import { configurationData } from './data/config';
import CellAntenna from './scenes/cellBooster';
import CreateUserForm from './scenes/userInfo/createUserForm';

function App() {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');
  const [alternator, setAlternator] = useState(
    configurationData.batteries.alternatorDisplayed
  );
  const notifications = ['This is notification 1', 'This is notification 2']


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            selected={selected}
            setSelected={setSelected}
          />
          <main className="content">
            <TopBar selected={selected} setSelected={setSelected} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/batteries"
                element={
                  <Batteries
                    isCollapsed={isCollapsed}
                    alternator={alternator}
                  />
                }
              />
              <Route
                path="/tanks"
                element={<Tanks isCollapsed={isCollapsed} />}
              />
              <Route
                path="/settings"
                element={
                  <Settings
                    data={configurationData}
                    alternator={alternator}
                    setAlternator={setAlternator}
                  />
                }
              />
              <Route
                path='/userinfo'
                element={
                  <UserInfo />
                }
              />
              <Route
                path="/notifications"
                element={
                  <Notifications notifications={notifications} />
                }
              />
              <Route
                path="/cellbooster"
                element={
                  <CellAntenna isCollapsed={isCollapsed}
                  />
                }
              />
              <Route
                path="/createuser"
                element={<CreateUserForm />}
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
