import {Sailing} from '../types/sailing';
import Image from 'next/image';

export default function SearchResultCard({sailing}: {sailing: Sailing}) {
    return(
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200">
        {/* Imagen del barco */}
        <div className="relative w-full h-48">
          {sailing.ship?.image ? (
            <Image
              src={sailing.ship.image}
              alt={sailing.ship?.name || 'Ship'}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              No image
            </div>
          )}
        </div>
  
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold text-gray-800">{sailing.name}</h2>
            {sailing.ship?.line?.logo && (
              <Image
                src={sailing.ship.line.logo}
                alt={sailing.ship.line?.name || 'Line'}
                width={50}
                height={20}
                className="object-contain"
              />
            )}
          </div>
  
          <p className="text-sm text-gray-500 mb-1">
            <strong>Region:</strong> {sailing.region}
          </p>
          <p className="text-sm text-gray-500 mb-1">
            <strong>Itinerary:</strong> {Array.isArray(sailing.itinerary) ? sailing.itinerary.join(", ") : 'N/A'}
          </p>
          <p className="text-sm text-gray-500 mb-1">
            <strong>Ship:</strong> {sailing.ship?.name || 'N/A'}
          </p>
  
          <div className="flex items-center text-sm text-yellow-600 mb-2">
            ⭐ {sailing.ship?.rating ?? 'N/A'} ({sailing.ship?.reviews ?? 0} reviews)
          </div>
  
          <div className="text-right mt-2">
            <span className="text-xl font-bold text-blue-600">
              ${sailing.price}
            </span>
          </div>
        </div>
      </div>
    )
};