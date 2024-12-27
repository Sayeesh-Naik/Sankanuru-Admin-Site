import LoginPage from "./components/LoginPage/LoginPage";
import Companies from "./components/Companies/Companies";

const routerData = [
    {
        name: '*',
        path: '*',
        component: <Companies/>
    },
    {
        name: 'Login',
        path: '/login',
        component: <LoginPage/>
    },
    {
        name: 'Dashboard',
        path: '/dashboard',
        component: <Companies/>
    },
    {
        name: 'Home Page',
        path: '/nursing/home',
        component: <>Nurcing Home</>
    },
    {
        name: 'About Us',
        path: '/nursing/aboutus',
        component: <>Nursing About Us</>
    },
    {
        name: 'Pre Event',
        path: '/nursing/pre-event',
        component: <>Nurcing Pre Event</>
    },
    {
        name: 'Post Event',
        path: '/nursing/post-event',
        component: <>Nurcing Post Event</>
    },
]

export {routerData}