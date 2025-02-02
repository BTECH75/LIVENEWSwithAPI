const apiKey = 'Enter your API '; // Your API Key
const apiUrl = 'https://newsapi.org/v2/everything'; // Replace with your actual API URL if needed

document.getElementById('fetch-news').addEventListener('click', async function() {
    const location = document.getElementById('location').value.trim();
    if (location === '') {
        alert('Please enter a location');
        return;
    }

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '<p>Loading news...</p>'; // Show loading message

    try {
        const response = await fetch(`${apiUrl}?q=${location}&apiKey=${apiKey}`);
        const data = await response.json();

        if (data.status === 'ok') {
            if (data.articles.length === 0) {
                newsContainer.innerHTML = '<p>No news articles found for this location.</p>';
            } else {
                newsContainer.innerHTML = ''; // Clear the loading message
                data.articles.forEach(article => {
                    const articleElement = document.createElement('div');
                    articleElement.classList.add('news-article');

                    articleElement.innerHTML = `
                        <h3>${article.title}</h3>
                        <p>${article.description}</p>
                        <a href="${article.url}" target="_blank">Read full article</a>
                    `;

                    newsContainer.appendChild(articleElement);
                });
            }
        } else {
            newsContainer.innerHTML = '<p>Error fetching news. Please try again later.</p>';
        }
    } catch (error) {
        newsContainer.innerHTML = '<p>There was an error. Please try again later.</p>';
    }
});
