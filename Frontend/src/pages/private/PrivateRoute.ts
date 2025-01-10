import { PathConstants } from "./pathConstants.ts";
import { v4 as uuidv4 } from "uuid";
import Dashboard from "../../modules/Dashboard/DashboardPage.tsx";
import TicketInformation from "../../modules/TicketInformation/TicketInformationPage.tsx";
import UserDashboardPage from "../../modules/UserDashboard/UserDashboardPage.tsx";
import Maintenance from "../../modules/Maintenance/MaintenancePage.tsx";
import TicketPage from "../../modules/Ticketing/TicketPage.tsx";
import { useContext } from "react";
import { PermissionContext } from "../../helpers/Providers/PermissionProvider.tsx";
import FaqPage from "../../modules/FAQ/FaqPage.tsx";
import AnnouncementPage from "../../modules/Announcement/AnnouncementPage.tsx";
import SlaReportPage from "../../modules/SLA_Report/SlaReportPage.tsx";
import AHTPage from "../../modules/AHT/AHTPage.tsx";
import CSATPage from "../../modules/CSAT/CSATPage.tsx";

export const usePrivateRoutes = () => {
  const { permission } = useContext(PermissionContext);

  const privateRoutes = [
    {
      id: uuidv4,
      name: "Dashboard",
      title: "Dashboard Page",
      description: "See Personal Dashboard",
      path: PathConstants.DASHBOARD,
      component: Dashboard,
      show: true,
    },
    {
      id: uuidv4,
      name: "TicketInformation",
      title: "Ticket Information Page",
      description: "Ticket Information",
      path: PathConstants.TICKET_INFORMATION,
      component: TicketInformation,
      show: true,
    },
    {
      id: uuidv4,
      name: "Profile",
      title: "Profile Page",
      description: "Profile",
      path: PathConstants.USER_DASHBOARD,
      component: UserDashboardPage,
      show: true,
    },
    {
      id: uuidv4,
      name: "FAQ",
      title: "FAQ's Page",
      description: "FAQ",
      path: PathConstants.FAQ,
      component: FaqPage,
      show: true,
    },
    {
      id: uuidv4,
      name: "Maintenance",
      title: "Maintenance Page",
      description: "Maintenance",
      path: PathConstants.MAINTENANCE,
      component: Maintenance,
      show: permission?.includes("Can View Maintenance"),
      requiredPermissions: ["Can View Maintenance"],
    },
    {
      id: uuidv4,
      name: "Ticket",
      title: "Ticket Page",
      description: "Ticket",
      path: PathConstants.TICKET,
      component: TicketPage,
      show: true,
    },
    {
      id: uuidv4,
      name: "Announcement",
      title: "Announcement Page",
      description: "Announcement",
      path: PathConstants.ANNOUNCEMENT,
      component: AnnouncementPage,
      show: true,
    },
    {
      id: uuidv4,
      name: "Average Handle Time",
      title: "AHT Reports",
      description: "Average Handle Time",
      path: PathConstants.AHT,
      component: AHTPage,
      show: permission?.includes("Can View Ticket AHT"),
      requiredPermissions: ["Can View Ticket AHT"],
    },
    {
      id: uuidv4,
      name: "CSAT Report",
      title: "CSAT Report Page",
      description: "CSAT Report",
      path: PathConstants.CSATREPORT,
      component: CSATPage,
      show: permission?.includes("Can View CSAT Report"),
      requiredPermissions: ["Can View CSAT Report"],
    },
    {
      id: uuidv4,
      name: "SLA Report",
      title: "SLA Report Page",
      description: "SLA Report",
      path: PathConstants.SLAREPORT,
      component: SlaReportPage,
      show: permission?.includes("Can View SLA Reports"),
    },
  ];

  return { privateRoutes };
};
