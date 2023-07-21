import { useContext, useEffect, useState } from "react";

import MsContext from "../../MsContext";

function getTimeString(dateFromGraph) {
    const date = new Date(dateFromGraph + 'Z');
    const minutes = date.getMinutes();
    return `${date.getHours()}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

function Lunch() {
  const { graphClient } = useContext(MsContext);
  const [zenTime, setZenTime] = useState(null);
  const [zenDuration, setZenDuration] = useState(null);

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

        .api(
          `/me/calendarview?startdatetime=${now.toISOString()}&enddatetime=${midnight.toISOString()}&$orderby=start/dateTime`
        )

        .get()

        .then((res) => {
          console.log("todays meetings", res.value);

          let arrStartTime = [{ start: '2023-07-21T03:30:00.0000000', end: '2023-07-21T03:30:00.0000000' }];

          res.value?.forEach((data) => {
            arrStartTime.push({
              start: data.start.dateTime,
              end: data.end.dateTime,
            });
          });

          arrStartTime.push({ start: '2023-07-21T13:30:00.0000000', end: '2023-07-21T13:30:00.0000000' });

          // find largest interval between meetings
            let maxInterval = 0;
            let maxIntervalIndex = 0;
            for (let i = 0; i < arrStartTime.length - 1; i++) {
                const currentInterval = new Date(arrStartTime[i + 1].start) - new Date(arrStartTime[i].end);
                if (currentInterval > maxInterval) {
                    maxInterval = currentInterval;
                    maxIntervalIndex = i;
                }
            }

            // change maxInterval to hours
            maxInterval = maxInterval / 1000 / 60 / 60;
            // round off maxInterval to 0 decimal places
            maxInterval = Math.round(maxInterval * 10) / 10;
            setZenDuration(maxInterval);
            setZenTime({
                start: arrStartTime[maxIntervalIndex].end,
                end: arrStartTime[maxIntervalIndex + 1].start
            });

          console.log("test6", JSON.stringify(arrStartTime));

        });
    }

    if (graphClient) loadUpcomingMeetings();
  }, [graphClient]);

  return <div>
    <p className="text-4xl" style={{ marginBottom: '1rem' }}>
    Today's Focus Time: 
    </p>
    <div style={{
      background: 'url(./focus.jpeg)',
      height: '300px',
      width: '440px',
      backgroundSize: 'contain',
      textAlign: 'left',
      color:'#510101',
      padding: '20px',
      fontWeight: 'bold',
    }}>
      <p className="text-3xl">{getTimeString(zenTime?.start)} - {getTimeString(zenTime?.end)}</p>
      <p className="text-3xl">({zenDuration} hrs)</p>
    </div>
  </div>
}

export default Lunch;