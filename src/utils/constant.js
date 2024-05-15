import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccessibleIcon from '@mui/icons-material/Accessible';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';


export const doctorsData = [
    {
        name: 'Dr. Calvin Carlo',
        job: "Eye Care",
        photo: "https://doctris-react-admin.vercel.app/static/media/01.d8b9651b2a3ba6336221.jpg"
    },
    {
        name: 'Dr. Cristine Murhpy',
        job: "Dentist",
        photo: "https://doctris-react-admin.vercel.app/static/media/02.38e00cf46dc0cbd9fed3.jpg"
    },
    {
        name: 'Dr. Alia Reddy',
        job: "Urologist",
        photo: "https://doctris-react-admin.vercel.app/static/media/03.b192aca452235f61b392.jpg"
    },
    {
        name: 'Dr. Toni Covar',
        job: "Eye Care",
        photo: "https://doctris-react-admin.vercel.app/static/media/04.f645789423636f851180.jpg"
    },
    {
        name: 'Dr. Jessica McFarlane',
        job: "Eye Care",
        photo: "https://doctris-react-admin.vercel.app/static/media/05.e4b5d05f3ab9e6bad04a.jpg"
    }
]



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
    }, {
        title: "Doctors",
        children: [{ title: "Add Doctor", path: "/doctors/add-doctor" }, { title: "Doctors", path: "/doctors" }],
        icon: PersonOutlineIcon,
    },
    {
        title: "Patients",
        path: "/patients",
        icon: AccessibleIcon,
    }
]