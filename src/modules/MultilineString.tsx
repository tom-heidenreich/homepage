import React from "react";

export default function MultilineString({ string }: { string: string }) {
    const lines = string.split('\n');
    return (
        <>
            {lines.map((line, index) => (
                <React.Fragment key={Math.random() + ''}>
                    {line}
                    {
                        index !== lines.length - 1 &&
                        <br />
                    }
                </React.Fragment>
            ))}
        </>
    );
}