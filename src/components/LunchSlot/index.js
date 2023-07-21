import { useContext, useEffect, useState } from "react";
import MsContext from "../../MsContext";
import { getCurrentDate, getCurrentMonth, getCurrentYear } from "../../utils";

const lunchSlots = ['13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00']

function LunchSlot() {
    const { graphClient, account } = useContext(MsContext);
    const [lunchTime, setLunchTime] = useState(null);

    useEffect(() => {
        function fetchAvailaiblity() {
            const date = new Date();
            const scheduleInformation = {
                schedules: [account.username],
                startTime: {
                    dateTime: `${getCurrentYear(date)}-${getCurrentMonth(date)}-${getCurrentDate(date)}T13:00:00`,
                    timeZone: 'India Standard Time'
                },
                endTime: {
                    dateTime: `${getCurrentYear(date)}-${getCurrentMonth(date)}-${getCurrentDate(date)}T17:00:00`,
                    timeZone: 'India Standard Time'
                },
                availabilityViewInterval: 60
            };
            
            graphClient.api('/me/calendar/getSchedule')
                .post(scheduleInformation)
                .then(res => {
                    console.log('availability', res.value);
                    const availability = res.value[0].availabilityView;
                    // find index of the first character that is 0 in availability string;
                    const index = availability.indexOf('0');
                    setLunchTime(lunchSlots[index])
                });            
        }

        if (graphClient) fetchAvailaiblity();
    }, [graphClient, account.username]);
    return (
        <div>
            Availaible for Lunch at: {lunchTime}
        </div>
    );
}

export default LunchSlot;