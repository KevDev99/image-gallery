const axios = require("axios").default;

const fetchImages = async (searchString) => {
  const userIsSearching = searchString && searchString !== "";
  const queryParams = userIsSearching
    ? `/search/photos/?query=${searchString}`
    : "/photos";
  const res = await axios.get(
    `${process.env.UNSPLASH_PHOTO_API_URL}${queryParams}`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_SECRET_KEY}`,
      },
    }
  );

  // if user was searching the returned json object changes -> so we also need to change
  const data = userIsSearching ? res.data.results : res.data;

  return data;
};

module.exports = {
  fetchImages,
};
