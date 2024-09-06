import Login from "./components/Login";
import Main from "./components/Main"
import PlumbCard from "./components/PlumbCard"
import Profile from "./components/Profile";
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
    }
]

export default routes;