import { RouteObject, createBrowserRouter } from "react-router-dom";

import CreateReactFlow from "../../features/react-flow/CreateReactFlow";
import App from "../../App";
import ListReactFlow from "../../features/react-flow/ListReactFlow";
import EditReactFlow from "../../features/react-flow/EditReactFlow";

export const routes: RouteObject[] =[
    {
        path: '/',
        element: <App/>,
        children:[
            { path:'', element: <ListReactFlow/>},
            { path:'create', element: <CreateReactFlow/>},
            { path:'edit/:id', element: <EditReactFlow/>},
        ]
    },
]

export const router = createBrowserRouter(routes);