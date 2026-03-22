import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { HomePage } from "./components/pages/HomePage";
import { ServicesPage } from "./components/pages/ServicesPage";
import { AboutPage } from "./components/pages/AboutPage";
import { ContactPage } from "./components/pages/ContactPage";
import { QuotePage } from "./components/pages/QuotePage";
import { AdminLoginPage } from "./components/pages/AdminLoginPage";
import { AdminDashboardPage } from "./components/pages/AdminDashboardPage";
import { UserAuthPage } from "./components/pages/UserAuthPage";
import { UserDashboardPage } from "./components/pages/UserDashboardPage";
import { MyOffersPage } from "./components/pages/MyOffersPage";
import { OfferDetailPage } from "./components/pages/OfferDetailPage";
import { NotFound } from "./components/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "services", Component: ServicesPage },
      { path: "about", Component: AboutPage },
      { path: "contact", Component: ContactPage },
      { path: "quote", Component: QuotePage },
      { path: "*", Component: NotFound },
    ],
  },
  { path: "/login", Component: UserAuthPage },
  { path: "/dashboard", Component: UserDashboardPage },
  { path: "/my-offers", Component: MyOffersPage },
  { path: "/my-offers/:id", Component: OfferDetailPage },
  { path: "/admin/login", Component: AdminLoginPage },
  { path: "/admin/dashboard", Component: AdminDashboardPage },
]);
