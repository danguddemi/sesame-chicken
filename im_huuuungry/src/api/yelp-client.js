import React, {useState, useEffect} from 'react';
import sortOn from 'sort-on';

const config = {
    method: 'GET',
    headers: {'Authorization': `Bearer YqbefqOq2jNunehGeK0lKrKr7FPQlH8Nqkavs8o3zPo90dXss1nYVujW6z_Jp-YcLCK2u9lk1zM3ZjvL7oHerEvI179WqK_n0GnlYE7pHIUWVAEJuapAyLQduWJIXnYx`}
};

const useYelpApi = () => {
    const [yelpBusiness, setYelpBusinesses] = useState([]);
    const [yelpRegion, setYelpRegion] = useState(null);

    const fetchBusinesses = async (latitude, longitude, categories = null) => {
        const res = await fetch(`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&radius=3200&open_now${categories ? '&categories=' + categories.join(',') : ""}`, config);
        let {businesses, region} = await res.json();

        setYelpRegion(region.center);
        businesses = sortOn(businesses, 'distance');
        setYelpBusinesses(businesses.map(business => {
            return {
                name: business.name,
                coords: business.coordinates,
                imageUrl: business.image_url,
                address: business.location.display_address,
                distance: business.distance,
                rating: business.rating,
                price: business.price
            }
        }))
    };

    return [yelpBusiness, yelpRegion, fetchBusinesses]
};

export default useYelpApi;
