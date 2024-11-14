import { z } from "zod";

export const countrySchema = z.object({
  name: z.object({
    common: z.string(),
    official: z.string(),
  }),
  independent: z.boolean().optional(),
  unMember: z.boolean(),
  region: z.string(),
  subregion: z.string(),
  area: z.number(),
  population: z.number(),
  cca3: z.string(),
  flags: z.object({
    svg: z.string(),
    alt: z.string().optional(),
  }),
});

export const countryListSchema = countrySchema.array();
export const countryDetailsSchema = countrySchema.extend({
  capital: z.string().array(),
  languages: z.record(z.string(), z.string()),
  continents: z.string().array(),
  currencies: z.record(
    z.string(),
    z.object({
      name: z.string(),
    })
  ),
  borders: z.string().array().optional(),
});
export const countryBordersSchema = countrySchema
  .pick({
    name: true,
    flags: true,
    cca3: true,
  })
  .array();

// add sort and filter operations
export async function getCountries() {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,independent,unMember,region,subregion,area,population,flags,cca3"
  );
  const result = await response.json();
  const { data } = await countryListSchema.safeParseAsync(result);

  if (!data) {
    throw new Error("Could not parse");
  }
  return {
    countries: data,
  };
}

// add sort and filter operations
export async function getCountry(name: string) {
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha/${name}?fields=name,independent,unMember,region,subregion,area,population,flags,cca3,capital,languages,continents,currencies,borders`
  );
  const result = await response.json();
  const { data, error } = await countryDetailsSchema.safeParseAsync(result);

  if (!data) {
    console.log({ error, result });
    throw new Error("Could not parse");
  }
  const country = data;

  if (!country) throw new Error("Not found");

  return {
    country,
    borders: await getBorderingCountries(country.borders),
  };
}
// add sort and filter operations
export async function getBorderingCountries(borders?: string[]) {
  if (!borders || borders.length === 0) return null;

  const response = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${borders.join(
      ","
    )}&fields=name,flags,cca3`
  );

  const result = await response.json();
  const { data, error } = await countryBordersSchema.safeParseAsync(result);

  if (!data) {
    console.log({ error, result });
    throw new Error("Could not parse");
  }
  return data;
}
