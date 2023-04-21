import { Center, Spinner } from 'native-base'

export default function Loading() {
  return (
    <Center flex={1} bg="blueGray.900">
      <Spinner color="green.600" size="lg" />
    </Center>
  )
}
