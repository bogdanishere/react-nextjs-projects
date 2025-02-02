import Stats from "./stats";
import Branding from "./branding";
import ContentBlock from "./content-block";
import PetDetails from "./pet-details";
import PetList from "./pet-list";
import SearchForm from "./search-form";
import PetButton from "./pet-button";

export default function Page() {
  return (
    <main>
      <div className="flex justify-between items-center text-white py-8">
        <Branding />
        <Stats />
      </div>

      <div className="grid md:grid-cols-3 md:grid-rows-[45px_1fr] grid-rows-[45px_300px_500px] gap-4 md:h-[600px]">
        <div className="md:col-span-1 md:row-start-1 md:row-span-1 md:col-start-1">
          <SearchForm />
        </div>

        <div className="md:col-span-1 md:row-start-2 md:row-span-full md:col-start-1 relative">
          <ContentBlock>
            <PetList />
            <div className="absolute bottom-5 right-5">
              <PetButton actionType="add" />
            </div>
          </ContentBlock>
        </div>

        <div className="md:col-span-full md:row-start-1 md:row-span-full md:col-start-2 ">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}
