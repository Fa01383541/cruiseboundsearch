import {Sailing} from '../types/sailing';
import Image from 'next/image';

function formatCruiseDates(departure: string, ret: string) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const depDate = new Date(departure);
    const retDate = new Date(ret);

    const month = months[depDate.getMonth()];
    const depDay = depDate.getDate();
    const retDay = retDate.getDate();
    const year = depDate.getFullYear();

    return `${month} ${depDay}-${retDay}, ${year}`;
}
export default function SearchResultCard({sailing}: {sailing: Sailing}) {
    const nightMatch = sailing.name.match(/^(\d+)\s+Night\s+(.+)$/i);
    const dayMatch = sailing.name.match(/^(\d+)\s+Day\s+(.+)$/i);
    const nights = nightMatch ? nightMatch[1] : null;
    const days = dayMatch? dayMatch[1]: null;
    const tripName = nightMatch ? nightMatch[2] : dayMatch ? dayMatch[2] : sailing.name;
    return(
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-row">
        {/* Left: Ship Image */}
        <div className="relative w-64 h-48 flex-shrink-0">
            <div className="absolute top-2 left-2 bg-black/70 text-white text-sm rounded px-2 py-1 z-10">
                {formatCruiseDates(sailing.departureDate, sailing.returnDate)}

            </div>
            {sailing.ship?.image ? (
                <Image
                    src={sailing.ship.image}
                    alt={sailing.ship?.name || 'Ship'}
                    fill
                    className="object-cover rounded-l-xl"
                />
            ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 rounded-l-xl">
                    No image
                </div>
            )}
        </div>

        {/* Right: Card Details */}
        <div className="flex-1 flex flex-col">
            <div className="pt-2 px-4 flex-1 flex flex-col">
                <div className="flex justify-between items-center  ">
                    <h2 className="text-lg font-bold text-gray-800">{tripName}</h2>
                    {sailing.ship?.line?.logo && (
                        <Image
                            src={sailing.ship.line.logo}
                            alt={sailing.ship.line?.name || 'Line'}
                            width={100}
                            height={40}
                            className="object-contain"
                        />
                    )}
                </div>
                <div className="flex flex-row items-center text-sm text-gray-700 mb-1 space-x-4">
                    <span className="text-gray-500">{sailing.region}</span>
                    {nights && (
                        <span className="text-gray-500">{nights} night{nights !== "1" ? "s" : ""}</span>
                    )}
                    {days && (
                        <span className="text-gray-500">{days} day{days !== "1" ? "s" : ""}</span>
                    )}
                    <span className="flex items-center">
                        <span className="text-black">
                            ⭐ {sailing.ship?.rating ?? 'N/A'}
                        </span>
                        <span className="text-gray-500 ml-1">
                            ({sailing.ship?.reviews ?? 0} reviews)
                        </span>
                    </span>
                </div>
                <p className="text-sm text-black mb-1">
                    {Array.isArray(sailing.itinerary)
                        ? sailing.itinerary.slice(0, 4).map((stop, idx, arr) => {
                            const city = stop.split(',')[0].trim();
                            return (
                                <span key={idx}>
                                    {city}
                                    {idx < arr.length - 1 && (
                                        <span className="text-blue-600 mx-1">&rarr;</span>
                                    )}
                                </span>
                            );
                        })
                        : 'N/A'}
                </p>
            </div>
            <div className="bg-gray-100 w-full px-4 py-2 flex justify-end items-end">
            <div className="flex flex-col items-end mr-4">
                <span className="text-xs text-gray-600">Interior from</span>
                <span className="text-xl font-bold text-black">
                    ${sailing.price}
                </span>
            </div>
                <button className=" px-2 cursor-pointer py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium h-10">
                    See sailings
                </button>
            </div>
        </div>
    </div>

    )
};