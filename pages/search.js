import React from "react";
import { useRouter } from "next/dist/client/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";

function Search({ searchResults }) {
  const router = useRouter();
  // console.log(searchResults);

  const { location, startDate, endDate, noOfGuests } = router.query;
  // console.log(format(new Date(startDate), "dd MMMM yy"));
  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  // console.log(formattedStartDate);
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  // console.log(formattedEndDate);
  const range = ` ${formattedStartDate} - ${formattedEndDate}`;
  // console.log(range);

  return (
    <div className="h-screen">
      {/* Header */}
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />

      <main className="flex">
        {/* Left section Search results */}
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            {/* 300+ Stays {range} - for {noOfGuests} Guests */}
            300+ Stays {range} - for {noOfGuests} Guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className=" hidden md:inline-flex mb-5 space-x-3 text-gray 800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More Filters</p>
          </div>
          <div className="flex flex-col">
            {searchResults.map(
              ({ img, location, title, description, star, price, total }) => (
                <InfoCard
                  key={img}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                />
              )
            )}
          </div>
        </section>
        {/* headles ui?? */}
        {/* Right section Map */}
      </main>
      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );
  return {
    props: {
      searchResults,
    },
  };
}
