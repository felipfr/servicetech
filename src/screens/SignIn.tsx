import * as zod from "zod";
import auth from "@react-native-firebase/auth";
import logo from '../assets/logo_primary.webp'
import { Alert, Keyboard, Image, TouchableWithoutFeedback } from "react-native";
import { Box, Divider, Heading, HStack, Icon, KeyboardAvoidingView, Text, useTheme, VStack } from "native-base";
import { Button } from "../components/Button";
import { Envelope, Key } from "phosphor-react-native";
import { FormInput } from "../components/FormInput";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const signInValidationSchema = zod.object({
  email: zod
    .string({ required_error: "O e-mail é obrigatório" })
    .email("Digite um e-mail válido"),
  password: zod.string({ required_error: "A senha é obrigatória" }),
});

type SignInFormData = zod.infer<typeof signInValidationSchema>;

export const SignIn: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInValidationSchema),
  });

  async function handleSignIn({ email, password }: SignInFormData) {
    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      // .then((response) => {
      //   console.log(response);
      // })
      .catch((error) => {
        console.warn(error);
        setIsLoading(false);

        let alertTitle;
        let alertMessage;

        if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
          alertTitle = 'Ops! Dados inválidos';
          alertMessage = 'Verifique as suas credenciais e tente novamente.';
        }

        if (alertTitle && alertMessage) {
          return Alert.alert(alertTitle, alertMessage);
        }

        return Alert.alert('Erro', 'Não foi possivel fazer o login');

      });
  }

  function handleSignUp() {
    navigation.navigate("SignUp");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <Box flex={1} bg="blueGray.900">
        <KeyboardAvoidingView behavior="position" enabled>
          <VStack alignItems="center" px={8} pt={24}>

            <Image source={logo} style={{ width: 260, height: 140 }} />

            <Heading color="blueGray.100" fontSize="xl" mt={16} mb={6}>
              Acesse sua conta
            </Heading>

            <FormInput
              placeholder="E-mail"
              keyboardType="email-address"
              mb={4}
              InputLeftElement={
                <Icon ml={4} as={<Envelope color={colors.blueGray[300]} />} />
              }
              name="email"
              control={control}
              error={errors.email?.message}
            />

            <FormInput
              placeholder="Senha"
              secureTextEntry
              mb={8}
              InputLeftElement={
                <Icon ml={4} as={<Key color={colors.blueGray[300]} />} />
              }
              name="password"
              control={control}
              error={errors.password?.message}
            />

            <Button
              title="Entrar"
              w="full"
              mt={1}
              onPress={handleSubmit(handleSignIn)}
              isLoading={isLoading}
            />

            <Divider
              bg="blueGray.600"
              thickness="0.5"
              mt={4}
            />

            <Button
              variant="secondary"
              my={4}
              title="Não possui conta? Cadastre-se"
              w="full"
              onPress={handleSignUp}
            />
          </VStack>
        </KeyboardAvoidingView>
      </Box>
    </TouchableWithoutFeedback>
  );
};
