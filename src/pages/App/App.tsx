import { Avatar, Container, Group, Text, useMantineTheme } from "@mantine/core";
import FormattedText from "../../modules/FormattedText";
import Project from "../../components/ProjectWidget";
import PrimaryTitle from "../../components/PrimaryTitle";
import SocialIcon from "../../components/SocialIcon";
import { useEffect, useState } from "react";
import { getRemoteConfig, getValue } from "firebase/remote-config";
import { FeaturedProjectsConfig, ProfileConfig, SocialsConfig } from "../../modules/AppConfig";

export default function App() {

    const [profileConfig, setProfileConfig] = useState<ProfileConfig | undefined>()
    const [featuredProjectsConfig, setFeaturedProjectsConfig] = useState<FeaturedProjectsConfig | undefined>()
    const [socialsConfig, setSocialsConfig] = useState<SocialsConfig | undefined>()

    useEffect(() => {
        const remoteConfig = getRemoteConfig()

        const rawProfile = getValue(remoteConfig, 'profile')
        if(!rawProfile.asString()) console.error(`Could not get value of 'profile'. Source: '${rawProfile.getSource()}'`) 
        else setProfileConfig(JSON.parse(rawProfile.asString()) as ProfileConfig)

        const rawFeaturedProjects = getValue(remoteConfig, 'featured_projects')
        if(!rawFeaturedProjects.asString()) console.error(`Could not get value of 'featured_projects'. Source: '${rawFeaturedProjects.getSource()}'`)
        else setFeaturedProjectsConfig(JSON.parse(rawFeaturedProjects.asString()) as FeaturedProjectsConfig)

        const rawSocials = getValue(remoteConfig, 'social')
        if(!rawSocials.asString()) console.error(`Could not get value of 'social'. Source: '${rawSocials.getSource()}'`)
        else setSocialsConfig(JSON.parse(rawSocials.asString()) as SocialsConfig)
    }, [])

    if(!profileConfig || !featuredProjectsConfig || !socialsConfig) return null

    return (
        <>
            <About profile={profileConfig} />
            <Featured featured_projects={featuredProjectsConfig} />
            <GetInTouch profile={profileConfig} socials={socialsConfig} />
        </>
    );
}

function About({ profile }: { profile: ProfileConfig }) {

    const theme = useMantineTheme();

    return (
        <Group
            mt='xl'
            align={'center'}
        >
            <Avatar
                src={profile.avatar}
                radius={100}
                size={150}
            />
            <Container
                m={0}
            >
                <PrimaryTitle
                    color={theme.colors.red_salsa[4]}
                >
                    {profile.name}
                </PrimaryTitle>
                <Text
                    weight={500}
                >
                    <FormattedText string={profile.short_bio} />
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

function Featured({ featured_projects }: { featured_projects: FeaturedProjectsConfig }) {
    return (
        <Widget
            title='Featured Projects'
        >
            <Group>
                {featured_projects.map(project => (
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

function GetInTouch({ profile, socials }: { profile: ProfileConfig, socials: SocialsConfig }) {
    return (
        <Widget
            title='Get In Touch'
        >
            <Text
                size='lg'
                align="center"
            >
                <FormattedText string={profile.get_in_touch} />
            </Text>
            <Socials socials={socials} />
        </Widget>
    )
}

function Socials({ socials }: { socials: SocialsConfig }) {
    return (
        <Group>
            {socials.map(social => {
                return <SocialIcon
                    key={social.name}
                    name={social.name}
                    icon={social.icon}
                    url={social.url}
                />
            })}
        </Group>
    )
}