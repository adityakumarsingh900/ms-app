import './App.css';
import useMsal from './useMsal';
import Auth from './components/Auth';
import MsContext from './MsContext';
import Lunch from './components/Lunch';
import LunchSlot from './components/LunchSlot';
import MyMeetings from './components/MyMeetings';

function App() {
  const msal = useMsal();

  return (
    <div className="App">
      <MsContext.Provider value={msal}>
        <Auth />
        {msal.account &&
          <div className="flex flex-column" style={{justifyContent: 'space-between'}}>
            <div>
              <MyMeetings />
            </div>
            <div>
              <div>
                <LunchSlot />
              </div>
            </div>
              <div>
                <Lunch />
              </div>
          </div>
        }
      </MsContext.Provider>
      <div style={{
        position: 'absolute',
        bottom: '0px',
        right: '0px',
        left: '0px',
      }}>
        <p className="text-xl">
          Made with ❤️ by Team Localhost
        </p>
      </div>
    </div>
  );
}

export default App;
