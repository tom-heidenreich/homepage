import { useState } from "react";
import { ActionIcon, Avatar, Container, Group, Text, Title, Tooltip, useMantineTheme } from "@mantine/core";
import { FeaturedProjectsConfig, ProfileConfig, SocialConfig } from "../../modules/AppConfig";
import MultilineString from "../../modules/MultilineString";
import Project from "../../components/ProjectWidget";

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
                src={ProfileConfig.avatar}
                radius={100}
                size={150}
            />
            <Container
                m={0}
            >
                <Title
                    mb='md'
                    color={theme.colors.red_salsa[3]}
                    style={{
                        userSelect: 'none',
                    }}
                >
                    {ProfileConfig.name}
                </Title>
                <Text
                    weight={500}
                >
                    <MultilineString string={ProfileConfig.short_bio} />
                </Text>
            </Container>
        </Group>
    )
}

type WidgetProps = { children: React.ReactNode, title?: string }
function Widget({ children, title }: WidgetProps) {

    const theme = useMantineTheme();
    const primaryColor = theme.colors[theme.primaryColor]

    return (
        <Group
            my='2.5rem'
            style={{
                flexDirection: 'column',
            }}
        >
            {title ? (
                <Title
                    size='1.5rem'
                    color={primaryColor[3]}
                    style={{
                        userSelect: 'none',
                    }}
                >
                    {title}
                </Title>
            ) : null}
            {children}
        </Group>
    )
}

function Featured() {
    return (
        <Widget
            title='Featured Projects'
        >
            <Group>
                {FeaturedProjectsConfig.map(project => (
                    <Project
                        name={project.name}
                        short_desc={project.short_desc}
                        url={project.url}
                    />
                ))}
            </Group>
        </Widget>
    )
}

function GetInTouch() {
    return (
        <Widget
            title='Get In Touch'
        >
            <Text
                size='lg'
                align="center"
            >
                <MultilineString string={ProfileConfig.get_in_touch} />{' '}
                <DiscordLink />.
            </Text>
            <Socials />
        </Widget>
    )
}

function DiscordLink() {

    const social_discord = SocialConfig.discord;

    function handleClick() {
        window.location.href = social_discord.url;
    }

    return (
        <Text
            component="span"
            color={'#5865F2'}
            onClick={handleClick}
            weight={700}
            style={{
                cursor: 'pointer',
            }}
        >
            {social_discord.name}
        </Text>
    )
}

function Socials() {
    return (
        <Group>
            {Object.keys(SocialConfig).map(social => {
                // @ts-ignore - will never be undefined
                const social_config = SocialConfig[social];
                return <SocialIcon
                    name={social_config.name}
                    icon={social_config.icon}
                    url={social_config.url}
                />
            })}
        </Group>
    )
}

type SocialIconProps = { name: string, icon: JSX.Element, url: string }
function SocialIcon({ name, icon, url }: SocialIconProps) {

    const theme = useMantineTheme();
    const primaryColor = theme.colors[theme.primaryColor]

    const [hover, setHover] = useState(false);

    function handleClick() {
        window.location.href = url;
    }

    return (
        <Tooltip 
            label={name} 
            withArrow
            openDelay={500}
            transition='slide-up'
        >
            <ActionIcon
                onClick={handleClick}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                    color: (hover
                        ? primaryColor[3]
                        : undefined
                    )
                }}
            >
                {icon}
            </ActionIcon>
        </Tooltip>
    )
}