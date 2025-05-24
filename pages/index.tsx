import React from 'react';
import Head from 'next/head';
import {Sailing} from '../types/sailing';
/* import {useEffect, useState} from 'react';*/
import SearchResultCard from '../components/SearchResultCard';
 type HomeProps = {
  sailings: Sailing[];
};
export default function Home({sailings}: HomeProps) {
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
            <p className="mb-4 text-black-700">{sailings.length} results found</p>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {sailings.map((sailing, index) => (
                <SearchResultCard key={index} sailing={sailing} />
              ))}
            </div>
          </>
      </main>
    
    </div>
    </>
  );
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
