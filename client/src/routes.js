import Login from "./components/Login";
import Main from "./components/Main"
import PlumbCard from "./components/PlumbCard"
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
    }
]

export default routes;