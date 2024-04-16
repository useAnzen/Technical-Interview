import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Fetches a resource from a REST API.
 *
 * @param url - The URL of the resource to fetch.
 * @returns A promise that resolves to the fetched resource.
 * @throws An error if the HTTP response is not successful.
 */
async function getResourceFromRestApi<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

interface IAPIListResource {
    name: string;
    url: string;
}

const main = async () => {
    console.log("Seeding database");
    console.log("Fetching data from pokeapi.co");

    console.log("");
    console.log("Fetching Types");
    const types = await getResourceFromRestApi<{
        count: number;
        next?: string;
        previous?: string;
        results: Array<IAPIListResource>;
    }>("https://pokeapi.co/api/v2/type?limit=151");

    const typeMap = new Map<string, number>();
    for (let i = 0; i < types.results.length; i++) {
        const typeData = types.results[i];
        console.log(`importing ${i + 1} of ${types.results.length}: ${typeData.name}`);

        const type = await getResourceFromRestApi<{
            id: number;
            name: string;
            names: Array<{
                language: IAPIListResource;
                name: string;
            }>;
            moves: Array<IAPIListResource>;
            damage_relations: Record<
                | "double_damage_from"
                | "double_damage_to"
                | "half_damage_from"
                | "half_damage_to"
                | "no_damage_from"
                | "no_damage_to",
                Array<IAPIListResource>
            >;
        }>(typeData.url);
        typeMap.set(type.name, type.id);
        await prisma.type.upsert({
            where: {
                id: type.id
            },
            create: {
                id: type.id,
                name: type.name,
                sourceUrl: typeData.url,
                icon: `https://pokeapi.co/media/sprites/pokemon/other/official-artwork/${type.id}.png`
            },
            update: {
                name: type.name
            }
        });
    }

    console.log("");
    console.log("Fetching Habitats");
    const habitats = await getResourceFromRestApi<{
        count: number;
        next?: string;
        previous?: string;
        results: Array<IAPIListResource>;
    }>("https://pokeapi.co/api/v2/pokemon-habitat?limit=151");

    const habitatMap = new Map<string, number>();
    for (let i = 0; i < habitats.results.length; i++) {
        const habitatData = habitats.results[i];

        console.log(`importing ${i + 1} of ${habitats.results.length}: ${habitatData.name}`);
        const habitat = await getResourceFromRestApi<{
            id: number;
            name: string;
            names: Array<{
                language: IAPIListResource;
                name: string;
            }>;
        }>(habitatData.url);

        habitatMap.set(habitat.name, habitat.id);

        await prisma.habitat.upsert({
            where: {
                id: habitat.id
            },
            create: {
                id: habitat.id,
                name: habitat.name,
                sourceUrl: habitatData.url,
                background: `https://pokeapi.co/media/sprites/pokemon/other/official-artwork/${habitat.id}.png`
            },
            update: {
                name: habitat.name
            }
        });
    }

    console.log("");
    console.log("Fetching Pokemon");
    const pokeList = await getResourceFromRestApi<{
        count: number;
        next?: string;
        previous?: string;
        results: Array<IAPIListResource>;
    }>("https://pokeapi.co/api/v2/pokemon?limit=151");

    for (let i = 0; i < pokeList.results.length; i++) {
        const pokemonData = pokeList.results[i];
        console.log(`importing ${i + 1} of ${pokeList.results.length}: ${pokemonData.name}`);

        const pokemon = await getResourceFromRestApi<{
            id: number;
            name: string;
            base_experience: number;
            height: number;
            weight: number;
            is_default: boolean;
            order: number;
            species: IAPIListResource;
            sprites: {
                front_default: string;
                other?: {
                    home?: {
                        front_default?: string;
                    };
                    "official-artwork"?: {
                        front_default?: string;
                    };
                };
            };
            types: Array<{ slot: number; type: IAPIListResource }>;
        }>(pokemonData.url);

        const species = await getResourceFromRestApi<{
            color: IAPIListResource;
            flavor_text_entries: Array<{
                flavor_text: string;
                language: IAPIListResource;
                version: IAPIListResource;
            }>;
            habitat: IAPIListResource;
        }>(pokemon.species.url);

        const description =
            species.flavor_text_entries.find((txt) => txt.language.name === "en")?.flavor_text ??
            "";

        const upsertData = {
            name: pokemon.name,
            description: description,
            height: pokemon.height,
            weight: pokemon.weight,
            is_default: pokemon.is_default,
            order: pokemon.order,
            base_experience: pokemon.base_experience,
            image:
                pokemon.sprites.other?.["official-artwork"]?.front_default ??
                pokemon.sprites.other?.home?.front_default ??
                pokemon.sprites.front_default,
            color: species.color.name,
            habitatId: habitatMap.get(species.habitat.name) ?? 0,
            Types: {
                connect: pokemon.types.map((type) => ({
                    id: typeMap.get(type.type.name) ?? 0
                }))
            }
        };

        await prisma.pokemon.upsert({
            where: {
                id: pokemon.id
            },
            create: {
                id: pokemon.id,
                sourceUrl: pokemonData.url,
                ...upsertData
            },
            update: upsertData
        });
    }
};

main()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        process.exit(0);
    });
