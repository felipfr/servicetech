import Loading from '../components/Loading';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import logo from '../assets/logo_secondary.webp'
import { Alert, Image } from 'react-native';
import { Button } from '../components/Button';
import { Call, CallProps } from '../components/Call';
import { Filter } from '../components/Filter';
import { SignOut, ChatTeardropText } from 'phosphor-react-native';
import { VStack, HStack, IconButton, useTheme, Text, Heading, FlatList, Center } from 'native-base';
import { dateFormat } from '../utils/firestoreDateFormat';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

export function Home() {
  const [calls, setCalls] = useState<CallProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
  const navigation = useNavigation();

  const { colors } = useTheme();

  function handleNewOrder() {
    navigation.navigate("Register");
  }

  function handleOpenDetails(callId: string) {
    navigation.navigate("Details", { callId });
  }

  function handleLogout() {
    auth()
      .signOut()
      .catch(error => {
        console.log(error);
        return Alert.alert('Sair', 'Não foi possível sair da aplicação.');
      });
  }

  useEffect(() => {
    setIsLoading(true);

    const subscriber = firestore()
      .collection('calls')
      .where('status', '==', statusSelected)
      // .orderBy('created_at', 'asc')
      .onSnapshot(snapshot => {
        try {
          const data = snapshot.docs.map(doc => {
            const { call_number, client, status, description, created_at, closed_at } = doc.data();

            return {
              id: doc.id,
              call_number,
              client,
              description,
              status,
              when: dateFormat(created_at),
              closed: dateFormat(closed_at)
            }
          });

          setCalls(data);
          setIsLoading(false);
        } catch (error) {
          console.warn('Erro ao ler dados do Firestore: ', error);
        }
      });

    return subscriber;

  }, [statusSelected]);

  return (
    <VStack flex={1} bg="blueGray.900" pb={6}>
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="blueGray.900"
        pt={12}
        pb={5}
        px={6}
      >

        <Image source={logo} style={{ width: 200, height: 50 }} />

        <IconButton
          icon={<SignOut size={26} color={colors.blueGray[300]} />}
          onPress={handleLogout}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >

          <Heading color="blueGray.50">
            Chamados
          </Heading>

          <Text color="blueGray.200">
            {calls.length}
          </Text>
        </HStack>
        <HStack space={3} mb={5}>
          <Filter
            type="open"
            title="Abertos"
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />

          <Filter
            type="closed"
            title="Fechados"
            onPress={() => setStatusSelected('closed')}
            isActive={statusSelected === 'closed'}
          />
        </HStack>

        {
          isLoading ? <Loading />
            :
            <FlatList
              data={calls}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <Call data={item} onPress={() => handleOpenDetails(item.id)} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
              ListEmptyComponent={() => (
                <Center mt={150}>
                  <ChatTeardropText color={colors.blueGray[300]} size={40} />
                  <Text color="blueGray.300" fontSize="xl" mt={3} textAlign="center">
                    Você não possui {'\n'}
                    chamados {statusSelected === 'open' ? 'abertos' : 'fechados'}
                  </Text>
                </Center>
              )}
            />}

        <Button
          title="Novo Chamado"
          mt={3}
          onPress={handleNewOrder}
        />

      </VStack>
    </VStack>
  );
}
