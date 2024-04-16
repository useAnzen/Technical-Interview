import { getColorClassName } from "~lib/getColorClassName";
import getTypeName from "~lib/getTypeName";
import { TypeIcon } from "./TypeIcon";

import type * as Prisma from "@prisma/client";

/**
 * The PokemonCard component displays a single Pokemon card
 *
 * Use
 * ```ts
 * const pokemon = await prisma.pokemon.findFirst({
 *     // ....
 *     include: {
 *         Types: true,
 *         Habitat: true
 *     }
 * });
 * ```
 */
interface IPokemonCardProp extends Prisma.Pokemon {
    Types: Prisma.Type[];
    Habitat: Prisma.Habitat;
}

/**
 * Renders a Pokemon card component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {IPokemonCardProp} props.pokemon - The Pokemon data to display on the card.
 * @returns {JSX.Element} The rendered Pokemon card.
 */
export const PokemonCard = ({ pokemon }: { pokemon: IPokemonCardProp }) => {
    return (
        <div
            className={`rounded-lg border-4 border-white ${getColorClassName(pokemon.color)} p-2 shadow-lg`}
        >
            <ol className="flex h-full flex-col gap-2">
                <li className="flex items-center justify-between">
                    <p className="text-lg font-bold capitalize">{pokemon.name}</p>
                    <ol className="flex items-center gap-1 text-sm">
                        {pokemon.Types.map((pokemonType) => {
                            const typeName = getTypeName(pokemonType.name);
                            return (
                                <li
                                    key={pokemonType.id}
                                    className="text-xs font-semibold capitalize"
                                >
                                    <figure
                                        className={`icon ${typeName.toLowerCase()} size-6 text-white`}
                                        title={typeName}
                                    >
                                        <TypeIcon name={typeName} />
                                    </figure>
                                </li>
                            );
                        })}
                    </ol>
                </li>
                <li className="flex aspect-video items-center justify-center rounded border-4 border-white">
                    <img src={pokemon.image} alt={pokemon.name} />
                </li>
                <li className="flex h-[8rem] items-center justify-center overflow-y-auto rounded border-4 border-white bg-white/50 px-4 py-2">
                    <div className="text-sm">{pokemon.description}</div>
                </li>
            </ol>
        </div>
    );
};
