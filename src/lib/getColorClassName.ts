/**
 * Convert the Database Color Value into a Tailwind CSS Class
 *
 * @param color the color of the pokemon
 * @returns tailwind css class for the color
 */
export const getColorClassName = (color: string) => {
    switch (String(color).toLowerCase()) {
        case "black":
            return "bg-slate-400";
        case "purple":
            return "bg-purple-400";
        case "brown":
            return "bg-yellow-600";
        case "white":
            return "bg-slate-50";
        case "blue":
            return "bg-sky-200";
        case "red":
            return "bg-red-300";
        case "green":
            return "bg-emerald-200";
        case "pink":
            return "bg-fuchsia-200";
        case "yellow":
            return "bg-amber-200";
        case "gray":
            return "bg-slate-400";
        default:
            return "bg-rose-950";
    }
};
