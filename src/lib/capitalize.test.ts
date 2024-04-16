import { capitalize } from "./capitalize";

describe("capitalize", () => {
    it("should capitalize the first letter of a string", () => {
        const result = capitalize("hello");
        expect(result).toBe("Hello");
    });

    it("should return an empty string if the input is empty", () => {
        const result = capitalize("");
        expect(result).toBe("");
    });

    it("should return the same string if the first letter is already capitalized", () => {
        const result = capitalize("Hello");
        expect(result).toBe("Hello");
    });

    it("should handle strings with multiple words", () => {
        const result = capitalize("hello world");
        expect(result).toBe("Hello world");
    });
});
