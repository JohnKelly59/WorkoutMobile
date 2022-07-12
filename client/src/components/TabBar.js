// import React, { useState, useEffect } from "react";
// import { createNavigator, TabRouter } from 'react-navigation'
// import BottomNavigation, {
//     FullTab
//   } from 'react-native-material-bottom-navigation'
// import Icon from '@expo/vector-icons/MaterialCommunityIcons'

//   const TabBar = (props) => {

//     const [activeTab, setActiveTab] = useState("home");

//   tabs = [
//       {
//         key: 'home',
//         icon: 'home',
//         label: 'Home',
//         barColor: '#388E3C',
//         pressColor: 'rgba(255, 255, 255, 0.16)'
//       },
//       {
//         key: 'favorites',
//         icon: 'favorites',
//         label: 'Favorites',
//         barColor: '#B71C1C',
//         pressColor: 'rgba(255, 255, 255, 0.16)'
//       },
//       {
//         key: 'random',
//         icon: 'random-workout',
//         label: 'Random Workout',
//         barColor: '#E64A19',
//         pressColor: 'rgba(255, 255, 255, 0.16)'
//       },
//       {
//           key: 'search',
//           icon: 'search',
//           label: 'Search',
//           barColor: '#388E3C',
//           pressColor: 'rgba(255, 255, 255, 0.16)'
//         },
//         {
//           key: 'more',
//           icon: 'more',
//           label: 'More',
//           barColor: '#E64A19',
//           pressColor: 'rgba(255, 255, 255, 0.16)'
//         }
//     ]
//     const { navigation, descriptors } = props
//     const { routes, index } = navigation.state
//     const activeScreenName = routes[index].key
//     const descriptor = descriptors[activeScreenName]

//       renderIcon = icon => ({ isActive }) => (
//         <Icon size={24} color="white" name={icon} />
//       )

//       renderTab = ({ tab, isActive }) => (
//         <FullTab
//           isActive={isActive}
//           key={tab.key}
//           label={tab.label}
//           renderIcon={renderIcon(tab.icon)}
//         />
//       )
//         return (
//           <View style={{ flex: 1 }}>
//             <View style={{ flex: 1 }}>
//             <ActiveScreen navigation={descriptor.navigation} />
//             </View>
//             <BottomNavigation
//               tabs={tabs}
//               activeTab={activeTab}
//               onTabPress={newTab => setState({ activeTab: newTab.key })}
//               renderTab={renderTab}
//             />
//           </View>
//         )
//   }

//   const AppTabRouter = TabRouter({
//     Home: { screen: Home },
//     Favorites: { screen: Favorites },
//     Random: { screen: Random },
//     Search: { screen: Search},
//     More: { screen: More},
//   })

//   const AppNavigator = createNavigator(TabBar, AppTabRouter, {})

//   export default AppNavigator
