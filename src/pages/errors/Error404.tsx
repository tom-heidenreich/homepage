import { Title, Text } from "@mantine/core";

export default function Error404() {
    return (
        <>
            <Title
                size='7rem'
                variant="gradient"
            >
                404
            </Title>
            <Text
                size={50}
                weight={700}
            >
                Not Found
            </Text>
        </>
    )
}