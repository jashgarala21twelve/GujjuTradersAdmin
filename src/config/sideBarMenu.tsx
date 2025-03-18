import {
  Users,
  LayoutDashboardIcon,
  SettingsIcon,
  PenToolIcon,
  Tag,
  Gift,
  Newspaper,
  ListChecks,
  HelpCircle,
  Lightbulb,
  Share2,
  CreditCard,
  MessageCircle,
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
  ],
  users: [
    {
      key: 'users',
      name: 'Users',
      path: '/users',
      icon: Users,
      title: 'Users',
    },
  ],
  coupons: [
    {
      title: 'Coupons',
      key: 'coupons',
      name: 'Manage Coupons',
      path: '/coupons',
      icon: Tag,
    },
    {
      key: 'coupons-create',
      name: 'Create Coupon',
      path: '/coupons/create',
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
  // faq: [
  //   {
  //     key: 'faq',
  //     name: 'Manage FAQ',
  //     path: '/faq',
  //     icon: HelpCircle,
  //     title: 'FAQ',
  //   },
  // ],
  tradetips: [
    {
      key: 'tradetips',
      name: 'Trade Tips DashBoard',
      path: '/tradetips',
      icon: Lightbulb,
      title: 'Trade Tips',
    },
    {
      key: 'tradetips-create',
      name: 'Create Trade Tip',
      path: '/tradetips/create',
      icon: Lightbulb,
    },
  ],
  // sociallinks: [
  //   {
  //     key: 'sociallinks',
  //     name: 'Manage Social Links',
  //     path: '/social-links',
  //     icon: Share2,
  //     title: 'Socials',
  //   },
  // ],
  plans: [
    {
      key: 'plans',
      name: 'Manage Plans',
      path: '/plans',
      icon: CreditCard,
      title: 'Plans',
    },
    {
      key: 'plans-create',
      name: 'Create Plan',
      path: '/plans/create',
      icon: CreditCard,
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
    {
      key: 'faq',
      name: 'Manage FAQ',
      path: '/faq',
      icon: HelpCircle,
      title: 'FAQ',
    },
    {
      key: 'sociallinks',
      name: 'Manage Social Links',
      path: '/social-links',
      icon: Share2,
      title: 'Socials',
    },
  ],
  'media-assets': [
    {
      key: 'media-assets-home',
      name: 'Manage Home Banner',
      path: '/media-assets/home',
      icon: PenToolIcon,
      title: 'Home Banner',
    },
    {
      key: 'media-assets-news',
      name: 'Manage News Banner',
      path: '/media-assets/news',
      icon: PenToolIcon,
      title: 'News Banner',
    },
  ],
  transaction: [
    {
      key: 'transaction-home',
      name: 'Manage Transaction',
      path: '/transaction',
      icon: CreditCard,
      title: 'Home Transaction',
    },
  ],
  chat: [
    {
      key: 'chat-home',
      name: 'Manage Chat',
      path: '/chat',
      icon: MessageCircle,
      title: 'Home Chat',
    }
  ]
};
