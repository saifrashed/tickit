import Dashboard from "../views/Dashboard.jsx";
import Icons from "../views/Icons.jsx";
import Typography from "../views/Typography.jsx";
import OrderList from "../views/Orders/OrderList.jsx";
import EventList from "../views/Events/EventList.jsx";
import Upgrade from "../views/Upgrade.jsx";
import UserPage from "../views/User/UserPage.jsx";

var dashRoutes = [
    {
        path:      "/dashboard",
        name:      "Dashboard",
        icon:      "design_app",
        component: Dashboard,
        layout:    "/admin"
    },
    {
        path:      "/profile",
        name:      "Profiel",
        icon:      "users_single-02",
        component: UserPage,
        layout:    "/admin"
    },
    {
        path:      "/events",
        name:      "Evenementen",
        icon:      "ui-1_calendar-60",
        component: EventList,
        layout:    "/admin"
    },
    {
        path:      "/orders",
        name:      "Bestellingen",
        icon:      "files_paper",
        component: OrderList,
        layout:    "/admin"
    },
    {
        path:      "/icons",
        name:      "Icons",
        icon:      "design_image",
        component: Icons,
        layout:    "/admin"
    },
    {
        path:      "/typography",
        name:      "Typography",
        icon:      "design-2_ruler-pencil",
        component: Typography,
        layout:    "/admin"
    },
    {
        pro:       true,
        path:      "/upgrade",
        name:      "informatie",
        icon:      "objects_spaceship",
        component: Upgrade,
        layout:    "/admin"
    }
];
export default dashRoutes;
