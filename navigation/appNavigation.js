import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from '../screens/Homescreen';
import Moviescreen from '../screens/Moviescreen';
import PersonScreen from '../screens/personscreen';
import Searchscreen from '../screens/Searchscreen';
import { theme } from '../thems';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.background }
          }}
          component={Homescreen}
        />
        <Stack.Screen
          name="Movie"
          options={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.background }
          }}
          component={Moviescreen}
        />
        <Stack.Screen
          name="Person"
          options={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.background }
          }}
          component={PersonScreen}
        />
        <Stack.Screen
          name="Search"
          options={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.background }
          }}
          component={Searchscreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
