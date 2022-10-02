import { Avatar, Container, Group, Text, useMantineTheme } from "@mantine/core";
import { FeaturedProjectsConfig, ProfileConfig, SocialConfig } from "../../modules/AppConfig";
import FormattedText from "../../modules/FormattedText";
import Project from "../../components/ProjectWidget";
import PrimaryTitle from "../../components/PrimaryTitle";
import SocialIcon from "../../components/SocialIcon";

export default function App() {
    return (
        <>
            <About />
            <Featured />
            <GetInTouch />
        </>
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
                <PrimaryTitle
                    color={theme.colors.red_salsa[4]}
                >
                    {ProfileConfig.name}
                </PrimaryTitle>
                <Text
                    weight={500}
                >
                    <FormattedText string={ProfileConfig.short_bio} />
                </Text>
            </Container>
        </Group>
    )
}

type WidgetProps = { children: React.ReactNode, title?: string }
function Widget({ children, title }: WidgetProps) {
    return (
        <Group
            my='4.5rem'
            style={{
                flexDirection: 'column',
            }}
        >
            {title ? (
                <PrimaryTitle>
                    {title}
                </PrimaryTitle>
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
                        key={project.name}
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
                <FormattedText string={ProfileConfig.get_in_touch} />{' '}
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
                    key={social_config.name}
                    name={social_config.name}
                    icon={social_config.icon}
                    url={social_config.url}
                />
            })}
        </Group>
    )
}