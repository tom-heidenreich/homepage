import { Container, Title, Text, useMantineTheme, Group } from "@mantine/core";
import Project from "../../components/ProjectWidget";
import { ProfileConfig, ProjectsConfig } from "../../modules/AppConfig";
import MultilineString from "../../modules/MultilineString";

export default function Projects() {

    const theme = useMantineTheme();
    const primaryColor = theme.colors[theme.primaryColor]

    return (
        <Container
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Title
                mb='md'
                color={primaryColor[3]}
                style={{
                    userSelect: 'none',
                }}
            >
                My Projects
            </Title>
            <Text
                style={{
                    maxWidth: '50%',
                }}
                weight={500}
                align={'center'}
            >
                <MultilineString string={ProfileConfig.project_desc} />
            </Text>
            <Group
                mt='xl'
                spacing='md'
                style={{
                    width: '60%',
                }}
            >
                {Object.keys(ProjectsConfig).map(project_id => {
                    // @ts-ignore - will never be undefined
                    const project = ProjectsConfig[project_id];
                    return (
                        <Project
                            key={project_id}
                            name={project.name}
                            short_desc={project.short_desc}
                            url={project.url}
                        />
                    )
                })}
            </Group>
        </Container>
    )
}