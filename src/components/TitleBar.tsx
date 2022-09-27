import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Group, Title, Text, useMantineTheme, Menu, Burger } from "@mantine/core";
import { IconSun, IconMoon } from '@tabler/icons'
import { useThemeSwitch } from "../modules/useThemeSwitch";

export default function TitleBar() {
    return (
        <>
            <Group
                style={{
                    userSelect: 'none',
                }}
                m='xl'
                mt='md'
                p='xl'
            >
                <Name />
                <Tabs />
                <Settings />
            </Group>
        </>
    )
}

function Name() {

    const [hover, setHover] = useState(false);

    const navigate = useNavigate();

    function handleClick() {
        navigate('/');
    }

    return (
        <Title
            variant={hover ? 'gradient' : 'text'}
            style={{
                fontFamily: 'Reem Kufi Fun, sans-serif',
                cursor: 'pointer',
            }}
            size='1.5rem'
            onClick={handleClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            tomheidenreich
        </Title>
    )
}

function Tabs() {
    return (
        <Group
            ml='auto'
        >
            <Tab text='About' link='/about' />
            <Tab text='Projects' link='/projects' />
        </Group>
    )
}

type TabProps = { text: string, link: string }
function Tab({ text, link }: TabProps) {

    const [hover, setHover] = useState(false);

    const theme = useMantineTheme();
    const primaryColor = theme.colors[theme.primaryColor]

    const navigate = useNavigate();

    function handleClick() {
        navigate(link);
    }

    return (
        <Text
            onClick={handleClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                cursor: 'pointer',
            }}
            weight='bold'
            color={hover ? primaryColor[3] : undefined}
        >
            {text}
        </Text>
    )
}

function Settings() {

    const [opened, setOpened] = useState(false);
    const [hover, setHover] = useState(false);

    const theme = useMantineTheme();
    const primaryColor = theme.colors[theme.primaryColor]

    return (
        <Menu
            shadow="md"
            width={200}
            withArrow
            opened={opened}
            onChange={setOpened}
        >
            <Menu.Target>
                <Burger
                    opened={opened}
                    size={16}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    color={hover ? primaryColor[3] : undefined}
                />
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Settings</Menu.Label>
                <ColorModeItem />
            </Menu.Dropdown>
        </Menu>
    )
}

function ColorModeItem() {

    const { toggleColorMode, colorMode } = useThemeSwitch();

    return (
        <Menu.Item
            icon={colorMode === 'dark' ? <IconSun size={14} /> : <IconMoon size={14} />}
            onClick={toggleColorMode}
        >
            Toggle ColorMode
        </Menu.Item>
    )
}