import App from "./App";
import Home from "./HomePg/Home";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    }
]

export default routes