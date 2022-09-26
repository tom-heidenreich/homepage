import { Avatar, Container, Group, Text, Title, useMantineTheme } from "@mantine/core";
import { useState } from "react";

export default function App() {
    return (
        <Container
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <About />
            <Featured />
            <GetInTouch />
        </Container>
    );
}

function About() {

    const theme = useMantineTheme();

    return (
        <Group
            mt='xl'
            align={'center'}
        >
            <Avatar
                src='/images/avatar.png'
                radius={100}
                size={150}
            />
            <Container
                m={0}
            >
                <Title
                    mb='md'
                    color={theme.colors.red_salsa[3]}
                >
                    Tom Heidenreich
                </Title>
                <Text>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br />
                    Ipsam corporis magnam voluptatem molestiae cupiditate
                </Text>
            </Container>
        </Group>
    )
}

function Featured() {

    const theme = useMantineTheme();

    return (
        <Group
            mt='xl'
            style={{
                flexDirection: 'column',
            }}
        >
            <Title
                size='1.5rem'
                color={theme.colors.fire_opal[3]}
            >
                Featured Projects
            </Title>
            <Group>
                <Project
                    name='Project 1'
                    short_desc='Lorem ipsum dolor sit amet.'
                />
                <Project
                    name='Project 2'
                    short_desc='Lorem ipsum dolor sit amet.'
                />
            </Group>
        </Group>
    )
}

type ProjectProps = { name: string, short_desc: string }
function Project({ name, short_desc }: ProjectProps) {

    const theme = useMantineTheme();

    const [hover, setHover] = useState(false);

    return (
        <Container
            style={{
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
            px='xl'
            py='md'
        >
            <Title
                size='1.2rem'
            >
                {name}
            </Title>
            <Text>
                {short_desc}
            </Text>
        </Container>
    )
}

function GetInTouch() {

    const theme = useMantineTheme();

    return (
        <Group
            mt='xl'
            style={{
                flexDirection: 'column',
            }}
        >
            <Title
                size='1.5rem'
                color={theme.colors.fire_opal[3]}
            >
                Get In Touch
            </Title>
            <Text
                size='lg'
                align="center"
            >
                I'm open to collab on small projects. <br />
                You can contact me via {' '}
                <DiscordLink />
            </Text>
        </Group>
    )
}

function DiscordLink() {

    function handleClick() {
        window.location.href = 'https://discord.com/users/411165035184914432';
    }

    return (
        <Text
            component="span"
            color={'#5865F2'}
            onClick={handleClick}
        >
            Discord
        </Text>
    )
}