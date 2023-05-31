export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}

export type MainNavItem = NavItem;

export type DashboardConfig = {
  mainNav: MainNavItem[];
};
