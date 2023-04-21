import { CaretLeft } from 'phosphor-react-native';
import { Heading, HStack, IconButton, StyledProps, useTheme } from 'native-base';
import { useNavigation } from '@react-navigation/native';

type Props = StyledProps & {
  title: string;
}

export function Header({ title, ...rest }: Props) {
  const { colors } = useTheme();
  const { goBack } = useNavigation();

  return (
    <HStack w="full" justifyContent="space-between" alignItems="center" bg="blueGray.900" pb={6} pt={12} {...rest}>
      <IconButton
        icon={<CaretLeft color={colors.blueGray[200]} size={24} />}
        onPress={goBack}
      />

      <Heading flex={1} color="blueGray.100" textAlign="center" fontSize="lg" ml={-6}>
        {title}
      </Heading>

    </HStack>
  );
}
