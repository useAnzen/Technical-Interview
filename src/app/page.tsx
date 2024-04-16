import prisma from "~lib/prisma";
import { PokemonCard } from "~ui/PokemonCard";

interface IExpectedQueryParams {
    page: string | number;
    itemsPerPage: string | number;
}

export default async function Page({
    searchParams = {}
}: {
    searchParams: Partial<IExpectedQueryParams>;
}) {
    /**
     * Get the query parameters from the searchParams object
     */
    const queryParams: IExpectedQueryParams = Object.assign<
        Required<IExpectedQueryParams>,
        Partial<IExpectedQueryParams>
    >({ page: 1, itemsPerPage: 10 }, searchParams);

    /**
     * Fetch the pokemon data from the database
     */
    const pokemonList = await prisma.pokemon.findMany({
        include: {
            Types: true,
            Habitat: true
        }
    });

    /**
     * Return the JSX for the page
     */
    return (
        <main className="space-y-6 bg-slate-700 p-6">
            <h1 className="text-3xl font-bold text-white">Pokemon List</h1>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
                {pokemonList.map((pokemon) => (
                    <li key={pokemon.id}>
                        <PokemonCard pokemon={pokemon} />
                    </li>
                ))}
            </ul>
            <div className="text-white">
                {/**
                 * Add Pagination here
                 */}
                <p>Page: {queryParams.page}</p>
            </div>
        </main>
    );
}
