import React from 'react';
import { Card, CardBody, CardHeader, CardFooter, Divider, Input, Button, Link } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useHistory } from 'react-router-dom';
import { ThemeSwitcher } from '../components/theme-switcher';

export const Login: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const [error, setError] = React.useState('');
  const history = useHistory();

  // Admin credentials (in a real app, this would be handled securely on the server)
  const ADMIN_EMAIL = 'admin@carservice.com';
  const ADMIN_PASSWORD = 'admin123';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Simple admin authentication
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // In a real app, you would set a token in localStorage or cookies
      localStorage.setItem('isAuthenticated', 'true');
      window.location.href = '/'; // Force a full reload to update authentication state
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex justify-end p-4">
        <ThemeSwitcher />
      </div>
      
      <div className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col items-center gap-2 pb-0">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-100">
              <Icon icon="lucide:car" className="text-primary-500" width={32} />
            </div>
            <h1 className="text-2xl font-semibold">Car Service System</h1>
            <p className="text-default-500 text-center">Sign in to access the digital signage system</p>
          </CardHeader>
          
          <CardBody>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-danger-100 text-danger-500 p-2 rounded-medium text-small">
                  {error}
                </div>
              )}
              
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onValueChange={setEmail}
                startContent={<Icon icon="lucide:mail" className="text-default-400" width={18} />}
                isRequired
                description="Use admin@carservice.com for demo"
              />
              
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                value={password}
                onValueChange={setPassword}
                startContent={<Icon icon="lucide:lock" className="text-default-400" width={18} />}
                isRequired
                description="Use admin123 for demo"
              />
              
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="w-4 h-4 rounded border-default-300"
                  />
                  <span className="text-small">Remember me</span>
                </label>
                
                <Link href="#" size="sm" className="text-primary">
                  Forgot password?
                </Link>
              </div>
              
              <Button type="submit" color="primary" fullWidth>
                Sign In
              </Button>
            </form>
          </CardBody>
          
          <Divider />
          
          <CardFooter className="flex justify-center">
            <p className="text-small text-default-500">
              Don't have an account? <Link href="#" size="sm" className="text-primary">Contact administrator</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};