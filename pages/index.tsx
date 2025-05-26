import React from 'react';
import Head from 'next/head';
import {Sailing} from '../types/sailing';
import {useState} from 'react';
import SearchResultCard from '../components/SearchResultCard';
import SortDropdown from '../components/SortDropdown';

type HomeProps = {
  sailings: Sailing[];
};
const CARDS_PER_PAGE = 10;
export default function Home({sailings}: HomeProps) {
  const [page, setPage] = useState(1);
  const [sort,setSort]=useState("price-asc")

  const totalPages = Math.ceil(sailings.length / CARDS_PER_PAGE);
  const startIdx = (page - 1) * CARDS_PER_PAGE;
  const endIdx = startIdx + CARDS_PER_PAGE;
  const sortedSailings = getSortedSailings(sailings, sort);
  const paginatedSailings = sortedSailings.slice(startIdx, endIdx);
  return (
    <>
    <Head>
      <title>Cruisebound Search</title>
      <link rel="icon" href="/cruiseicon.png" />
    </Head>
    <div className="pt-6">
      <main>
        <div className="flex justify-center items-center">
        <h1 className="text-3xl font-bold text-blue-900">Cruise Search Results</h1>
        </div>
          <>
          <div className="flex items-center justify-end mr-20 mb-2 space-x-4">
            <span className="text-sm font-semibold text-black">
              Sort by
            </span>
            <SortDropdown sort={sort} setSort={setSort} />
          </div>
            <div className='flex flex-row ml-20 mb-4 items-center'>
            <p className=" font-bold text-black-700 mr-4">{sailings.length} trips found</p>
            <button className='border border-gray-400 bg-white px-2 py-1 rounded-sm shadow-sm font-semibold hover:bg-gray-50 transition cursor-pointer text-xs' onClick={()=>{
              setSort("price-asc");
              setPage(1);
            }}>Reset filters</button>
            </div>
            <div className="grid gap-6 grid-cols-1 px-20">
              {paginatedSailings.map((sailing, index) => (
                <SearchResultCard key={index} sailing={sailing} />
              ))}
            </div>
            <div className="flex justify-start items-center mt-4 mb-4 pl-20 space-x-2 ">
            <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center w-72 space-x-2">
              <button
                className={`text-xl cursor-pointer px-2 ${page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-blue-600'}`}
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
              
                  return (
                    <button
                      key={pageNum}
                      className={`w-8 cursor-pointer h-8 rounded-full flex items-center justify-center text-base font-medium
                        ${pageNum === page ? 'bg-white text-black shadow' : 'text-black hover:bg-gray-200'}`}
                      onClick={() => setPage(pageNum)}
                      disabled={pageNum === page}
                    >
                      {pageNum}
                    </button>
                  );
                
                
              })}
              <button
                className={`text-xl cursor-pointer px-2 ${page === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-blue-600'}`}
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                &gt;
              </button>
            </div>
            </div>
          </>
      </main>
    
    </div>
    </>
  );
}
function getSortedSailings(sailings: Sailing[], sort: string) {
  const sorted = [...sailings];
  switch (sort) {
    case "price-asc":
      sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      break;
    case "price-desc":
      sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      break;
    case "date-asc":
      sorted.sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime());
      break;
    case "date-desc":
      sorted.sort((a, b) => new Date(b.departureDate).getTime() - new Date(a.departureDate).getTime());
      break;
    case "duration-asc":
      sorted.sort((a, b) => (a.duration ?? 0) - (b.duration ?? 0));
      break;
    case "duration-desc":
      sorted.sort((a, b) => (b.duration ?? 0) - (a.duration ?? 0));
      break;
    default:
      break;
  }
  return sorted;
}
export async function getServerSideProps() {
  try {
    const res = await fetch("https://sandbox.cruisebound-qa.com/sailings");
    const data = await res.json();
    console.log("Fetched data:", data);
    return { props: { sailings: Array.isArray(data.results) ? data.results : [] } };
  } catch (error) {
    console.error("Error fetching sailings:", error);
    return { props: { sailings: [] } };
  }
}
