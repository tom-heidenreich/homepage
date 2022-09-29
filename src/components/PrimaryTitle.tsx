import { Title, useMantineTheme } from "@mantine/core";

export default function PrimaryTitle({ children, color }: { children: React.ReactNode, color?: string }) {

    const theme = useMantineTheme();
    const primaryColor = theme.colors[theme.primaryColor][4]

    return (
        <Title
            mb='md'
            style={{
                userSelect: 'none',
                textDecoration: 'underline',
                textDecorationColor: color || primaryColor,
            }}
        >
            {children}
        </Title>
    )
}