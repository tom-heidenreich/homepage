import { Container, Title, Text, useMantineTheme, Group, Space } from "@mantine/core";
import { useState } from "react";
import { ProfileConfig, SKillsConfig } from "../../modules/AppConfig";

export default function About() {
    return (
        <Container
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <AboutMe />
            <Skills />
        </Container>
    )
}

function AboutMe() {

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
                About me
            </Title>
            <Text
                weight={500}
                style={{
                    maxWidth: '30rem',
                }}
                align={'center'}
            >
                {ProfileConfig.bio}
            </Text>
        </>
    )
}

function Skills() {

    const theme = useMantineTheme();
    const primaryColor = theme.colors[theme.primaryColor]

    return (
        <>
            <Title
                mt='xl'
                color={primaryColor[3]}
                style={{
                    userSelect: 'none',
                }}
            >
                Skills
            </Title>
            <Container
                style={{
                    width: '30rem',
                }}
            >
                <LanguageSkills />
                <LibariesSkills />
                <Space h='xl' />
            </Container>
        </>
    )
}

function LanguageSkills() {
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
                SKillsConfig.languages.map((skill, index) => {
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

function LibariesSkills() {
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
                SKillsConfig.libaries_tools.map((skill, index) => {
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

type SkillWidgetProps = { name: string, icon: JSX.Element }
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
                {icon}
            </div>
            <Text>
                {name}
            </Text>
        </Group>
    )
}