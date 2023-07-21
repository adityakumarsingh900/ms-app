import './App.css';
import useMsal from './useMsal';
import Auth from './components/Auth';
import MsContext from './MsContext';
import Lunch from './components/Lunch';
import LunchSlot from './components/LunchSlot';

function App() {
  const msal = useMsal();

  return (
    <div className="App">
      <MsContext.Provider value={msal}>
        <Auth />
        {msal.account &&
        <>
          <Lunch />
          <LunchSlot />
          </>
        }
      </MsContext.Provider>
    </div>
  );
}

export default App;
