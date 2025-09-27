import React from 'react';
import { BottomNavigation } from 'react-native-paper';

import MapScreen from './MapScreen';
import SearchScreen from './SearchScreen';
import ProfileScreen from './ProfileScreen';

export default function NavigationBar() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'map', title: 'Map' },
    { key: 'search', title: 'Search' },
    { key: 'profile', title: 'Profile' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    map: MapScreen,
    search: SearchScreen,
    profile: ProfileScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
