import { createApi } from "unsplash-js";

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&radius=100000&sort=RATING&limit=${limit}`;
};

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getListOfCoffeePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    perPage: 40,
  });

  const unsplashResults = photos.response.results;
  return unsplashResults.map((result) => result.urls.small);
};

export const fetchCoffeeStores = async (
  latLong = "16.800502140236773,96.15010611315638",
  limit = 9
) => {
  const unsplashPhotos = await getListOfCoffeePhotos();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "fsq39ZCEGlBfWeCgMvifQNavCid163cZSR2QfWnrj0L14GA=",
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(latLong, "coffee shop", limit),
    options
  );

  const data = await response.json();

  return data.results.map((place, idx) => {
    return {
      id: place.fsq_id,
      name: place.name,
      address: place.location.formatted_address || place.location.address,
      neighborhood: place.location.neighborhood || place.location.cross_street,
      imgUrl: unsplashPhotos[idx],
    };
  });
};
