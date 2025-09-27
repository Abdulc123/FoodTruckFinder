import React, { createContext, useContext, useState, ReactNode } from "react";
import { themes, Theme } from "./themes";

/*
    ThemeContextType describes the shape of the object we will provide through
    React Context. TypeScript enforces that any consumer of the context will
    receive exactly these fields with the correct types.

    - `theme` is the current theme object (type `Theme`, defined in ./themes).
    - `setThemeByCampus` is a function that accepts a campus key and updates
        the theme. `keyof typeof themes` means "one of the keys of the `themes`
        object" (so TypeScript can ensure callers pass a valid campus name).
*/
type ThemeContextType = {
    theme: Theme;
    setThemeByCampus: (campus: keyof typeof themes) => void;
};

/*
    createContext creates a React Context object. We give it a generic type
    of `ThemeContextType | undefined` because the context value will be
    provided by a provider component higher in the tree. Passing `undefined`
    as the default value is a common pattern which forces consumers to call
    the `useTheme` hook only when inside a provider (we throw an explicit
    error in that case below).
*/
const ThemeContex = createContext<ThemeContextType | undefined>(undefined);

/*
    ThemeProvider is a React component that wraps children and provides the
    theme context to everything inside it. In your app you would use this
    near the root (for example in App.tsx) so all screens can access the
    theme.

    - `children: ReactNode` is the type for any valid React child (elements,
        strings, fragments, etc.). This is how we type the props object inline.
*/
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    // useState keeps the current theme in local state. We also provide the
    // generic argument `useState<Theme>` so TypeScript knows `theme` has type
    // `Theme` and `setTheme` expects a `Theme` as well.
    const [theme, setTheme] = useState<Theme>(themes.temple);

    /*
        setThemeByCampus is a small helper that accepts a campus key (one of the
        keys defined in the `themes` object) and sets the active theme to
        `themes[campus]`.

        - `keyof typeof themes` is a TypeScript pattern meaning "a union of the
            keys of the `themes` object" (for example: 'temple' | 'anotherCampus').
        - This ensures callers only pass known campus keys and prevents typos.
    */
    const setThemeByCampus = (campus: keyof typeof themes) => {
        setTheme(themes[campus]);
    };

    // The Provider component makes the `value` available to any child that
    // calls `useContext(ThemeContex)` (or our `useTheme` hook below).
    return (
        <ThemeContex.Provider value={{ theme, setThemeByCampus }}>
            {children}
        </ThemeContex.Provider>
    );
};

/*
    useTheme is a custom hook that wraps useContext and adds a safety check.
    - It calls `useContext(ThemeContex)` to read the current context value.
    - If the hook is used outside of a ThemeProvider, the context will be
        `undefined` (because that's the default we passed into createContext).
        We throw a helpful error so developers quickly see the problem.

    Benefits of a custom hook:
    - Keeps consuming components concise: `const { theme } = useTheme()`
    - Centralizes the error message and typing so consumers never have to
        repeat the `| undefined` checks.
*/
export const useTheme = () => {
    const context = useContext(ThemeContex);
    if (!context) {
        // This helps you catch the mistake of using the hook outside the provider.
        throw new Error("useTheme must be used within the ThemeProvider");
    }
    return context;
};