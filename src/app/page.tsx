import { columns } from "@/components/countries/columns";
import { DataTable } from "@/components/countries/data-table";
import { getCountries } from "@/lib/fetchers";

export default async function Home() {
  const { countries } = await getCountries();
  console.log(countries[0]);
  return (
    <div className="px-8">
      <DataTable columns={columns} data={countries} />
    </div>
  );
}
