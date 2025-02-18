// import {
//   Home,
//   Briefcase,
//   ClipboardList,
//   Package,
//   FileText,
//   Car,
//   Database,
//   Shield,
//   Users,
//   BarChart,
//   Settings,
//   Search,
// } from "lucide-react";

// export const menuItems = [
//   { name: "dashboard", icon: Home, path: "/" },
//   { name: "jobs", icon: Briefcase, path: "/jobs" },
//   { name: "emptyjobs", icon: ClipboardList, path: "/jobs/empty" },
//   { name: "spareparts", icon: Package, path: "/spareparts" },
//   { name: "memo", icon: FileText, path: "/memo" },
//   { name: "cars", icon: Car, path: "/cars" },
//   { name: "inventory", icon: Database, path: "/inventory/used" },
//   { name: "accounting", icon: Shield, path: "/accounts" },
//   { name: "hrms", icon: Users, path: "/hrms/employee" },
//   { name: "customers", icon: Users, path: "/customers" },
//   { name: "reports", icon: BarChart, path: "/reports" },
//   { name: "settings", icon: Settings, path: "/settings" },
//   { name: "search", icon: Search, path: "/search" },
// ];

import {
  Users,
  Tag,
  Gift,
  Newspaper,
  ListChecks,
  HelpCircle,
  Lightbulb,
  Share2,
  Image,
  CreditCard,
  Settings,
  Home,
} from 'lucide-react';

export const menuItems = [
  { name: 'dashboard', icon: Home, path: '/' },
  { name: 'tradetips', icon: Lightbulb, path: '/tradetips' },
  { name: 'users', icon: Users, path: '/users' },
  { name: 'coupons', icon: Tag, path: '/coupons' },
  { name: 'referrals', icon: Gift, path: '/referrals' },
  { name: 'news', icon: Newspaper, path: '/news' },
  // { name: 'News Category', icon: ListChecks, path: '/news/category' },
  { name: 'faq', icon: HelpCircle, path: '/faq' },

  { name: 'social-links', icon: Share2, path: '/social-links' },
  // { name: 'Media Assets', icon: Image, path: '/media-assets' },
  { name: 'plans', icon: CreditCard, path: '/plans' },
  { name: 'settings', icon: Settings, path: '/settings' },
];
