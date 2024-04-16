import { iconNames, type IconName } from "~ui/TypeIcon";
import { capitalize } from "./capitalize";

/**
 * Converts the type of the pokemon from the Database to the IconName
 * @param type the type of the pokemon from the Database
 * @returns the IconName of the pokemon type
 */
export default function getTypeName(type: string): IconName {
    return iconNames.find((name) => name === capitalize(type)) || "Normal";
}
