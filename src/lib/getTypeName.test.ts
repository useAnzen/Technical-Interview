import getTypeName from "./getTypeName";
import { iconNames } from "~ui/TypeIcon";

describe("getTypeName", () => {
    it("should return expected icon name for unknown type", () => {
        const result = getTypeName("banana");
        expect(result).toBe("Normal");
    });

    iconNames.forEach((iconName) => {
        it(`should return the corresponding icon name for ${iconName}`, () => {
            const result = getTypeName(String(iconName).toLowerCase());
            expect(result).toBe(iconName);
        });
    });
});
