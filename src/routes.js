import LoginPage from "./components/LoginPage/LoginPage";
import Companies from "./components/Companies/Companies";
import PostEventNew from "./components/PostEventNew/PostEventNew";
import PreEventNew from "./components/PreEventNew/PreEventNew";
import PostEventTable from "./components/PostEventTable/PostEventTable";

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
        component: <>Nursing Home Page</>
    },
    {
        name: 'About Us',
        path: '/nursing/aboutus',
        component: <>Nursing About Us</>
    },
    {
        name: 'Pre Event New',
        path: '/nursing/pre-event-new',
        component: <PreEventNew/>
    },
    {
        name: 'Pre Event Table',
        path: '/nursing/pre-event-table',
        component: <PreEventNew/>
    },
    {
        name: 'Post Event New',
        path: '/nursing/post-event-new',
        component: <PostEventNew/>
    },
    {
        name: 'Post Event Table',
        path: '/nursing/post-event-table',
        component: <PostEventTable/>
    },
]

export {routerData}