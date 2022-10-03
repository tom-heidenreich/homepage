import { Text, Group } from "@mantine/core";
import { getRemoteConfig, getValue } from "firebase/remote-config";
import { useEffect, useState } from "react";
import PrimaryTitle from "../../components/PrimaryTitle";
import Project from "../../components/ProjectWidget";
import { ProfileConfig, ProjectsConfig } from "../../modules/AppConfig";
import FormattedText from "../../modules/FormattedText";

export default function Projects() {

    const [profileConfig, setProfileConfig] = useState<ProfileConfig | undefined>()
    const [projectsConfig, setProjectsConfig] = useState<ProjectsConfig | undefined>()

    useEffect(() => {
        const remoteConfig = getRemoteConfig()

        const rawProfile = getValue(remoteConfig, 'profile')
        if(!rawProfile.asString()) console.error(`Could not get value of 'profile'. Source: '${rawProfile.getSource()}'`) 
        else setProfileConfig(JSON.parse(rawProfile.asString()) as ProfileConfig)

        const rawProjects = getValue(remoteConfig, 'projects')
        if(!rawProjects.asString()) console.error(`Could not get value of 'projects'. Source: '${rawProjects.getSource()}'`)
        else setProjectsConfig(JSON.parse(rawProjects.asString()) as ProjectsConfig)
    }, [])

    if(!profileConfig || !projectsConfig) return null

    return (
        <>
            <PrimaryTitle>
                My Projects
            </PrimaryTitle>
            <Text
                style={{
                    maxWidth: '30rem',
                }}
                weight={500}
                align={'center'}
            >
                <FormattedText string={profileConfig.project_desc} />
            </Text>
            <Group
                mt='xl'
                spacing='md'
                style={{
                    maxWidth: '32rem',
                }}
            >
                {projectsConfig.map((project, index) => {
                    return (
                        <Project
                            key={index}
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