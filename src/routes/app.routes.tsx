import { Details } from '../screens/Details';
import { Home } from '../screens/Home';
import { Register } from '../screens/Register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{
      headerShown: false,
      animation: "fade_from_bottom",
    }}
      initialRouteName='Home'
    >
      <Screen name="Details" component={Details} />
      <Screen name="Home" component={Home} />
      <Screen name="Register" component={Register} />
    </Navigator>
  )
}
