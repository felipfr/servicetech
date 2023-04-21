import Loading from '../components/Loading';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import { Button } from '../components/Button';
import { CallDetails } from '../components/CallDetails';
import { CallProps } from '../components/Call';
import { CircleWavyCheck, Hourglass, Buildings, ClipboardText } from 'phosphor-react-native';
import { DeleteButton } from '../components/DeleteButton';
import { HStack, VStack, useTheme, Text, ScrollView, Box } from 'native-base';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { OrderFirestoreDTO } from '../DTOs/OrderFirestoreDTO';
import { dateFormat } from '../utils/firestoreDateFormat';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

type RouteParams = {
  callId: string;
}

type CallDetails = CallProps & {
  description: string;
  solution: string;
  closed: string;
}

export function Details() {
  const [call, setCall] = useState<CallDetails>({} as CallDetails);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [solution, setSolution] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { callId } = route.params as RouteParams;
  const { colors } = useTheme();

  function handleCallClose() {
    firestore()
      .collection<OrderFirestoreDTO>('calls')
      .doc(callId)
      .update({
        status: 'closed',
        solution,
        closed_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert('', 'Chamado fechado com sucesso!');
        navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Ops!', 'Não foi possível encerrar o chamado, tente novamente.');
      });
  }

  function handleCallDelete() {
    Alert.alert(
      '',
      'Tem certeza que deseja excluir este chamado?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: () => {
            firestore()
              .collection<OrderFirestoreDTO>('calls')
              .doc(callId)
              .delete()
              .then(() => {
                Alert.alert('', 'Chamado excluído com sucesso!');
                navigation.goBack();
              })
              .catch(err => {
                console.log(err);
                Alert.alert('Ops!', 'Não foi possível excluir o chamado, tente novamente.');
              });
          }
        }
      ]
    );
  }

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>('calls')
      .doc(callId)
      .get()
      .then((doc) => {
        const { call_number, client, description, status, created_at, closed_at, solution } = doc.data();

        const closed = closed_at ? dateFormat(closed_at) : null;

        setCall({
          id: doc.id,
          call_number,
          client,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed
        });

        setIsLoading(false);

      });

  }, []);

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bg="blueGray.900">
      <Box px={6} bg="blueGray.900">
        <Header title={`Chamado: ${call.call_number}`} />
      </Box>

      <HStack
        bg={call.status === 'closed' ? colors.green[600] : colors.info[500]}
        justifyContent="center"
        p={4}>

        {
          call.status === 'closed'
            ? <CircleWavyCheck size={22} color={colors.green[100]} />
            : <Hourglass size={22} color={colors.info[100]} />
        }

        <Text
          fontSize="sm"
          color={call.status === 'closed' ? colors.green[100] : colors.info[100]}
          ml={2}
          textTransform="uppercase"
        >
          {call.status == 'closed' ? 'Fechado' : 'Aberto'}
        </Text>
      </HStack>

      <ScrollView
        mx={5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 24
        }}
      >
        <CallDetails
          title="Cliente"
          description={`${call.client}`}
          icon={Buildings}
        />
        <CallDetails
          title="Descrição do Problema"
          description={call.description}
          icon={ClipboardText}
          footer={`Aberto em ${call.when}`}
        />
        <CallDetails
          title="Solução"
          icon={CircleWavyCheck}
          description={call.solution}
          footer={call.closed && `Fechado em ${call.closed}`}
        >
          {
            call.status === 'open' &&
            <Input
              h={32}
              bg="blueGray.700"
              color="blueGray.100"
              onChangeText={setSolution}
              textAlignVertical="top"
              multiline
            />
          }
        </CallDetails>
      </ScrollView>

      {
        call.status === 'open' ?
          <Button
            title='Fechar Chamado'
            onPress={handleCallClose}
            isLoading={isUpdateLoading}
            m={5}
            isDisabled={!solution ? true : false}
          /> :
          <DeleteButton
            title='Excluir Chamado'
            onPress={handleCallDelete}
            isLoading={isUpdateLoading}
            m={5}
          />
      }
    </VStack>
  );
}
