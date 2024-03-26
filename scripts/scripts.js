const searchButton = document.querySelector('#search-button');


searchButton.addEventListener('click', function(event) {
    clearData();
    event.preventDefault();
    const searchInput = document.querySelector('#search-input');
    const searchTerm = searchInput.value;
    resultsText(searchTerm);
    searchInput.value = '';
    getData(searchTerm)
        .then(data => {
            displayData(data);
        });
});

const getData = async (searchTerm) => {
    const response = await fetch(`http://universities.hipolabs.com/search?country=${searchTerm}`);
    const data = await response.json();
    return data;
}

const displayData = (data) => {
    const resultsContainer = document.querySelector('.results-container');

    data.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('result');
        div.innerHTML = `
            <h2>${element.name}</h2>
            <p>Country: ${element.country}</p>
            <p>Country Code: ${element.alpha_two_code}</p>
            <p>Website: <a href="${element.web_pages[0]}">${element.web_pages[0]}</a></p>
            <p>Domain: ${element.domains}</p>
        `;
        resultsContainer.appendChild(div);
    });
}

const clearData = () => {  
    const resultsContainer = document.querySelector('.results-container');
    resultsContainer.innerHTML = '';
}

const resultsText = (searchTerm) => { 

    const resultText = document.querySelector('#txt-results');
    resultText.textContent = `Results for: ${searchTerm}`; 

}