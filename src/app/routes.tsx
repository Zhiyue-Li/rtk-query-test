import Dashboard from "../features/dashboard"

const routes = [
    {
      type: "collapse",
      name: "Dashboard",
      key: "dashboard",
      route: "/dashboard",
      component: <Dashboard />,
    }
]

export default routes