import Main from "./components/Main"
import PlumbCard from "./components/PlumbCard"

const routes = [
    {
        path:'/',
        element: <Main />
    },
    {
        path:'/plumbcard/:id',
        element: <PlumbCard />
    }
]

export default routes;