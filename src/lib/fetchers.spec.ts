import nock from "nock";
import { expect, it } from "vitest";
import { getCountry } from "./fetchers";
import { India, IndianBorderingCountries, NewZealand } from "./fetchers.data";

it("finds correct country from cca3", async () => {
  nock("https://restcountries.com")
    .get(/^\/v3.1\/alpha\/NZL/)
    .reply(200, NewZealand);

  const { country } = await getCountry("NZL");
  expect(country.name.common).toBe("New Zealand");
});

it("populates bordering countries", async () => {
  nock("https://restcountries.com")
    .get(/^\/v3.1\/alpha\/IN/)
    .reply(200, India)
    .get(/^\/v3.1\/alpha\?codes=/)
    .reply(200, IndianBorderingCountries);

  const { country, borders } = await getCountry("IN");
  expect(country.name.common).toBe("India");
  expect(borders).toHaveLength(4);
  expect(borders).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        cca3: "PER",
      }),
    ])
  );
});
