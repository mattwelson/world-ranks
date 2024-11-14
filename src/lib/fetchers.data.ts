import type { z } from "zod";
import type { countryBordersSchema, countryDetailsSchema } from "./fetchers";

export const India = {
  flags: {
    svg: "https://flagcdn.com/in.svg",
    alt: "The flag of India is composed of three equal horizontal bands of saffron, white and green. A navy blue wheel with twenty-four spokes — the Ashoka Chakra — is centered in the white band.",
  },
  name: {
    common: "India",
    official: "Republic of India",
  },
  cca3: "IND",
  independent: true,
  unMember: true,
  currencies: {
    INR: {
      name: "Indian rupee",
    },
  },
  capital: ["New Delhi"],
  region: "Asia",
  subregion: "Southern Asia",
  languages: {
    eng: "English",
    hin: "Hindi",
    tam: "Tamil",
  },
  borders: ["BGD", "BTN", "MMR", "CHN", "NPL", "PAK"],
  area: 3287590.0,
  population: 1380004385,
  continents: ["Asia"],
} satisfies z.infer<typeof countryDetailsSchema>;

export const NewZealand = {
  name: {
    common: "New Zealand",
    official: "New Zealand",
  },
  cca3: "NZL",
  independent: true,
  unMember: true,
  currencies: {
    NZD: {
      name: "New Zealand dollar",
    },
  },
  capital: ["Wellington"],
  area: 270467.0,
  region: "Oceania",
  subregion: "Australia and New Zealand",
  languages: {
    eng: "English",
    mri: "Māori",
    nzs: "New Zealand Sign Language",
  },
  population: 5084300,
  continents: ["Oceania"],
  flags: {
    svg: "https://flagcdn.com/nz.svg",
    alt: "The flag of New Zealand has a dark blue field with the flag of the United Kingdom — the Union Jack — in the canton and a representation of the Southern Cross constellation, made up of four five-pointed white-edged red stars, on the fly side of the field.",
  },
} satisfies z.infer<typeof countryDetailsSchema>;

export const IndianBorderingCountries = [
  {
    flags: {
      svg: "https://flagcdn.com/co.svg",
      alt: "The flag of Colombia is composed of three horizontal bands of yellow, blue and red, with the yellow band twice the height of the other two bands.",
    },
    name: {
      common: "Colombia",
      official: "Republic of Colombia",
    },
    cca3: "COL",
  },
  {
    flags: {
      svg: "https://flagcdn.com/no.svg",
      alt: "The flag of Norway has a red field with a large white-edged navy blue cross that extends to the edges of the field. The vertical part of this cross is offset towards the hoist side.",
    },
    name: {
      common: "Norway",
      official: "Kingdom of Norway",
    },
    cca3: "NOR",
  },
  {
    flags: {
      svg: "https://flagcdn.com/ee.svg",
      alt: "The flag of Estonia is composed of three equal horizontal bands of blue, black and white.",
    },
    name: {
      common: "Estonia",
      official: "Republic of Estonia",
    },
    cca3: "EST",
  },
  {
    flags: {
      svg: "https://flagcdn.com/pe.svg",
      alt: "The flag of Peru is composed of three equal vertical bands of red, white and red, with the national emblem centered in the white band.",
    },
    name: {
      common: "Peru",
      official: "Republic of Peru",
    },
    cca3: "PER",
  },
] satisfies z.infer<typeof countryBordersSchema>;
