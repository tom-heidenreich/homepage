import { Title, useMantineTheme } from "@mantine/core";

export default function PrimaryTitle({ children, color }: { children: React.ReactNode, color?: string }) {

    const theme = useMantineTheme();
    const primaryColor = theme.colors[theme.primaryColor][4]

    return (
        <Title
            mb='md'
            style={{
                userSelect: 'none',
                borderBottom: `2px solid ${color || primaryColor}`,
                borderRadius: '2px'
            }}
        >
            {children}
        </Title>
    )
}