import moment from "moment";
const format = "HH:mm";
export const scheduleObj = {
    MONDAY: {
        startTime: moment("09:00", format).format(format),
        endTime: moment("20:00", format).format(format),
        work: true
    },
    TUESDAY: {
        startTime: moment("09:00", format).format(format),
        endTime: moment("20:00", format).format(format),
        work: true
    },
    WEDNESDAY: {
        startTime: moment("09:00", format).format(format),
        endTime: moment("20:00", format).format(format),
        work: true
    },
    THURSDAY: {
        startTime: moment("09:00", format).format(format),
        endTime: moment("20:00", format).format(format),
        work: true
    },
    FRIDAY: {
        startTime: moment("09:00", format).format(format),
        endTime: moment("20:00", format).format(format),
        work: true
    },
    SATURDAY: {
        startTime: moment("09:00", format).format(format),
        endTime: moment("20:00", format).format(format),
        work: true
    },
    SUNDAY: {
        startTime: moment("09:00", format).format(format),
        endTime: moment("20:00", format).format(format),
        work: true
    },
};