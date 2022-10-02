import { ActionIcon, Tooltip, useMantineTheme } from "@mantine/core";
import { useState } from "react";

type SocialIconProps = { name: string, icon: JSX.Element, url: string }
export default function SocialIcon({ name, icon, url }: SocialIconProps) {

    const theme = useMantineTheme();
    const primaryColor = theme.colors[theme.primaryColor]

    const [hover, setHover] = useState(false);

    function handleClick() {
        window.location.href = url;
    }

    return (
        <Tooltip 
            label={name} 
            withArrow
            openDelay={500}
            transition='slide-up'
        >
            <ActionIcon
                onClick={handleClick}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                    color: (hover
                        ? primaryColor[3]
                        : undefined
                    )
                }}
            >
                {icon}
            </ActionIcon>
        </Tooltip>
    )
}