// get current year
function getCurrentYear(date) {
    const now = new Date(date);
    return now.getFullYear();
}

// get current month in 2 digits
function getCurrentMonth(date) {
    const now = new Date(date);
    return ('0' + (now.getMonth() + 1)).slice(-2);
}

// get current date in 2 digits
function getCurrentDate(date) {
    const now = new Date(date);
    return ('0' + now.getDate()).slice(-2);
}

function getTimeString(dateFromGraph) {
    const date = new Date(dateFromGraph + 'Z');
    const minutes = date.getMinutes();
    return `${date.getHours()}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

export {
    getCurrentYear,
    getCurrentMonth,
    getCurrentDate,
    getTimeString
}