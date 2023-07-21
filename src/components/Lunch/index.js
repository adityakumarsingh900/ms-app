import { useContext, useEffect } from "react";
import MsContext from "../../MsContext";

function getTimeString(dateFromGraph) {
    const date = new Date(dateFromGraph + 'Z');
    const minutes = date.getMinutes();
    return `${date.getHours()}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function Lunch() {
    const { graphClient } = useContext(MsContext);

    useEffect(() => {
        function loadUpcomingMeetings() {
            // configure Microsoft Graph query to retrieve upcoming meetings for today
            const now = new Date();
            const midnight = new Date();
            now.setHours(9);
            now.setMinutes(0);
            now.setSeconds(0);
            now.setMilliseconds(0);
            midnight.setHours(19);
            midnight.setMinutes(0);
            midnight.setSeconds(0);
            midnight.setMilliseconds(0);
            graphClient
              .api(`/me/calendarview?startdatetime=${now.toISOString()}&enddatetime=${midnight.toISOString()}&$orderby=start/dateTime`)
              .get()
              .then(res => {
                console.log('todays meetings', res.value);
                let arrStartTime = [{start: 9, end: 9}];
                res.value?.map((data)=>{
                    arrStartTime.push({start: data.start.dateTime, end:data.end.dateTime});
                })
                arrStartTime.push({start: 19, end: 19});
                console.log('test6', arrStartTime);
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