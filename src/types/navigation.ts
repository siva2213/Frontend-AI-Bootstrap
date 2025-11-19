/**
 * Navigation Type Definitions
 * 
 * Type-safe navigation structure for Navbar and Sidebar
 */

export interface NavLink {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

export interface SidebarLink extends NavLink {
  icon: React.ReactNode;
}

export interface NavigationConfig {
  navbar: NavLink[];
  sidebar: SidebarLink[];
}

