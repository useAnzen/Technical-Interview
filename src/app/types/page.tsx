import getTypeName from "~lib/getTypeName";
import prisma from "~lib/prisma";
import { TypeIcon } from "~ui/TypeIcon";

export default async function Page() {
    const types = await prisma.type.findMany({
        include: {
            Pokemon: true
        }
    });

    return (
        <main className="bg-slate-700 p-6">
            <h1 className="text-3xl font-bold text-white">Pokemon Types</h1>
            <ul className="flex flex-col gap-4 rounded bg-white p-6">
                {types.map((type) => {
                    const typeName = getTypeName(type.name);
                    return (
                        <li key={`type-${type.id}`}>
                            <h2 className="flex items-center gap-2 text-xl font-bold capitalize">
                                <figure
                                    className={`icon shadow ${typeName.toLowerCase()} size-6 text-white`}
                                >
                                    <TypeIcon name={typeName} />
                                </figure>
                                <p>{type.name}</p>
                            </h2>
                            <ul>
                                {type.Pokemon.map((pokemon) => {
                                    return <li key={`pokemon-${pokemon.id}`}>{pokemon.name}</li>;
                                })}
                            </ul>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}
