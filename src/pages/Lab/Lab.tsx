import { Container, Title, Text, useMantineTheme } from "@mantine/core";
import { useState } from "react";

export default function Lab() {

    const theme = useMantineTheme();
    const primaryColor = theme.colors[theme.primaryColor]

    return (
        <>
            <Title
                mb='md'
                color={primaryColor[3]}
                style={{
                    userSelect: 'none',
                }}
            >
                The Lab
            </Title>
            <Text
                weight={500}
            >
                Here are some small experiments. Try them out.
            </Text>
            <Container
                mt='md'
            >
                <ExperimentWidget
                    name='Bouncer'
                    description='See how a Neural Network works.'
                    url='/lab/bouncer'
                />
            </Container>
        </>
    )
}

type ExperimentWidgetProps = { name: string, description: string, url: string }
function ExperimentWidget({ name, description, url }: ExperimentWidgetProps) {

    const theme = useMantineTheme();

    const [hover, setHover] = useState(false);

    function handleClick() {
        window.location.href = url;
    }

    return (
        <Container
            style={{
                width: '20rem',
                userSelect: 'none',
                cursor: 'pointer',
                borderRadius: '1rem',
                backgroundColor: (
                    theme.colorScheme === 'dark'
                        ? (hover
                            ? theme.colors.dark[5]
                            : theme.colors.dark[6]
                        )
                        : (hover
                            ? theme.colors.gray[2]
                            : theme.colors.gray[1]
                        )
                ),
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handleClick}
            px='xl'
            py='md'
        >
            <Title
                size='1.2rem'
            >
                {name}
            </Title>
            <Text>
                {description}
            </Text>
        </Container>
    )
}