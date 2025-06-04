import React from 'react';
import { Button, ButtonGroup, Tooltip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useThemeContext } from './theme-provider';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useThemeContext();

  return (
    <ButtonGroup variant="flat">
      <Tooltip content="Світлий режим">
        <Button
          isIconOnly
          aria-label="Світлий режим"
          color={theme === 'light' ? 'primary' : 'default'}
          onPress={() => setTheme('light')}
        >
          <Icon icon="lucide:sun" width={20} />
        </Button>
      </Tooltip>
      
      <Tooltip content="Темний режим">
        <Button
          isIconOnly
          aria-label="Темний режим"
          color={theme === 'dark' ? 'primary' : 'default'}
          onPress={() => setTheme('dark')}
        >
          <Icon icon="lucide:moon" width={20} />
        </Button>
      </Tooltip>
      
      <Tooltip content="Режим комфорту для очей">
        <Button
          isIconOnly
          aria-label="Режим комфорту для очей"
          color={theme === 'comfort' ? 'primary' : 'default'}
          onPress={() => setTheme('comfort')}
        >
          <Icon icon="lucide:eye" width={20} />
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
};
