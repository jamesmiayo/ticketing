import { PathConstants } from "./pathConstants.ts";
import { v4 as uuidv4 } from "uuid";
import Dashboard from "../../modules/Dashboard/DashboardPage.tsx";
import TicketInformation from "../../modules/TicketInformation/TicketInformationPage.tsx";
import UserDashboardPage from "../../modules/UserDashboard/UserDashboardPage.tsx";
import Maintenance from "../../modules/Maintenance/MaintenancePage.tsx";
import TicketPage from "../../modules/Ticketing/TicketPage.tsx";
import UserTicketPage from "../../modules/UserTicket/UserTicketPage.tsx";
import { useContext } from "react";
import { PermissionContext } from "../../helpers/Providers/PermissionProvider.tsx";
import FaqPage from "../../modules/FAQ/FaqPage.tsx";
import AnnouncementPage from "../../modules/Announcement/AnnouncementPage.tsx";
import SlaReportPage from "../../modules/SLA_Report/SlaReportPage.tsx";

export const usePrivateRoutes = () => {
  const { permission } = useContext(PermissionContext);

    const privateRoutes = [
        {
          id: uuidv4,
          name: "Dashboard",
          description: "See Personal Dashboard",
          path: PathConstants.DASHBOARD,
          component: Dashboard,
          show: true,
        },
        {
            id: uuidv4,
            name: "TicketInformation",
            description: "Ticket Information",
            path: PathConstants.TICKET_INFORMATION,
            component: TicketInformation,
            show: true,
        },
        {
            id: uuidv4,
            name: "Profile",
            description: "Profile",
            path: PathConstants.USER_DASHBOARD,
            component: UserDashboardPage,
            show: true,
        },
        {
            id: uuidv4,
            name: "FAQ",
            description: "FAQ",
            path: PathConstants.FAQ,
            component: FaqPage,
            show: true,
          },
        {
            id: uuidv4,
            name: "Maintenance",
            description: "Maintenance",
            path: PathConstants.MAINTENANCE,
            component: Maintenance,
            show: permission?.includes("Can View Maintenance"),
            requiredPermissions: ["Can View Maintenance"],
        },
        {
            id: uuidv4,
            name: "Ticket",
            description: "Ticket",
            path: PathConstants.TICKET,
            component: TicketPage,
            show: true,
        },
        {
            id: uuidv4,
            name: "Announcement",
            description: "Announcement",
            path: PathConstants.ANNOUNCEMENT,
            component: AnnouncementPage,
            show: true,
        },
        {
            id: uuidv4,
            name: "User Ticket",
            description: "User Ticket",
            path: PathConstants.USERTICKET,
            component: UserTicketPage,
            show: permission?.includes("Can View User Ticket"),
            requiredPermissions: ["Can View User Ticket"],
        },
        {
            id: uuidv4,
            name: "SLA Report",
            description: "SLA Report",
            path: PathConstants.SLAREPORT,
            component: SlaReportPage,
            show: permission?.includes("Can View SLA Reports"),
          },
    ]

  return { privateRoutes };
};
