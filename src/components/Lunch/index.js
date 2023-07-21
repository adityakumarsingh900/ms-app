import { useContext, useEffect } from "react";
import MsContext from "../../MsContext";

function Lunch() {
    const { graphClient } = useContext(MsContext);

    useEffect(() => {
        function loadUpcomingMeetings() {
            // configure Microsoft Graph query to retrieve upcoming meetings for today
            const now = new Date();
            const midnight = new Date();
            midnight.setDate(midnight.getDate() + 1);
            midnight.setHours(0);
            midnight.setMinutes(0);
            midnight.setSeconds(0);
            midnight.setMilliseconds(0);
    
            graphClient
              .api(`/me/calendarview?startdatetime=${now.toISOString()}&enddatetime=${midnight.toISOString()}&$orderby=start/dateTime`)
              .get()
              .then(res => {
                console.log('todays meetings', res.value);
                if (res.value.length === 0) {
                }
                else {
                  
                }
              });
          }

          if (graphClient) loadUpcomingMeetings();
    }, [graphClient]);
    return (
        <div>
            Lunch
        </div>
    );
}

export default Lunch;