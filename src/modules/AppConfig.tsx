import { IconBrandDiscord, IconBrandGithub } from "@tabler/icons";
import Icons from '../components/icons/Icons';

export const ProfileConfig = {
    "name": "Tom Heidenreich",
    "avatar": "/images/avatar.png",
    "short_bio": "I'm a hobby developer, mostly building web apps.\n I'm always learning new things and testing new things.",
    "bio": "Hi, I'm Tom, a hobby developer from Germany. I like to build stuff with React, Typescript, or Go. At the moment, I'm really into machine learning. I started programming at 13 years old, and I'm still learning new things (thanks to Fireship). Currently, I'm a student, but I want to work as a developer someday.",
    "project_desc": "You can find my projects on Github. Usually I work on web apps, but I also experiment with other stuff like machine learning.",
    "get_in_touch": "I'm open to small collaborations. \nYou can contact me via "
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
    "homepage": {
        "name": "Homepage",
        "short_desc": "My personal website",
        "url": ""
    },
    "schulshop": {
        "name": "Schulshop",
        "short_desc": "My school project",
        "url": ""
    },
    "docker-remote-ui": {
        "name": "Docker Remote UI",
        "short_desc": "Docker Web UI",
        "url": ""
    }
}

export const FeaturedProjectsConfig = [
    ProjectsConfig.homepage,
    ProjectsConfig.schulshop,
]

export const SKillsConfig = {
    "languages": [
        {
            "name": "Typescript",
            "icon": <Icons.Typescript />
        },
        {
            "name": "Javascript",
            "icon": <Icons.Javascript />
        },
        {
            "name": "Python",
            "icon": <Icons.Python />
        },
        {
            "name": "Go",
            "icon": <Icons.Golang />
        },
        {
            "name": "Java",
            "icon": <Icons.Java />
        }
    ],
    "libaries_tools": [
        {
            "name": "React",
            "icon": <Icons.React />
        },
        {
            "name": "Next.js",
            "icon": <Icons.Next />
        },
        {
            "name": "Docker",
            "icon": <Icons.Docker />
        },
        {
            "name": "Tensorflow",
            "icon": <Icons.Tensorflow />
        }
    ]
}