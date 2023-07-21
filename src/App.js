import './App.css';
import useMsal from './useMsal';
import Auth from './components/Auth';
import MsContext from './MsContext';
import Lunch from './components/Lunch';

function App() {
  const msal = useMsal();

  return (
    <div className="App">
      <MsContext.Provider value={msal}>
        <Auth />
        {msal.account &&
          <Lunch />
        }
      </MsContext.Provider>
    </div>
  );
}

export default App;
