import { Title, Text, useMantineTheme, Group } from "@mantine/core";
import Project from "../../components/ProjectWidget";
import { ProfileConfig, ProjectsConfig } from "../../modules/AppConfig";
import MultilineString from "../../modules/MultilineString";

export default function Projects() {

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
                My Projects
            </Title>
            <Text
                style={{
                    maxWidth: '30rem',
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
                    maxWidth: '32rem',
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
        </>
    )
}