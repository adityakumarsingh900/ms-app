import { useEffect, useContext, useState } from "react";
import MsContext from "../../MsContext";
import { getTimeString } from "../../utils";

function MyMeetings() {
    const { graphClient } = useContext(MsContext);
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        function todaysMeetings() {
            // configure Microsoft Graph query to retrieve upcoming meetings for today
      
            const now = new Date();
      
            const midnight = new Date();
      
            now.setHours(9);
      
            now.setMinutes(0);
      
            now.setSeconds(0);
      
            now.setMilliseconds(0);
      
            midnight.setHours(23);
      
            midnight.setMinutes(59);
      
            midnight.setSeconds(59);
      
            midnight.setMilliseconds(0);
      
            graphClient
      
              .api(
                `/me/calendarview?startdatetime=${now.toISOString()}&enddatetime=${midnight.toISOString()}&$orderby=start/dateTime`
              )
      
              .get()
      
              .then((res) => {
                const arrStartTime = [];
                
                res.value?.forEach((data) => {
                  arrStartTime.push({
                    title: data.subject,
                    start: getTimeString(data.start.dateTime),
                    end: getTimeString(data.end.dateTime),
                  });
                });

                console.log('Aditya ', arrStartTime)
                setMeetings(arrStartTime)
      
              });
          }
          if (graphClient) todaysMeetings();
    }, [graphClient]);
    return (
        <div>
            <h1 className="text-4xl"  style={{ marginBottom: '1rem' }}>My Meetings</h1>
            <List meeting={meetings} />
        </div>
    );
}

export default MyMeetings;

function List({meeting}) {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {meeting.map((person) => (
        <li key={person.title} className="flex justify-between gap-x-6 py-5" style={{ padding: '12px' }}>
          <div className="flex gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{person.title}</p>
            </div>
          </div>
          <div className="hidden sm:flex sm:flex-col sm:items-end">
            <p>{person.start}</p>
            <p>{person.end}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
