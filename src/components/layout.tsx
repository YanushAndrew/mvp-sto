import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { ThemeSwitcher } from './theme-switcher';

interface LayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/service-stations':
        return 'Service Stations';
      case '/employees':
        return 'Employees';
      case '/cars':
        return 'Cars';
      case '/reports':
        return 'Reports';
      case '/reviews':
        return 'Reviews';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden theme-transition">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} onLogout={onLogout} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar 
          maxWidth="full" 
          className="border-b border-divider"
        >
          <NavbarContent className="sm:hidden" justify="start">
            <Button 
              isIconOnly 
              variant="light" 
              onPress={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Toggle sidebar"
            >
              <Icon icon="lucide:menu" width={24} />
            </Button>
          </NavbarContent>

          <NavbarContent justify="start">
            <NavbarBrand>
              <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent justify="end">
            <NavbarItem>
              <ThemeSwitcher />
            </NavbarItem>
            <NavbarItem>
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    isIconOnly 
                    variant="light" 
                    className="rounded-full"
                    aria-label="User menu"
                  >
                    <Icon icon="lucide:user" width={20} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions">
                  <DropdownItem key="profile">Profile</DropdownItem>
                  <DropdownItem key="settings">Settings</DropdownItem>
                  <DropdownItem key="logout" color="danger" onPress={onLogout}>Logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </NavbarContent>
        </Navbar>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};