import Loading from './src/components/Loading';
import { AuthContextProvider } from "./src/contexts/AuthContext";
import { NativeBaseProvider, StatusBar } from 'native-base';
import { Routes } from './src/routes';
import { THEME } from './src/styles/theme';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>

      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />

      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>

    </NativeBaseProvider>
  );
}
