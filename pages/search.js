import React from "react";
import { useRouter } from "next/dist/client/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

function Search({ searchResults }) {
  const router = useRouter();

  const { location, startDate, endDate, noOfGuests } = router.query;
  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = ` ${formattedStartDate} - ${formattedEndDate}`; // console.log(range);

  return (
    <div className="h-screen">
      {/* Header */}
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />

      <main className="flex">
        {/* Left section Search results */}
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
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
          <div
            className="relative h-[400px] flex-grow overflow-hidden border-b cursor-pointer first:border-t 
         shadow-lg rounded-2xl mb-3 hover:scale-105 hover:mx-10 hover:gray-100 
         transition transform duration-200 ease-out"
          >
            <iframe
              width="1300"
              height="400"
              src="https://www.youtube.com/embed/ZcNdps-bATg"
              title="This Weeks Feature"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            {/* <div className="absolute top-1/3 w-full text-center">
              <p className="text-2xl  mb-16 text-purple-500 text-bold ">
                This Weeks Feature
              </p>
              <button className="text-purple-500 outline-none bg-white px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150">
                I'm Flexable
              </button>
            </div> */}
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
        <section className="hidden xl:inline-flex xl:min-w-[600px] ">
          <Map searchResults={searchResults} />
        </section>
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
