import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccessibleIcon from "@mui/icons-material/Accessible";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export const menuLinks = [
    {
        title: "Dashboard",
        path: "/",
        icon: PersonOutlineIcon,
    },
    {
        title: "Appointment",
        path: "/appointment",
        icon: AccessAlarmsIcon,
    },
    {
        title: "Doctors",
        children: [
            { title: "All Doctors", path: "/doctors" },
            { title: "Add Doctor", path: "/doctors/add-doctor" },
        ],
        icon: PersonOutlineIcon,
    },
    {
        title: "Patients",
        path: "/patients",
        children: [
            { title: "All Patients", path: "/patients" },
            { title: "Add Patient", path: "/add-patient" },
        ],
        icon: AccessibleIcon,
    },
];

export const shortMenuLinks = [

    { title: "All Doctors", path: "/doctors" },
    { title: "Add Doctor", path: "/doctors/add-doctor" },
    { title: "All Patients", path: "/patients" },
    { title: "Add Patient", path: "/add-patient" },
    {
        title: "Appointment",
        path: "appointment",
    },
];
