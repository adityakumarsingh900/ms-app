import { useContext, useEffect, useState } from "react";
import MsContext from "../../MsContext";
import { getCurrentDate, getCurrentMonth, getCurrentYear, getTimeString } from "../../utils";
import noLunchImg from '../../images/noLunch.webp';
import zomato from '../../images/zomato.png';

const lunchSlots = ['13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00'];

function LunchSlot() {
    const { graphClient, account, createMeeting } = useContext(MsContext);
    const [lunchTime, setLunchTime] = useState([]);
    const [alreadyHadLunch, setAlreadyHadLunch] = useState(false);
    const [loading, setLoading] = useState(false);

    const createMeetingForTime = (slot) => {

        const d = new Date();

        const stime = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + "T" + slot.substring(0, 5) + ":00";

        const etime = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + "T" + slot.substring(6) + ":00";

        createMeeting(stime, etime, "Lunch Time")

    }

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
            
            setLoading(true);
            graphClient.api('/me/calendar/getSchedule')
                .post(scheduleInformation)
                .then(res => {
                    setLoading(false);
                    console.log('availability', res.value);

                    const lunchMeet = res.value[0].scheduleItems.find(s => s.subject === 'Lunch Time');
                    if (lunchMeet) {
                        setAlreadyHadLunch(`${getTimeString(lunchMeet.start.dateTime)} - ${getTimeString(lunchMeet.end.dateTime)}`);
                        return;
                    }

                    const availability = res.value[0].availabilityView.split('');
                    const aLc = [];
                    availability.forEach((char, index) => {
                        if (char == '0') aLc.push(lunchSlots[index]);
                    });
                    console.log('availability123', res.value);
                    setLunchTime(aLc);
                });            
        }

        if (graphClient) fetchAvailaiblity();
    }, [graphClient, account.username]);

    if (loading)
        return <div>Loading...</div>
    if (alreadyHadLunch) {
        return (
            <div  className="text-4xl">
                <p style={{ marginBottom: '1rem' }}> .</p>
                <img src={zomato}   alt="zomato" width={300} />
                <p>{alreadyHadLunch}</p>
            </div>
        )
    }

    if (lunchTime.length > 0) {
        return (
            <div>
                <p className="text-4xl"  style={{ marginBottom: '1rem' }}>Availaible for Lunch at:</p>
                    {lunchTime.map(slot => (
                <p>
                        <span onClick={() => createMeetingForTime(slot)} className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 cursor-pointer" style={{ marginBottom: '12px' }}>
                        <span className="text-2xl">{slot}</span>
                    </span>
                </p>
                    ))}
            </div>
        );
    } else {
        return (
            <div>
                <h2 className="text-4xl" style={{ marginBottom: '1rem' }}>No Time for Lunch</h2>
                <img src={noLunchImg} alt="no lunch" width={500} />
            </div>
        );
    }
}

export default LunchSlot;