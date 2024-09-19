
import AboutUs from "./components/AboutUs";
import Login from "./components/Login";
import Main from "./components/Main"
import PlumbCard from "./components/PlumbCard"
import Profile from "./components/profile/Profile";
import SignUp from "./components/SignUp";

const routes = [
    {
        path:'/',
        element: <Main />
    },
    {
        path:'/plumbcard/:id',
        element: <PlumbCard />
    },
    {
        path:'/login',
        element: <Login />
    },
    {
        path:'/signup',
        element: <SignUp />
    },
    {
        path:'/profile',
        element:<Profile />
    },
    {
        path:'/aboutus',
        element:<AboutUs />
    }
]


export default routes;