


//color pattern from https://designsystem.reactioncommerce.com/#/Style/Colors
export const colors = {
    brandDarker: '#1e4035',
    brandDark: '#285749',
    brand: '#158562',
    brandBright: '#0db781',
    brandBrighter: '#b4ddc1',
    brandBrightest: '#dcfaf1',
    lightest: '#ffffff',
    text: '#333333',
    textMild: '#555555',
    textLight: '#7e718a',
    textLighter: '#aaaaaa',
    lilac: `#8c65b3`,
    accent: `#ffb238`,
    error: `#ec1818`,
    lemon: `#ffdf37`
};

export const spacing = {
    '3xs': 2,
    '2xs': 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 40,
    '3xl': 48
};


export const breakpoints = {
    mobile: 400,
    phablet: 550,
    tablet: 750,
    desktop: 1000,
    hd: 1300
};

export const radius = {
    default: 2,
    large: 4
};

export const defaultFontStack = [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Open Sans',
    'Helvetica Neue',
    'sans-serif'
].join();

const monospaceFontStack = [
    `Space Mono`,
    `SFMono-Regular`,
    `Menlo`,
    `Monaco`,
    `Consolas`,
    `Liberation Mono`,
    `Courier New`,
    `monospace`
].join();

export const fonts = {
    body: defaultFontStack,
    heading: `Futura PT, ${defaultFontStack}`,
    monospace: monospaceFontStack
};
