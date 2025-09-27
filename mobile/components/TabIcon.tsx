import React from 'react';
import { Text, View } from 'react-native';

interface TabIconProps {
  iconName: string;
  focused: boolean;
  color: string;
}

const TabIcon: React.FC<TabIconProps> = ({ iconName, focused, color }) => {
  const getIcon = () => {
    switch (iconName) {
      case 'map':
        return '🗺️';
      case 'search':
      case 'magnify':
        return '🔍';
      case 'profile':
      case 'account':
        return '👤';
      default:
        return '❓';
    }
  };

  return (
    <Text style={{ 
      fontSize: focused ? 22 : 18, 
      color: color,
      opacity: focused ? 1 : 0.7,
      fontWeight: focused ? 'bold' : 'normal',
    }}>
      {getIcon()}
    </Text>
  );
};

export default TabIcon;
