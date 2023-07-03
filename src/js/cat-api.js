const url = 'https://api.thecatapi.com/v1';
const api_key = "live_LHGZzFAdl2BtnLwbomiBhyI4AhJ4vEuomKW1GU4SKThZJOslkkGvyivoWPM1mULY";

export function fetchBreeds() {
    return fetch(`${url}/breeds?api_key=${api_key}`)
        .then(response => response.json()
        );       
};

export function fetchCatByBreed(breedId) {
    return fetch(`${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`)
        .then(response => response.json()
        );  
};