import React from 'react';
import { Button, ButtonGroup, Tooltip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useThemeContext } from './theme-provider';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useThemeContext();

  return (
    <ButtonGroup variant="flat">
      <Tooltip content="Light Mode">
        <Button
          isIconOnly
          aria-label="Light Mode"
          color={theme === 'light' ? 'primary' : 'default'}
          onPress={() => setTheme('light')}
        >
          <Icon icon="lucide:sun" width={20} />
        </Button>
      </Tooltip>
      
      <Tooltip content="Dark Mode">
        <Button
          isIconOnly
          aria-label="Dark Mode"
          color={theme === 'dark' ? 'primary' : 'default'}
          onPress={() => setTheme('dark')}
        >
          <Icon icon="lucide:moon" width={20} />
        </Button>
      </Tooltip>
      
      <Tooltip content="Eye Comfort Mode">
        <Button
          isIconOnly
          aria-label="Eye Comfort Mode"
          color={theme === 'comfort' ? 'primary' : 'default'}
          onPress={() => setTheme('comfort')}
        >
          <Icon icon="lucide:eye" width={20} />
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
};