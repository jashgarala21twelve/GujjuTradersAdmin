// import { ReactNode } from "react";
// import {
//   LayoutDashboardIcon,
//   BriefcaseIcon,
//   SearchIcon,
//   CarIcon,
//   Package,
//   PenToolIcon,
//   RotateCwIcon,
//   FileText,
//   Users,
//   SettingsIcon,
//   PersonStandingIcon,
// } from "lucide-react";

// export interface SidebarMenuItem {
//   key: string;
//   name: string;
//   path?: string;
//   icon?: ReactNode;
//   children?: SidebarMenuItem[];
// }

// export const sidebarMenus: SidebarMenuItem[] = [
//   {
//     key: "dashboard",
//     name: "Dashboard",
//     path: "/",
//     icon: <LayoutDashboardIcon />,
//   },
//   {
//     key: "jobs",
//     name: "Jobs Management",
//     icon: <BriefcaseIcon />,
//     children: [
//       { key: "jobs-main", name: "Manage Jobs", path: "/jobs" },
//       { key: "jobs-empty", name: "Empty Jobs", path: "/jobs/empty" },
//       {
//         key: "jobs-search",
//         name: "Search Jobs",
//         path: "/jobs/search",
//         icon: <SearchIcon />,
//       },
//     ],
//   },
//   {
//     key: "cabhistory",
//     name: "Cab History",
//     path: "/cabhistory",
//     icon: <CarIcon />,
//   },
//   {
//     key: "spareparts",
//     name: "Spare Parts",
//     icon: <Package />,
//     children: [
//       { key: "spare-main", name: "Manage Spare Parts", path: "/spareparts" },
//       {
//         key: "spare-used",
//         name: "Used Spare Parts",
//         path: "/inventory/used",
//         icon: <PenToolIcon />,
//       },
//       {
//         key: "spare-new",
//         name: "New Spare Parts",
//         path: "/inventory/new",
//         icon: <PenToolIcon />,
//       },
//       {
//         key: "spare-return",
//         name: "Spare Parts Return",
//         path: "/inventory/return",
//         icon: <RotateCwIcon />,
//       },
//       {
//         key: "spare-purchase",
//         name: "Spare Parts Purchase",
//         path: "/inventory/purchase",
//         icon: <RotateCwIcon />,
//       },
//       {
//         key: "purchase-return",
//         name: "Purchase Return",
//         path: "/inventory/purchase-return",
//         icon: <RotateCwIcon />,
//       },
//     ],
//   },
//   {
//     key: "memo",
//     name: "Memo Management",
//     path: "/memo",
//     icon: <PersonStandingIcon />,
//   },
//   {
//     key: "cars",
//     name: "Manage Cars",
//     path: "/cars",
//     icon: <CarIcon />,
//   },
//   {
//     key: "accounts",
//     name: "Accounts & Finance",
//     icon: <PersonStandingIcon />,
//     children: [
//       { key: "accounts-main", name: "Accounts", path: "/accounts" },
//       {
//         key: "account-statements",
//         name: "Account Statements",
//         path: "/accounts/statements",
//       },
//       {
//         key: "general-ledger",
//         name: "General Ledger",
//         path: "/accounts/ledger",
//       },
//       {
//         key: "supplier-payment",
//         name: "Supplier Payment",
//         path: "/accounts/supplier-payment",
//       },
//       {
//         key: "posting-invoices",
//         name: "Posting Invoices",
//         path: "/accounts/invoices",
//       },
//       {
//         key: "user-expenses",
//         name: "User Expenses",
//         path: "/accounts/expenses",
//       },
//     ],
//   },
//   {
//     key: "hrms",
//     name: "HRMS",
//     icon: <PersonStandingIcon />,
//     children: [
//       { key: "hrms-employee", name: "Add Employee", path: "/hrms/employee" },
//       { key: "hrms-payroll", name: "General Payroll", path: "/hrms/payroll" },
//       {
//         key: "hrms-announcements",
//         name: "Announcements",
//         path: "/hrms/announcements",
//       },
//       { key: "hrms-holidays", name: "Holidays", path: "/hrms/holidays" },
//     ],
//   },
//   {
//     key: "customers",
//     name: "Customers",
//     path: "/customers",
//     icon: <Users />,
//   },
//   {
//     key: "reports",
//     name: "Reports",
//     path: "/reports",
//     icon: <FileText />,
//   },
//   {
//     key: "settings",
//     name: "Settings",
//     path: "/settings",
//     icon: <SettingsIcon />,
//   },
// ];

import { Button } from '@/components/ui/button';
import {
  Users,
  FileText,
  LayoutDashboardIcon,
  CheckCircleIcon,
  CarIcon,
  BriefcaseIcon,
  SettingsIcon,
  PenToolIcon,
  PlusIcon,
  RotateCwIcon,
  Package,
  PersonStandingIcon,
  Search,
  Plus,
  RefreshCcw,
  Settings,
  Tag,
  Gift,
  Newspaper,
  ListChecks,
  HelpCircle,
  Lightbulb,
  Share2,
  CreditCard,
} from 'lucide-react';

export const sidebarMenus = {
  dashboard: [
    {
      key: 'dashboard-main',
      name: 'Dashboard',
      path: '/',
      icon: LayoutDashboardIcon,
      title: 'DashBoard',
    },
    // {
    //   key: "dashboard-completed",
    //   name: "Completed Jobs",
    //   path: "/completed-jobs",
    //   icon: CheckCircleIcon,
    // },
    // {
    //   key: "dashboard-cab-history",
    //   name: "Cab History",
    //   path: "/cabhistory",
    //   icon: CarIcon,
    // },
  ],
  users: [
    {
      key: 'users',
      name: 'Users',
      path: '/users',
      icon: Users,
      title: 'Users',
    },
    // {
    //   key: 'jobs-complete',
    //   name: 'Complete Jobs',
    //   path: '/jobs/completed',
    //   icon: CheckCircleIcon,
    // },
    // {
    //   key: 'jobs-search',
    //   name: 'Search Jobs',
    //   path: '/jobs/search',
    //   icon: Search,
    // },
    // {
    //   key: 'jobs-custom-component',
    //   name: 'Custom Component',
    //   component: (
    //     <div className="py-2">
    //       <div className="flex flex-wrap  space-x-3 ">
    //         <Button size="sm" variant="outline">
    //           <Plus className="w-4 h-4 " />
    //         </Button>
    //         <Button size="sm" variant="outline">
    //           <RefreshCcw className="w-4 h-4 " />
    //         </Button>
    //         <Button size="sm" variant="outline">
    //           <Search className="w-4 h-4 " />
    //         </Button>
    //         <Button size="sm" variant="outline">
    //           <Settings className="w-4 h-4 " />
    //         </Button>
    //       </div>
    //     </div>
    //   ),
    // },
  ],
  coupons: [
    {
      title: 'Coupons',
      key: 'coupons',
      name: 'Manage Coupons',
      path: '/coupons',
      icon: Tag,
    },
  ],
  referrals: [
    {
      title: 'Referrals',
      key: 'referrals',
      name: 'Manage Referrals',
      path: '/referrals',
      icon: Gift,
    },
  ],
  news: [
    {
      key: 'news',
      name: 'Manage News',
      path: '/news',
      icon: Newspaper,
      title: 'News',
    },
    {
      key: 'news-category',
      name: 'Manage News Category',
      path: '/news/category',
      icon: ListChecks,
      title: 'News Category',
    },
  ],
  faq: [
    {
      key: 'faq',
      name: 'Manage FAQ',
      path: '/faq',
      icon: HelpCircle,
      title: 'FAQ',
    },
  ],
  tradetips: [
    {
      key: 'tradetips',
      name: 'Manage Trade Tips',
      path: '/tradetips',
      icon: Lightbulb,
      title: 'Trade Tips',
    },
  ],
  sociallinks: [
    {
      key: 'sociallinks',
      name: 'Manage Social Links',
      path: '/social-links',
      icon: Share2,
      title: 'Socials',
    },
  ],
  plans: [
    {
      key: 'plans',
      name: 'Manage Plans',
      path: '/plans',
      icon: CreditCard,
      title: 'Plans',
    },
  ],
  settings: [
    {
      key: 'settings',
      name: 'Settings',
      path: '/settings',
      icon: SettingsIcon,
      title: 'Admin Settings',
    },
  ],
  // accounting: [
  //   {
  //     key: 'accounting-main',
  //     name: 'Accounts',
  //     path: '/accounts',
  //     icon: PersonStandingIcon,
  //     title: 'Accounts',
  //   },
  //   {
  //     key: 'accounting-statements',
  //     name: 'Account Statements',
  //     path: '/accounts/statements',
  //     icon: PersonStandingIcon,
  //   },
  //   {
  //     key: 'accounting-general-ledger',
  //     name: 'General Ledger',
  //     path: '/accounts/ledger',
  //     icon: PersonStandingIcon,
  //   },
  //   {
  //     key: 'accounting-supplier-payment',
  //     name: 'Supplier Payment',
  //     path: '/accounts/supplier-payment',
  //     icon: PersonStandingIcon,
  //   },
  //   {
  //     key: 'accounting-invoices',
  //     name: 'Invoices',
  //     path: '/accounts/invoices',
  //     icon: PersonStandingIcon,
  //   },
  //   {
  //     key: 'accounting-expenses',
  //     name: 'Account Expenses',
  //     path: '/accounts/expenses',
  //     icon: PersonStandingIcon,
  //   },
  // ],
  // inventory: [
  //   {
  //     key: 'inventory-main',
  //     name: 'Inventory',
  //     icon: SettingsIcon,
  //     children: [
  //       {
  //         key: 'inventory-used-spare',
  //         name: 'Used Spare Parts',
  //         path: '/inventory/used',
  //         icon: PenToolIcon,
  //       },
  //       {
  //         key: 'inventory-new-spare',
  //         name: 'New Spare Parts',
  //         path: '/inventory/new',
  //         icon: PenToolIcon,
  //       },
  //       {
  //         key: 'inventory-spare-return',
  //         name: 'Spare Parts Return',
  //         icon: PlusIcon,
  //         children: [
  //           {
  //             key: 'inventory-new-spare-return',
  //             name: 'Purchase Return',
  //             path: '/inventory/return',
  //             icon: RotateCwIcon,
  //           },
  //         ],
  //       },
  //       {
  //         key: 'inventory-spare-part-purchase',
  //         name: 'Spare Parts Purchase',
  //         icon: PlusIcon,
  //         children: [
  //           {
  //             key: 'inventory-spare-part-purchase-2',
  //             name: 'Purchase',
  //             path: '/inventory/purchase',
  //             icon: RotateCwIcon,
  //           },
  //         ],
  //       },
  //       {
  //         key: 'inventory-purchase-return',
  //         name: 'Purchase Return',
  //         icon: PlusIcon,
  //         children: [
  //           {
  //             key: 'purchase-return',
  //             name: 'Purchase Return',
  //             path: '/inventory/purchase-return',
  //             icon: RotateCwIcon,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ],
  // customers: [
  //   {
  //     key: 'customers',
  //     name: 'Customers',
  //     path: '/customers',
  //     icon: Users,
  //     title: 'Customers',
  //   },
  // ],
  // reports: [
  //   {
  //     key: 'reports',
  //     name: 'Reports',
  //     path: '/reports',
  //     icon: FileText,
  //     title: 'Reports',
  //   },
  // ],

  // hrms: [
  //   {
  //     key: 'hrms-employee',
  //     name: 'Employee',
  //     path: '/hrms/employee',
  //     icon: PersonStandingIcon,
  //     title: 'HRMS',
  //   },
  //   {
  //     key: 'hrms-payroll',
  //     name: 'Payroll',
  //     path: '/hrms/payroll',
  //     icon: PersonStandingIcon,
  //   },
  //   {
  //     key: 'hrms-announcements',
  //     name: 'Announcements',
  //     path: '/hrms/announcements',
  //     icon: PersonStandingIcon,
  //   },
  //   {
  //     key: 'hrms-holidays',
  //     name: 'Holidays',
  //     path: '/hrms/holidays',
  //     icon: PersonStandingIcon,
  //   },
  // ],
};
