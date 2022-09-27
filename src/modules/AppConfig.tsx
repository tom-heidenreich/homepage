import { IconBrandDiscord, IconBrandGithub } from "@tabler/icons";

export const ProfileConfig = {
    "name": "Tom Heidenreich",
    "avatar": "/images/avatar.png",
    "short_bio": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. \nIpsam corporis magnam voluptatem molestiae cupiditate",
    "bio": "",
}

export const SocialConfig = {
    "github": {
        "name": "Github",
        "url": "https://github.com/tom-heidenreich",
        "icon": <IconBrandGithub />
    },
    "discord": {
        "name": "Discord",
        "url": "https://discord.com/users/411165035184914432",
        "icon": <IconBrandDiscord />
    }
}

export const ProjectsConfig = {
    "project-1": {
        "name": "Project 1",
        "short_desc": "This is a project",
        "url": ""
    },
    "project-2": {
        "name": "Project 2",
        "short_desc": "This is another project",
        "url": ""
    },
    "project-3": {
        "name": "Project 3",
        "short_desc": "This is yet another project",
        "url": ""
    }
}

export const FeaturedProjectsConfig = [
    ProjectsConfig["project-1"],
    ProjectsConfig["project-2"],
]