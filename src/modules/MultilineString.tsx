export default function MultilineString({ string }: { string: string }) {
    const lines = string.split('\n');
    return (
        <>
            {lines.map(line => (
                <>
                    {line}
                    <br />
                </>
            ))}
        </>
    );
}