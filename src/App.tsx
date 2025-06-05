import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './components/layout';
import { Dashboard } from './pages/dashboard';
import { ServiceStations } from './pages/service-stations';
import { Employees } from './pages/employees';
import EmployeesAddNew from './pages/employees-add-new';
import { Cars } from './pages/cars';
import { Reports } from './pages/reports';
import { Reviews } from './pages/reviews';
import { Login } from './pages/login';
import { ThemeProvider } from './components/theme-provider';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  React.useEffect(() => {
    // Check authentication status when the component mounts
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    
    // Listen for storage events (in case user logs in/out in another tab)
    const handleStorageChange = () => {
      const newAuthStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(newAuthStatus);
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };
  
  return (
    <ThemeProvider>
      {isAuthenticated ? (
        <Layout onLogout={handleLogout}>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/service-stations" component={ServiceStations} />
            <Route path="/employees/add-new" component={EmployeesAddNew} />
            <Route path="/employees" component={Employees} />
            <Route path="/cars" component={Cars} />
            <Route path="/reports" component={Reports} />
            <Route path="/reviews" component={Reviews} />
          </Switch>
        </Layout>
      ) : (
        <Login />
      )}
    </ThemeProvider>
  );
};

export default App;
