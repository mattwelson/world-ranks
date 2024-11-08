import { columns } from "@/components/countries/columns";
import { Controls } from "@/components/countries/controls";
import { DataTable } from "@/components/countries/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getCountries } from "@/lib/fetchers";
import { Search } from "lucide-react";

export default async function Home() {
  const { countries } = await getCountries();
  console.log(countries[0]);
  return (
    <div className="px-8">
      <Card className="-mt-16 mx-auto max-w-7xl z-10 relative">
        <CardHeader className="flex md:flex-row justify-between items-center">
          <CardDescription className="font-semibold text-base text-muted-foreground">
            Found {countries.length} countries
          </CardDescription>
          <div className="relative">
            <Search className="absolute select-none top-2 left-2 text-muted-foreground" />
            <Input
              placeholder="Search by Name, Region or Subregion"
              className="w-80 pl-12"
            />
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-[minmax(200px,250px)_1fr] gap-8">
          <Controls />
          <DataTable columns={columns} data={countries} />
        </CardContent>
      </Card>
    </div>
  );
}
