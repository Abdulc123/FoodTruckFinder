import React from 'react';
import { View, Text, Switch, Pressable, TextInput } from 'react-native';
import { useProfile } from '../store.profile';

export default function ProfileScreen() {
  const { user, toggleHalal, setSpice, likeCuisine, updateName } = useProfile();

  return (
    <View style={{ flex:1, padding:16, gap:16 }}>
      <View style={{ alignItems:'center', gap:8 }}>
        <Text style={{ fontSize:24, fontWeight:'600' }}>Profile</Text>
        <TextInput
          value={user.displayName}
          onChangeText={updateName}
          placeholder="Your name"
          style={{ borderWidth:1, borderColor:'#ddd', borderRadius:8, padding:8, minWidth:220 }}
        />
        <Text>Points: {user.points} • Streak: {user.currentStreakDays}d</Text>
      </View>

      <View style={{ gap:8 }}>
        <Text style={{ fontSize:18, fontWeight:'600' }}>Preferences</Text>
        <View style={{ flexDirection:'row', alignItems:'center', gap:8 }}>
          <Text>Halal only</Text>
          <Switch value={user.preferences.halalOnly} onValueChange={toggleHalal} />
        </View>

        <View style={{ flexDirection:'row', gap:8, alignItems:'center' }}>
          <Text>Spice</Text>
          {[0,1,2,3].map(l => (
            <Pressable key={l} onPress={() => setSpice(l as 0|1|2|3)}>
              <Text style={{
                paddingHorizontal:10, paddingVertical:6, borderRadius:6,
                borderWidth:1, borderColor: user.preferences.spiceLevel===l ? '#333' : '#ddd'
              }}>{l}</Text>
            </Pressable>
          ))}
        </View>

        <View style={{ flexDirection:'row', gap:8, flexWrap:'wrap' }}>
          {['Tacos','Gyro','Biryani','Cheesesteak'].map(c => (
            <Pressable key={c} onPress={() => likeCuisine(c)}>
              <Text style={{
                paddingHorizontal:10, paddingVertical:6, borderRadius:999,
                borderWidth:1, marginTop:6,
                borderColor: user.preferences.likedCuisines.includes(c) ? '#333' : '#ddd'
              }}>{c}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={{ gap:8 }}>
        <Text style={{ fontSize:18, fontWeight:'600' }}>Badges</Text>
        <Text>{user.badges.length ? user.badges.join(' • ') : 'No badges yet'}</Text>
      </View>

      <View style={{ gap:8 }}>
        <Text style={{ fontSize:18, fontWeight:'600' }}>Visited</Text>
        <Text>{user.visitedTruckIds.slice(0,10).join(', ') || 'Nothing yet'}</Text>
      </View>
    </View>
  );
}
