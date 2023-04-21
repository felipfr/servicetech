import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export function Register() {
  const [client, setClient] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  function generateRandomCallId() {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
  }

  function handleNewOrderRegister() {
    setIsLoading(true);

    const callId = generateRandomCallId();

    firestore()
      .collection('calls')
      .add({
        call_number: `P2${callId}`,
        client,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("", "Chamado aberto com sucesso!");
        navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
        return Alert.alert("Ops!", "Não foi possível abrir o seu chamado, tente novamente.");
      });

  }

  return (
    <VStack flex={1} p={6} bg="blueGray.900">
      <Header title="Novo Chamado" />

      <Input
        placeholder="Nome do Cliente"
        mt={4}
        value={client}
        onChangeText={setClient}
      />

      <Input
        placeholder="Descrição do Problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        value={description}
        onChangeText={setDescription}
      />

      <Button
        title="Abrir Chamado"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrderRegister}
        isDisabled={!client || !description ? true : false}
      />

    </VStack>
  );
}
