import {colors} from './colors';

export type Theme = {
    primary: string;
    secondary: string;
    background: string;
    heading: string;
    text: string;
}

export const themes: Record<string, Theme> = {
    drexel: {
        primary: colors.drexelBlue,
        secondary: colors.drexelGold,
        background: colors.defaultBackground,
        heading: colors.defaultTextWhite,
        text: colors.defaultTextBlack
    },
    temple: {
        primary: colors.templeRed,
        secondary: colors.templeGray,
        background: colors.defaultBackground,
        heading: colors.defaultTextWhite,
        text: colors.defaultTextBlack
    }
};