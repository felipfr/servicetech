import { Box, HStack, Text, useTheme, VStack, Circle, Pressable, IPressableProps } from 'native-base';
import { ClockAfternoon, Hourglass, CircleWavyCheck } from 'phosphor-react-native';

export type CallProps = {
  call_number: string;
  client: string;
  closed: string;
  id: string;
  status: string;
  when: string;
}

type Props = IPressableProps & {
  data: CallProps;
}

export function Call({ data, ...rest }: Props) {
  const { colors } = useTheme();

  const statusColor = data.status === 'open' ? colors.info[500] : colors.green[300];

  return (
    <Pressable {...rest}>
      <HStack
        bg="blueGray.800"
        mb={4}
        alignItems="center"
        justifyContent="space-between"
        rounded="sm"
        overflow="hidden"
      >
        <Box h="full" w={2} bg={statusColor} />

        <VStack flex={1} my={5} ml={5}>
          <Text color={statusColor} fontSize="xs">
            # {data.call_number}
          </Text>

          <Text color="white" fontSize="md">
            {data.client}
          </Text>

          <HStack alignItems="center">
            <ClockAfternoon size={15} color={colors.blueGray[300]} />
            <Text color="blueGray.200" fontSize="xs" ml={1}>
              {data.status === 'closed'
                ? data.closed
                : data.when
              }
            </Text>
          </HStack>
        </VStack>

        <Circle bg="blueGray.700" h={12} w={12} mr={5}>
          {
            data.status === 'closed'
              ? <CircleWavyCheck size={24} color={statusColor} />
              : <Hourglass size={24} color={statusColor} />
          }
        </Circle>
      </HStack>
    </Pressable>
  );
}
