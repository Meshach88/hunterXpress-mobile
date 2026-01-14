import { Stack, StackScreen } from "expo-router";

export default function Layout () {
    return <Stack>
        <StackScreen name='welcome' options={{ title: 'Home', headerShown: false}} ></StackScreen>
    </Stack>
}