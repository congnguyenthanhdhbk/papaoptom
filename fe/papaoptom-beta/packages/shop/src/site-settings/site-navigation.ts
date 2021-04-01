export const HOME_PAGE = "/";
export const CHECKOUT_PAGE = "/checkout";
export const PROFILE_PAGE = "/profile";
export const YOUR_ORDER_PAGE = "/order";
export const ORDER_RECEIVED_PAGE = "/order-received";
export const OFFER_PAGE = "/offer";
export const HELP_PAGE = "/help";
export const TERMS_AND_SERVICES_PAGE = "/terms";
export const PRIVACY_POLICY_PAGE = "/privacy";
// Mobile Drawer Menus

export const HOME_MENU_ITEM = {
  id: "nav.home",
  defaultMessage: "Home",
  href: HOME_PAGE,
};

export const HELP_MENU_ITEM = {
  id: "nav.help",
  defaultMessage: "Help",
  href: HELP_PAGE,
};
export const OFFER_MENU_ITEM = {
  id: "nav.offer",
  defaultMessage: "Offer",
  href: OFFER_PAGE,
};
export const ORDER_MENU_ITEM = {
  id: "nav.order",
  href: YOUR_ORDER_PAGE,
  defaultMessage: "Order",
};
export const PROFILE_MENU_ITEM = {
  id: "nav.profile",
  defaultMessage: "Profile",
  href: PROFILE_PAGE,
};
export const AUTHORIZED_MENU_ITEMS = [
  PROFILE_MENU_ITEM,
  {
    id: "nav.checkout",
    defaultMessage: "Checkout",
    href: CHECKOUT_PAGE,
  },
  ORDER_MENU_ITEM,
  {
    id: "nav.order_received",
    href: ORDER_RECEIVED_PAGE,
    defaultMessage: "Order invoice",
  },
  {
    id: "nav.terms_and_services",
    defaultMessage: "Terms and Services",
    href: TERMS_AND_SERVICES_PAGE,
  },
  {
    id: "nav.privacy_policy",
    defaultMessage: "Privacy Policy",
    href: PRIVACY_POLICY_PAGE,
  },
];
// category menu items for header navigation
export const CATEGORY_MENU_ITEMS = [
  {
    id: "nav.shoes",
    defaultMessage: "Shoes",
    href: HOME_PAGE,
    icon: "DressIcon",
    dynamic: true,
  },
];

export const MOBILE_DRAWER_MENU = [
  HOME_MENU_ITEM,
  ...AUTHORIZED_MENU_ITEMS,
  HELP_MENU_ITEM,
  OFFER_MENU_ITEM,
];

export const PROFILE_SIDEBAR_TOP_MENU = [ORDER_MENU_ITEM, HELP_MENU_ITEM];
export const PROFILE_SIDEBAR_BOTTOM_MENU = [PROFILE_MENU_ITEM];

export const LANGUAGE_MENU = [
  {
    id: "en",
    defaultMessage: "English",
    icon: "USFlag",
  },
];
