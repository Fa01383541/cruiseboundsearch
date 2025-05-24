export type Sailing = {
    price: number;
    name: string;
    region: string;
    duration: number;
    departureDate: string;
    returnDate: string;
    itinerary: string[];
    ship: {
        name: string;
        rating: number;
        reviews: number;
        image: string;
        line: {
            logo: string;
            name: string;
        };
    };
};
