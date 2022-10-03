export type ProjectConfig = {
    name: string,
    short_desc: string,
    url: string
}

export type ProjectsConfig = ProjectConfig[]

export type FeaturedProjectsConfig = ProjectConfig[]

export type SocialsConfig = {
    name: string,
    url: string,
    icon: string
}[]

export type ProfileConfig = {
    name: string,
    avatar: string,
    short_bio: string,
    bio: string,
    project_desc: string,
    get_in_touch: string
}

export type SkillsLanguages = {
    name: string,
    icon: string
}[]

export type SkillsLibariesTools = {
    name: string,
    icon: string
}[]