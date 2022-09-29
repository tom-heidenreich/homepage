import { Button, Group, Title, Text, useMantineTheme, Center, Image } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { NeuralNetwork } from 'brain.js';
import { INeuralNetworkData } from "brain.js/dist/src/neural-network";
import CharacterCombinations from "./CharacterCombinations";

export default function Bouncer() {

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
                Experiment: Bouncer
            </Title>
            <Text
                weight={500}
                align='center'
                style={{
                    maxWidth: '25rem'
                }}
            >
                You work as a bouncer and your job is to keep bad people out of the club. So you don't have to work so hard, you want to train an AI to detect the bad people.
            </Text>
            <Text
                weight={500}
                color='dimmed'
                size='sm'
                mb='xl'
            >
                Of course you can experiment with your own scenario, too.
            </Text>
            <NeuralNetworkWidget
                input_labels={['eyes', 'mouth', 'hair']}
                output_labels={['Let in', 'Send away']}
                dataset={CharacterCombinations}
            />
        </>
    );
}

type NeuralNetworkProps = {
    input_labels: string[],
    output_labels: string[],
    dataset: number[][]
}
function NeuralNetworkWidget({ input_labels, output_labels, dataset }: NeuralNetworkProps) {

    const [network, setNetwork] = useState<NeuralNetwork<INeuralNetworkData, INeuralNetworkData> | undefined>(undefined)
    const [data, setData] = useState<{ input: number[], output: number[] }[]>([])

    const [input, setInput] = useState<number[]>([])
    const [outputs, setOutputs] = useState<(number | undefined)[]>([])

    const [loading, setLoading] = useState(false)

    const runPredict = useCallback((input: number[]) => {
        if (network && input) {
            const outputs = network.run(input)
            setOutputs(Object.values(outputs))
        }
    }, [network])

    const generateNewPromp = useCallback(() => {
        const input = dataset[Math.floor(Math.random() * dataset.length)]
        setLoading(true)
        setTimeout(() => {
            setInput(input)
            runPredict(input)
            setLoading(false)
        }, 100)
    }, [dataset, runPredict])

    useEffect(() => {
        const network = new NeuralNetwork({
            hiddenLayers: [3],
            inputSize: input_labels.length,
            outputSize: output_labels.length,
        });
        network.initialize()
        setNetwork(network)
        generateNewPromp()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input_labels.length, output_labels.length])

    function runTrain(index: number) {
        if (network) {
            const output = new Array(output_labels.length).fill(0)
            output[index] = 1
            const new_data = [...data, { input, output }]
            setData(new_data)
            setLoading(true)
            try {
                if (new_data.length > 0 && new_data.length % 5 === 0) {
                    network.train(new_data, {
                        iterations: 100,
                    })
                }
                generateNewPromp()
            }catch(e) {}
            setLoading(false)
        }
    }

    if(dataset.length === 0) return <Text color='red'>Unexpected error</Text>

    return (
        <>
            <Title order={3}>Guest</Title>
            <Group
                mt='md'
            >
                <CharacterImage input={input} />
            </Group>
            <Title order={3} mt='xl' >Prediction</Title>
            <Group
                mt='md'
            >
                {output_labels.map((_, i) => {
                    return (
                        <Light key={i} strength={outputs[i] || 0} size='2rem' />
                    )
                })}
            </Group>
            <Title order={3} mt='xl' >Your decision</Title>
            <Group
                mt='md'
                mb='xl'
            >
                {output_labels.map((label, i) => {
                    return (
                        <Button
                            style={{
                                width: '7rem'
                            }}
                            disabled={loading}
                            key={i}
                            onClick={() => runTrain(i)}
                        >
                            {label}
                        </Button>
                    )
                })}
            </Group>
        </>
    )
}

type LightProps = { size?: string, strength: number }
function Light({ size, strength }: LightProps) {

    const theme = useMantineTheme();
    const primaryColor = theme.colors[theme.primaryColor]

    return (
        <Center
            style={{
                width: size || '1rem',
                height: size || '1rem',
                borderRadius: '20%',
                backgroundColor: strength > 0 ? primaryColor[Math.round((strength * 5) + 3)] : theme.colors.dark[5],
            }}
        >
            <Text>{Math.round(strength * 10) / 10}</Text>
        </Center>
    )
}

type CharacterImageProps = { input: number[] }
function CharacterImage({ input }: CharacterImageProps) {

    const theme = useMantineTheme();
    const isDark = theme.colorScheme === 'dark'

    if(!input) return null

    const id = `characters%2F${input.toString().replaceAll(',', '.')}.png`
    const url = process.env.REACT_APP_STORAGE_URL_TEMPLATE?.replace('{&NAME}', id)

    return (
        <Center
            style={{
                width: '10rem',
                height: '10rem',
                borderRadius: '2rem',
                backgroundColor: isDark ? theme.colors.dark[6] : theme.colors.gray[3],
            }}
            p='sm'
        >
            <Image
                src={url}
            />
        </Center>
    )
}