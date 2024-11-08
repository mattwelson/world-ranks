import { z } from "zod";

export const countryListSchema = z
  .object({
    name: z.object({
      common: z.string(),
      official: z.string(),
    }),
    independent: z.boolean().optional(),
    unMember: z.boolean(),
    region: z.string(),
    area: z.number(),
    population: z.number(),
    flags: z.object({
      svg: z.string(),
      alt: z.string().optional(),
    }),
  })
  .array();

// add sort and filter operations
export async function getCountries() {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,independent,unMember,region,area,population,flagsß"
  );
  const result = await response.json();
  const { data } = await countryListSchema.safeParseAsync(result);

  if (!data) throw new Error("Could not parse");
  return {
    countries: data,
    regions: ["Americas", "Antartica", "Africa", "Asia", "Europe"],
    statuses: ["Member of the United Nations", "Independent"],
    sortKeys: ["Population", "Name", "Area"],
  };
}
