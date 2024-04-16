import { getColorClassName } from "./getColorClassName";

describe("getColorClassName", () => {
    it("should return the correct class name for 'black'", () => {
        const result = getColorClassName("black");
        expect(result).toBe("bg-slate-400");
    });

    it("should return the correct class name for 'purple'", () => {
        const result = getColorClassName("purple");
        expect(result).toBe("bg-purple-400");
    });

    it("should return the correct class name for 'brown'", () => {
        const result = getColorClassName("brown");
        expect(result).toBe("bg-yellow-600");
    });

    it("should return the correct class name for 'white'", () => {
        const result = getColorClassName("white");
        expect(result).toBe("bg-slate-50");
    });

    it("should return the correct class name for 'blue'", () => {
        const result = getColorClassName("blue");
        expect(result).toBe("bg-sky-200");
    });

    it("should return the correct class name for 'red'", () => {
        const result = getColorClassName("red");
        expect(result).toBe("bg-red-300");
    });

    it("should return the correct class name for 'green'", () => {
        const result = getColorClassName("green");
        expect(result).toBe("bg-emerald-200");
    });

    it("should return the correct class name for 'pink'", () => {
        const result = getColorClassName("pink");
        expect(result).toBe("bg-fuchsia-200");
    });

    it("should return the correct class name for 'yellow'", () => {
        const result = getColorClassName("yellow");
        expect(result).toBe("bg-amber-200");
    });

    it("should return the correct class name for 'gray'", () => {
        const result = getColorClassName("gray");
        expect(result).toBe("bg-slate-400");
    });

    it("should return the default class name for unknown colors", () => {
        const result = getColorClassName("unknown");
        expect(result).toBe("bg-rose-950");
    });
});
