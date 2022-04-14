export function fetchCountries(name) {
    const url = "https://restcountries.com/v2/name/";
    const options = "?fields=name,capital,population,flags,languages";

    return fetch(`${url}${name}${options}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
        .then(data => {
            return data.countries
        });
}

