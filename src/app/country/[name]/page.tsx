/* eslint-disable @next/next/no-img-element */
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getCountry } from "@/lib/fetchers";
import { Row, RowLabel, RowValue } from "./row";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function CountryPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const { country, borders } = await getCountry(name);

  return (
    <div className="px-8">
      <Card className="-mt-16 mx-auto max-w-3xl z-10 relative">
        <CardHeader className="flex flex-col items-center -mt-16 gap-6">
          <img
            src={country.flags.svg}
            alt={country.flags.alt ?? ""}
            className="w-64 rounded-xl"
          />
          <div className="flex flex-col items-center gap-2">
            <CardTitle>{country.name.common}</CardTitle>
            <div className="text-muted-foreground">{country.name.official}</div>
          </div>
        </CardHeader>
        <div className="flex justify-center gap-8">
          <div className="bg-muted rounded flex gap-4 px-4 p-2 items-center">
            <div>Population</div>
            <div className="w-px h-full bg-background" />
            <div>{Intl.NumberFormat("en-US").format(country.population)}</div>
          </div>
          <div className="bg-muted rounded-md flex gap-4 px-4 p-2 items-center">
            <div>
              Area(km<sup>2</sup>)
            </div>
            <div className="w-px h-full bg-background" />
            <div>{Intl.NumberFormat("en-US").format(country.area)}</div>
          </div>
        </div>
        <Row className="mt-8">
          <RowLabel>Capital</RowLabel>
          <RowValue values={country.capital} />
        </Row>
        <Row>
          <RowLabel>Subregion</RowLabel>
          <RowValue>{country.subregion}</RowValue>
        </Row>
        <Row>
          <RowLabel>Language</RowLabel>
          <RowValue values={Object.values(country.languages)} />
        </Row>
        <Row>
          <RowLabel>Currencies</RowLabel>
          <RowValue
            values={Object.values(country.currencies).map((c) => c.name)}
          />
        </Row>
        <Row className={cn({ "border-b-0": !borders })}>
          <RowLabel>Continents</RowLabel>
          <RowValue values={country.continents} />
        </Row>
        {borders && (
          <div className="p-4 space-y-4">
            <div className="text-muted-foreground">Neighbouring Countries</div>
            <div className="flex flex-wrap gap-6">
              {borders.map((c) => (
                <Link key={c.cca3} href={`/country/${c.cca3}`}>
                  <img
                    src={c.flags.svg}
                    alt={c.flags.alt ?? ""}
                    className="h-20 rounded-xl"
                  />
                  <div className="text-sm mt-2">{c.name.common}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
