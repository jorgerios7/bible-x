import type { ComponentProps } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '../../constants/colors';
import { useAuthStore } from '../../store/authStore';
import { navigationTheme } from '../../theme';
import type { AuthStackParamList, MainTabParamList, RootStackParamList } from '../../types';
import { AIChatScreen } from '../../screens/AIChatScreen';
import { BibleScreen } from '../../screens/BibleScreen';
import { FavoritesScreen } from '../../screens/FavoritesScreen';
import { ForgotPasswordScreen } from '../../screens/ForgotPasswordScreen';
import { HomeScreen } from '../../screens/HomeScreen';
import { LoginScreen } from '../../screens/LoginScreen';
import { ProfileScreen } from '../../screens/ProfileScreen';
import { RegisterScreen } from '../../screens/RegisterScreen';
import { SearchScreen } from '../../screens/SearchScreen';
import { SettingsScreen } from '../../screens/SettingsScreen';
import { SplashScreen } from '../../screens/SplashScreen';
import { StudiesScreen } from '../../screens/StudiesScreen';
import { styles } from './styles';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const tabIcons: Record<keyof MainTabParamList, { active: IconName; inactive: IconName }> = {
  Home: { active: 'home-variant', inactive: 'home-variant-outline' },
  Bible: { active: 'book-open-page-variant', inactive: 'book-open-page-variant-outline' },
  Search: { active: 'text-search', inactive: 'text-search' },
  Studies: { active: 'school', inactive: 'school-outline' },
  Profile: { active: 'account-circle', inactive: 'account-circle-outline' },
};

const labels: Record<keyof MainTabParamList, string> = {
  Home: 'Home',
  Bible: 'Bíblia',
  Search: 'Pesquisa',
  Studies: 'Estudos',
  Profile: 'Perfil',
};

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </AuthStack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: true,
      tabBarActiveTintColor: colors.textPrimary,
      tabBarInactiveTintColor: colors.textDisabled,
      tabBarStyle: styles.tabBar,
      tabBarItemStyle: styles.tabBarItem,
      tabBarLabelStyle: styles.tabBarLabel,
      tabBarIcon: ({ focused, color, size }) => {
        const icon = tabIcons[route.name][focused ? 'active' : 'inactive'];
        return <MaterialCommunityIcons name={icon} size={size ?? 22} color={color} />;
      },
      tabBarLabel: labels[route.name],
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Bible" component={BibleScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Studies" component={StudiesScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export const AppNavigator = () => {
  const isInitializing = useAuthStore((state) => state.isInitializing);
  const firebaseUser = useAuthStore((state) => state.firebaseUser);

  return (
    <NavigationContainer theme={navigationTheme}>
      <RootStack.Navigator screenOptions={{ headerShown: false, contentStyle: styles.stackContent }}>
        {isInitializing ? (
          <RootStack.Screen name="Splash" component={SplashScreen} />
        ) : firebaseUser ? (
          <>
            <RootStack.Screen name="Main" component={MainTabs} />
            <RootStack.Screen name="AIChat" component={AIChatScreen} />
            <RootStack.Screen name="Favorites" component={FavoritesScreen} />
            <RootStack.Screen name="Settings" component={SettingsScreen} />
          </>
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
