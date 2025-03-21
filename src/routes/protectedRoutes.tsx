import Chat from '@/pages/chat';
import { CreateFaq } from '@/pages/faq/create';
import { FaqView } from '@/pages/faq/view';
import MediaAssets from '@/pages/mediaAssets';
import MediaAssetsHome from '@/pages/mediaAssets/home';
import MediaAssetsNews from '@/pages/mediaAssets/new';
import { CreateNews } from '@/pages/news/create';
import { EditViewNews } from '@/pages/news/view';
import ViewNewCategory from '@/pages/newscategory/view';
import Notifications from '@/pages/notifications';
import { CreateNotification } from '@/pages/notifications/create';
import Transaction from '@/pages/transaction';
import TransactionView from '@/pages/transaction/view';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Dashboard
const DashBoard = lazy(() => import('@/pages/dashboard'));

// Users Management
const Users = lazy(() => import('@/pages/users'));

// Coupons Management
const Coupons = lazy(() => import('@/pages/coupons'));
const CreateCoupon = lazy(() => import('@/pages/coupons/create'));
const UpdateCoupon = lazy(() => import('@/pages/coupons/update'));

//NewsCategory Mangement
const CreateNewsCategory = lazy(() => import('@/pages/newscategory/create'));

// Referrals
const Referrals = lazy(() => import('@/pages/referrals'));

// News Management
const News = lazy(() => import('@/pages/news'));
const NewsCategory = lazy(() => import('@/pages/newscategory'));

// FAQ Management
const FAQ = lazy(() => import('@/pages/faq'));

// Trade Tips
const TradeTips = lazy(() => import('@/pages/tradetips'));
const TradeTipsStockTable = lazy(() => import('@/pages/tradetips/create'));
const CreateTradeTip = lazy(
  () => import('@/pages/tradetips/create/createById')
);
const UpdateTradeTip = lazy(() => import('@/pages/tradetips/update'));

// Social Links
const SocialLinks = lazy(() => import('@/pages/sociallinks'));

// Media Assets
// const Banners = lazy(() => import('@/pages/mediaassets'));

// Subscription Plans
const Plans = lazy(() => import('@/pages/plans'));
const CreatePlan = lazy(() => import('@/pages/plans/create'));
const UpdatePlan = lazy(() => import('@/pages/plans/update'));

const Settings = lazy(() => import('@/pages/settings'));

const User = lazy(() => import('@/pages/user'));

// Define Routes
// const ProtectedRoutes: RouteObject[] = [
//   { path: '/', element: <DashBoard /> },
//   { path: '/completed-jobs', element: <Jobs /> },
//   { path: '/jobs', element: <Jobs /> },
//   { path: '/jobs/empty', element: <EmptyJobs /> },
//   { path: '/jobs/completed', element: <CompletedJobs /> },
//   { path: '/jobs/search', element: <SearchJobs /> },
//   { path: '/cabhistory', element: <CabHistory /> },
//   { path: '/spareparts', element: <SpareParts /> },
//   { path: '/inventory/used', element: <UsedSpareParts /> },
//   { path: '/inventory/new', element: <NewSpareParts /> },
//   { path: '/inventory/return', element: <SparePartsReturn /> },
//   { path: '/inventory/purchase', element: <SparePartsPurchase /> },
//   { path: '/inventory/purchase-return', element: <PurchaseReturn /> },
//   { path: '/memo', element: <Memo /> },
//   { path: '/cars', element: <Cars /> },
//   { path: '/accounts', element: <Accounts /> },
//   { path: '/accounts/statements', element: <AccountStatements /> },
//   { path: '/accounts/ledger', element: <GeneralLedger /> },
//   { path: '/accounts/supplier-payment', element: <SupplierPayment /> },
//   { path: '/accounts/invoices', element: <PostingInvoices /> },
//   { path: '/accounts/expenses', element: <UserExpenses /> },
//   { path: '/hrms/employee', element: <AddEmployee /> },
//   { path: '/hrms/payroll', element: <GeneralPayroll /> },
//   { path: '/hrms/announcements', element: <Announcements /> },
//   { path: '/hrms/holidays', element: <Holidays /> },
//   { path: '/customers', element: <Customers /> },
//   { path: '/reports', element: <Reports /> },
//   { path: '/settings', element: <Settings /> },
// ];
const ProtectedRoutes: RouteObject[] = [
  { path: '/', element: <DashBoard /> },
  { path: '/users', element: <Users /> },
  { path: '/users/:userId', element: <User /> },
  { path: '/coupons', element: <Coupons /> },
  { path: '/coupons/create', element: <CreateCoupon /> },
  { path: '/coupons/view/:couponId', element: <UpdateCoupon /> },

  { path: '/referrals', element: <Referrals /> },
  { path: '/news', element: <News /> },
  { path: '/news/create', element: <CreateNews /> },
  { path: '/news/view/:id', element: <EditViewNews /> },
  { path: '/news/category', element: <NewsCategory /> },
  { path: '/faq', element: <FAQ /> },
  { path: '/faq/view/:id', element: <FaqView /> },
  { path: '/faq/create', element: <CreateFaq /> },
  { path: '/tradetips', element: <TradeTips /> },
  { path: '/tradetips/create', element: <TradeTipsStockTable /> },
  { path: '/tradetips/create/:symbol', element: <CreateTradeTip /> },
  { path: '/tradetips/view/:tradeTipId', element: <UpdateTradeTip /> },
  { path: '/social-links', element: <SocialLinks /> },
  { path: '/news/category/create', element: <CreateNewsCategory /> },
  { path: '/news/category/view/:id', element: <ViewNewCategory /> },
  {
    path: '/media-assets',
    element: <MediaAssets />,
    children: [
      { path: '/media-assets/home', element: <MediaAssetsHome /> },
      { path: '/media-assets/news', element: <MediaAssetsNews /> },
    ],
  },
  {
    path: '/notifications',
    element: <Notifications />,
  },
  {
    path: '/notifications/create',
    element: <CreateNotification />,
  },
  { path: '/plans', element: <Plans /> },
  { path: '/plans/create', element: <CreatePlan /> },
  { path: '/plans/view/:planId', element: <UpdatePlan /> },
  { path: '/settings', element: <Settings /> },
  {
    path: '/transaction',
    element: <Transaction />,
  },
  {
    path: '/chat',
    element: <Chat />,
  },
  {
    path: '/transaction/view/:id',
    element: <TransactionView />,
  },
];

export default ProtectedRoutes;
