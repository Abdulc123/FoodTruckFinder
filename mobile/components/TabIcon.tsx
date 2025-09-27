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

  const getBackgroundColor = () => {
    if (focused) {
      return 'rgba(255,255,255,0.2)'; // Highlighted background
    }
    return 'transparent';
  };

  return (
    <View style={{
      backgroundColor: getBackgroundColor(),
      borderRadius: 12,
      padding: 6,
      minWidth: 40,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Text style={{ 
        fontSize: focused ? 22 : 18, 
        color: color,
        opacity: focused ? 1 : 0.7,
        fontWeight: focused ? 'bold' : 'normal',
      }}>
        {getIcon()}
      </Text>
    </View>
  );
};

export default TabIcon;
