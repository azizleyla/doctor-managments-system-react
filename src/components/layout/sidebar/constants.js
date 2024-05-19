import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccessibleIcon from '@mui/icons-material/Accessible';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

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
            { title: "Add Doctor", path: "/doctors/add-doctor" },
            { title: "Doctors", path: "/doctors" }
        ],
        icon: PersonOutlineIcon,
    },
    {
        title: "Patients",
        path: "/patients",
        icon: AccessibleIcon,
    }
];
