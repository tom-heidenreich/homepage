import { IconBrandDiscord, IconBrandGithub } from "@tabler/icons";
import Icons from "../components/icons/Icons";

export default function IconProvider({ icon }: { icon: string }) {
    if(icon === 'brand_github') return <IconBrandGithub />
    else if(icon === 'brand_discord') return <IconBrandDiscord />
    else if(icon === 'lang_typescript') return <Icons.Typescript />
    else if(icon === 'lang_javascript') return <Icons.Javascript />
    else if(icon === 'lang_python') return <Icons.Python />
    else if(icon === 'lang_go') return <Icons.Golang />
    else if(icon === 'lang_java') return <Icons.Java />
    else if(icon === 'lib_react') return <Icons.React />
    else if(icon === 'lib_next') return <Icons.Next />
    else if(icon === 'lib_docker') return <Icons.Docker />
    else if(icon === 'lib_firebase') return <Icons.Firebase />
    else if(icon === 'lib_tensorflow') return <Icons.Tensorflow />
    else return null 
}