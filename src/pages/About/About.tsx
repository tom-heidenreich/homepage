import { Container, Title, Text, useMantineTheme, Group, Space } from "@mantine/core";
import { getRemoteConfig, getValue } from "firebase/remote-config";
import { useEffect, useState } from "react";
import PrimaryTitle from "../../components/PrimaryTitle";
import { ProfileConfig, SkillsLanguages, SkillsLibariesTools } from "../../modules/AppConfig";
import FormattedText from "../../modules/FormattedText";
import IconProvider from "../../modules/IconProvider";

export default function About() {

    const [profileConfig, setProfileConfig] = useState<ProfileConfig | undefined>()
    const [skillsLangConfig, setSkillsLangConfig] = useState<SkillsLanguages | undefined>()
    const [skillsLibConfig, setSkillsLibConfig] = useState<SkillsLibariesTools | undefined>()

    useEffect(() => {
        const remoteConfig = getRemoteConfig()

        const rawProfile = getValue(remoteConfig, 'profile')
        if(!rawProfile.asString()) console.error(`Could not get value of 'profile'. Source: '${rawProfile.getSource()}'`) 
        else setProfileConfig(JSON.parse(rawProfile.asString()) as ProfileConfig)

        const rawSkillLang = getValue(remoteConfig, 'skills_languages')
        if(!rawSkillLang.asString()) console.error(`Could not get value of 'skills_languages'. Source: '${rawSkillLang.getSource()}'`)
        else setSkillsLangConfig(JSON.parse(rawSkillLang.asString()) as SkillsLanguages)

        const rawSkillLib = getValue(remoteConfig, 'skills_lib')
        if(!rawSkillLib.asString()) console.error(`Could not get value of 'skills_lib'. Source: '${rawSkillLib.getSource()}'`)
        else setSkillsLibConfig(JSON.parse(rawSkillLib.asString()) as SkillsLibariesTools)
    }, [])

    if(!profileConfig || !skillsLangConfig || !skillsLibConfig) return null;

    return (
        <>
            <AboutMe profile={profileConfig} />
            <Skills lang={skillsLangConfig} lib={skillsLibConfig} />
        </>
    )
}

function AboutMe({ profile }: { profile: ProfileConfig }) {
    return (
        <>
            <PrimaryTitle>
                About me
            </PrimaryTitle>
            <Text
                weight={500}
                style={{
                    maxWidth: '30rem',
                }}
                align={'center'}
            >
                <FormattedText string={profile.bio} />
            </Text>
        </>
    )
}

function Skills({ lang, lib }: { lang: SkillsLanguages, lib: SkillsLibariesTools}) {
    return (
        <>
            <Space h='xl' />
            <PrimaryTitle>
                Skills
            </PrimaryTitle>
            <Container
                style={{
                    width: '30rem',
                }}
            >
                <LanguageSkills lang={lang} />
                <LibariesSkills lib={lib} />
                <Space h='xl' />
            </Container>
        </>
    )
}

function LanguageSkills({ lang }: { lang: SkillsLanguages }) {
    return (
        <>
            <Title
                style={{
                    userSelect: 'none',
                }}
                mt='md'
                order={2}
                color='dimmed'
            >
                Languages
            </Title>
            {
                lang.map((skill, index) => {
                    return <SkillWidget
                        name={skill.name}
                        icon={skill.icon}
                        key={index}
                    />
                })
            }
        </>
    )
}

function LibariesSkills({ lib }: { lib: SkillsLibariesTools }) {
    return (
        <>
            <Title
                style={{
                    userSelect: 'none',
                }}
                mt='lg'
                order={2}
                color='dimmed'
            >
                Libaries and Tools
            </Title>
            {
                lib.map((skill, index) => {
                    return <SkillWidget
                        name={skill.name}
                        icon={skill.icon}
                        key={index}
                    />
                })
            }
        </>
    )
}

type SkillWidgetProps = { name: string, icon: string }
function SkillWidget({ name, icon }: SkillWidgetProps) {

    const [hover, setHover] = useState(false);

    const theme = useMantineTheme();

    return (
        <Group
            my='xs'
            style={{
                maxWidth: '80%',
                userSelect: 'none',
                cursor: 'pointer',
                borderRadius: '1rem',
                backgroundColor: (
                    hover
                        ? (theme.colorScheme === 'dark'
                            ? theme.colors.dark[4]
                            : theme.colors.gray[1]
                        )
                        : undefined
                )
            }}
            p='xs'
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div
                style={{
                    width: '2rem',
                    height: '2rem',
                }}
            >
                <IconProvider icon={icon} />
            </div>
            <Text>
                {name}
            </Text>
        </Group>
    )
}