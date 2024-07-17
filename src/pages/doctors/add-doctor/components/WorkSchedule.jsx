import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import moment from "moment";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { scheduleObj } from "./scheduleObj";

const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function WorkSchedule({
  schedule,
  workingDays,
  setWorkingDays,
  methods,
}) {
  const [startTimeForAll, setStartTimeForAll] = React.useState();
  const [endTimeForAll, setEndTimeForAll] = React.useState();
  const format = "HH:mm";

  const { reset, control, getValues } = useFormContext({
    defaultValues: {},
  });

  const addDay = (day) => {
    console.log(addDay);
    let dayName = day.toUpperCase();
    schedule[dayName] = {
      startTime: moment("09:00", format),
      endTime: moment("20:00", format),
      work: true,
    };
    setWorkingDays([...workingDays, day]);
  };

  const removeDay = (day) => {
    let dayName = day.toUpperCase();
    setWorkingDays(workingDays.filter((d) => d !== day));
    if (schedule[dayName]) {
      schedule[dayName].work = false;
      schedule[dayName].startTime = null;
      schedule[dayName].endTime = null;
    }
    console.log(schedule);
  };
  const setScheduleForm = (schedule) => {
    let scheduleForm = {};
    let workingDays = [];
    if (schedule.MONDAY?.work) {
      scheduleForm = {
        ...scheduleForm,
        mondayEndTime: moment(schedule.MONDAY.endTime, format),
        mondayStartTime: moment(schedule.MONDAY.startTime, format),
        work: workingDays.includes("monday"),
      };
      workingDays.push("monday");
    }
    if (schedule?.TUESDAY?.work) {
      scheduleForm = {
        ...scheduleForm,
        tuesdayEndTime: moment(schedule.TUESDAY.endTime, format),
        tuesdayStartTime: moment(schedule.TUESDAY.startTime, format),
        work: workingDays.includes("tuesday"),
      };
      workingDays.push("tuesday");
    }
    if (schedule?.WEDNESDAY?.work) {
      scheduleForm = {
        ...scheduleForm,
        wednesdayEndTime: moment(schedule?.WEDNESDAY.endTime, format),
        wednesdayStartTime: moment(schedule?.WEDNESDAY.startTime, format),
        work: workingDays.includes("wednesday"),
      };
      workingDays.push("wednesday");
    }

    if (schedule?.THURSDAY?.work) {
      scheduleForm = {
        ...scheduleForm,
        thursdayEndTime: moment(schedule?.THURSDAY.endTime, format),
        thursdayStartTime: moment(schedule?.THURSDAY.startTime, format),
        work: workingDays.includes("thursday"),
      };
      workingDays.push("thursday");
    }

    // FRIDAY
    if (schedule?.FRIDAY?.work) {
      scheduleForm = {
        ...scheduleForm,
        fridayEndTime: moment(schedule?.FRIDAY.endTime, format),
        fridayStartTime: moment(schedule?.FRIDAY.startTime, format),
        work: workingDays.includes("friday"),
      };
      workingDays.push("friday");
    }

    // SATURDAY

    if (schedule?.SATURDAY?.work) {
      scheduleForm = {
        ...scheduleForm,
        saturdayEndTime: moment(schedule?.SATURDAY.endTime, format),
        saturdayStartTime: moment(schedule?.SATURDAY.startTime, format),
        work: workingDays.includes("saturday"),
      };
      workingDays.push("saturday");
    }

    // SUNDAY

    if (schedule?.SUNDAY?.work) {
      scheduleForm = {
        ...scheduleForm,
        sundayEndTime: moment(schedule?.SUNDAY.endTime, format),
        sundayStartTime: moment(schedule?.SUNDAY.startTime, format),
        work: workingDays.includes("sunday"),
      };
      workingDays.push("sunday");
    }

    setWorkingDays(workingDays);
    reset({ ...getValues(), scheduleForm });
  };
  React.useEffect(() => {
    setScheduleForm(schedule);
  }, [schedule]);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
    ></LocalizationProvider>
  );
}
