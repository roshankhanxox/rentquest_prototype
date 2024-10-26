/*document.addEventListener('DOMContentLoaded', async function () {
    const searchInput = document.querySelector('#searchBar');
    const searchBtn = document.querySelector('#searchBtn');
    const suggestionsContainer = document.getElementById('suggestions');
    const propertiesContainer = document.getElementById('properties');
    
    // Optional filters
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const minSizeInput = document.getElementById('minSize');
    const maxSizeInput = document.getElementById('maxSize');

    const autocomplete = new google.maps.places.Autocomplete(searchInput, {
        types: ['geocode'], // This restricts the autocomplete to cities only, change as needed
        componentRestrictions: { country: 'in' } // Restrict to India, adjust for other countries
    });

    autocomplete.addListener('place_changed', function() {
        const place = autocomplete.getPlace();
        if (place) {
        // Trigger search after place is selected
        const query = searchInput.value.trim();
        if (query) {
            performSearch(query);  // Perform search with the selected place
        }
    }
        console.log('Selected place:', place); // You can use the selected place data here
    });
    // Token Refresh Function
    async function refreshToken() {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            console.log('No refresh token found.');
            return;
        }

        try {
            const response = await fetch('https://rentquest-production.up.railway.app/api/login/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refresh: refreshToken })
            });

            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }

            const data = await response.json();
            localStorage.setItem('token', data.access);  // Store the new access token
            console.log('Token refreshed successfully');
        } catch (error) {
            console.error('Error refreshing token:', error);
        }
    }

    // Call the refreshToken function on page load
    await refreshToken();

    // Function to render search results
    function renderProperties(properties) {
        propertiesContainer.innerHTML = '';  // Clear previous results
        if (properties.length === 0) {
            propertiesContainer.innerHTML = '<p>No properties found.</p>';
            return;
        }
    
        properties.forEach(property => {
            const propertyDiv = document.createElement('div');
            propertyDiv.classList.add('property');
    
            // Use replace to remove the "image/" prefix
            let imageUrl = property.property_images[0]["image"];
            if (imageUrl.startsWith('image/upload/https://res.cloudinary.com/')) {
                // Remove 'image/upload/'
                imageUrl = imageUrl.replace('image/upload/', '');
            } 
            // Else if the image URL starts with 'image/upload/', add the Cloudinary URL prefix
            else if (imageUrl.startsWith('image/upload/')) {
                imageUrl = `https://res.cloudinary.com/dl7n2c4hr/${imageUrl}`;
            }

            propertyDiv.innerHTML = `
                <a href="propertyDetails.html?id=${property.id}" class="property-link">
                    <h3>${property.name}</h3>
                    <img src="${imageUrl}" alt="${property.name} image" /> <!-- Render image -->
                    <p>Location: ${property.location}</p>
                    <p>Price: ${property.price}</p>
                    <p>Size: ${property.size} sqft</p>
                </a>
            `;
    
            propertiesContainer.appendChild(propertyDiv);
        });
    }

    // Function to perform the API call
    async function performSearch(query) {
        const minPrice = minPriceInput.value || '';
        const maxPrice = maxPriceInput.value || '';
        const minSize = minSizeInput.value || '';
        const maxSize = maxSizeInput.value || '';

        try {
            const response = await fetch(`https://rentquest-production.up.railway.app/api/properties/search/?query=${query}&min_price=${minPrice}&max_price=${maxPrice}&min_size=${minSize}&max_size=${maxSize}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`  // Use the access token
                }
            });
            const data = await response.json();
            console.log(data);
            renderProperties(data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    }

    // Event listener for search button
    searchBtn.addEventListener('click', function () {
        const query = searchInput.value.trim();
        if (query) {
            performSearch(query);
        }
    });

    // Enter key triggers the search
    searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                performSearch(query);
            }
        }
    });

    // Get the search query from URL and perform search
    const params = new URLSearchParams(window.location.search);
    const queryFromURL = params.get('query');
    if (queryFromURL) {
        searchInput.value = queryFromURL;  // Set the search input
        performSearch(queryFromURL);  // Perform search with the query
    }
});*/
document.addEventListener('DOMContentLoaded', async function () {
    const searchInput = document.querySelector('#searchBar');
    const searchBtn = document.querySelector('#searchBtn');
    const filterBtn = document.querySelector('#filterBtn');
    const filtersContainer = document.querySelector('#filtersContainer');
    const suggestionsContainer = document.getElementById('suggestions');
    const propertiesContainer = document.getElementById('properties');
    
    // Sliders
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const sizeRange = document.getElementById('sizeRange');
    const sizeValue = document.getElementById('sizeValue');

    const autocomplete = new google.maps.places.Autocomplete(searchInput, {
        types: ['geocode'],
        componentRestrictions: { country: 'in' }
    });

    autocomplete.addListener('place_changed', function() {
        const place = autocomplete.getPlace();
        if (place) {
            const query = searchInput.value.trim();
            if (query) {
                performSearch(query);
            }
        }
        console.log('Selected place:', place);
    });

    // Token Refresh Function
    async function refreshToken() {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            console.log('No refresh token found.');
            return;
        }

        try {
            const response = await fetch('https://rentquest-production.up.railway.app/api/login/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refresh: refreshToken })
            });

            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }

            const data = await response.json();
            localStorage.setItem('token', data.access);
            console.log('Token refreshed successfully');
        } catch (error) {
            console.error('Error refreshing token:', error);
        }
    }

    await refreshToken();

    // Function to render search results
    function renderProperties(properties) {
        propertiesContainer.innerHTML = '';
        if (properties.length === 0) {
            propertiesContainer.innerHTML = '<p>No properties found.</p>';
            return;
        }
    
        properties.forEach(property => {
            const propertyDiv = document.createElement('div');
            propertyDiv.classList.add('property');
    
            let imageUrl = property.property_images[0]["image"];
            if (imageUrl.startsWith('image/upload/https://res.cloudinary.com/')) {
                imageUrl = imageUrl.replace('image/upload/', '');
            } 
            else if (imageUrl.startsWith('image/upload/')) {
                imageUrl = `https://res.cloudinary.com/dl7n2c4hr/${imageUrl}`;
            }

            propertyDiv.innerHTML = `
                <a href="propertyDetails.html?id=${property.id}" class="property-link">
                    <h3>${property.name}</h3>
                    <img  src="${imageUrl}" alt="${property.name} image" />
                    <p>Location: ${property.location}</p>
                    <p>Price: ₹${property.price}</p>
                    <p>Size: ${property.size} sqft</p>
                </a>
            `;
    
            propertiesContainer.appendChild(propertyDiv);
        });
    }

    // Function to perform the API call
    async function performSearch(query) {
        const maxPrice = priceRange.value;
        const maxSize = sizeRange.value;

        try {
            const response = await fetch(`https://rentquest-production.up.railway.app/api/properties/search/?query=${query}&max_price=${maxPrice}&max_size=${maxSize}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            console.log(data);
            renderProperties(data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    }

    // Event listener for search button
    searchBtn.addEventListener('click', function () {
        const query = searchInput.value.trim();
        if (query) {
            performSearch(query);
        }
    });

    // Enter key triggers the search
    searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                performSearch(query);
            }
        }
    });

    // Filter button toggle
    filterBtn.addEventListener('click', function() {
        if (filtersContainer.style.display === 'none') {
            filtersContainer.style.display = 'flex';
            filtersContainer.style.opacity = '0';
            filtersContainer.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                filtersContainer.style.opacity = '1';
                filtersContainer.style.transform = 'translateY(0)';
            }, 10);
        } else {
            filtersContainer.style.opacity = '0';
            filtersContainer.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                filtersContainer.style.display = 'none';
            }, 300);
        }
    });

    // Price range slider
    priceRange.addEventListener('input', function() {
        priceValue.textContent = `₹${this.value}`;
    });

    priceRange.addEventListener('change', function() {
        const query = searchInput.value.trim();
        if (query) {
            performSearch(query);
        }
    });

    // Size range slider
    sizeRange.addEventListener('input', function() {
        sizeValue.textContent = `${this.value} sqft`;
    });

    sizeRange.addEventListener('change', function() {
        const query = searchInput.value.trim();
        if (query) {
            performSearch(query);
        }
    });

    // Get the search query from URL and perform search
    const params = new URLSearchParams(window.location.search);
    const queryFromURL = params.get('query');
    if (queryFromURL) {
        searchInput.value = queryFromURL;
        performSearch(queryFromURL);
    }
});document.addEventListener('DOMContentLoaded', async function () {
    const searchInput = document.querySelector('#searchBar');
    const searchBtn = document.querySelector('#searchBtn');
    const filterBtn = document.querySelector('#filterBtn');
    const filtersContainer = document.querySelector('#filtersContainer');
    const suggestionsContainer = document.getElementById('suggestions');
    const propertiesContainer = document.getElementById('properties');
    
    // Sliders
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const sizeRange = document.getElementById('sizeRange');
    const sizeValue = document.getElementById('sizeValue');

    const autocomplete = new google.maps.places.Autocomplete(searchInput, {
        types: ['geocode'],
        componentRestrictions: { country: 'in' }
    });

    autocomplete.addListener('place_changed', function() {
        const place = autocomplete.getPlace();
        if (place) {
            const query = searchInput.value.trim();
            if (query) {
                performSearch(query);
            }
        }
        console.log('Selected place:', place);
    });

    // Token Refresh Function
    async function refreshToken() {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            console.log('No refresh token found.');
            return;
        }

        try {
            const response = await fetch('https://rentquest-production.up.railway.app/api/login/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refresh: refreshToken })
            });

            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }

            const data = await response.json();
            localStorage.setItem('token', data.access);
            console.log('Token refreshed successfully');
        } catch (error) {
            console.error('Error refreshing token:', error);
        }
    }

    await refreshToken();

    // Function to render search results
    function renderProperties(properties) {
        propertiesContainer.innerHTML = '';
        if (properties.length === 0) {
            propertiesContainer.innerHTML = '<p>No properties found.</p>';
            return;
        }
    
        properties.forEach(property => {
            const propertyDiv = document.createElement('div');
            propertyDiv.classList.add('property');
    
            let imageUrl = property.property_images[0]["image"];
            if (imageUrl.startsWith('image/upload/https://res.cloudinary.com/')) {
                imageUrl = imageUrl.replace('image/upload/', '');
            } 
            else if (imageUrl.startsWith('image/upload/')) {
                imageUrl = `https://res.cloudinary.com/dl7n2c4hr/${imageUrl}`;
            }

            propertyDiv.innerHTML = `
                <a href="propertyDetails.html?id=${property.id}" class="property-link">
                    <h3>${property.name}</h3>
                    <img  src="${imageUrl}" alt="${property.name} image" />
                    <p>Location: ${property.location}</p>
                    <p>Price: ₹${property.price}</p>
                    <p>Size: ${property.size} sqft</p>
                </a>
            `;
    
            propertiesContainer.appendChild(propertyDiv);
        });
    }

    // Function to perform the API call
    async function performSearch(query) {
        const maxPrice = priceRange.value;
        const maxSize = sizeRange.value;

        try {
            const response = await fetch(`https://rentquest-production.up.railway.app/api/properties/search/?query=${query}&max_price=${maxPrice}&max_size=${maxSize}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            console.log(data);
            renderProperties(data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    }

    // Event listener for search button
    searchBtn.addEventListener('click', function () {
        const query = searchInput.value.trim();
        if (query) {
            performSearch(query);
        }
    });

    // Enter key triggers the search
    searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                performSearch(query);
            }
        }
    });

    // Filter button toggle
    filterBtn.addEventListener('click', function() {
        if (filtersContainer.style.display === 'none') {
            filtersContainer.style.display = 'flex';
            filtersContainer.style.opacity = '0';
            filtersContainer.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                filtersContainer.style.opacity = '1';
                filtersContainer.style.transform = 'translateY(0)';
            }, 10);
        } else {
            filtersContainer.style.opacity = '0';
            filtersContainer.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                filtersContainer.style.display = 'none';
            }, 300);
        }
    });

    // Price range slider
    priceRange.addEventListener('input', function() {
        priceValue.textContent = `₹${this.value}`;
    });

    priceRange.addEventListener('change', function() {
        const query = searchInput.value.trim();
        if (query) {
            performSearch(query);
        }
    });

    // Size range slider
    sizeRange.addEventListener('input', function() {
        sizeValue.textContent = `${this.value} sqft`;
    });

    sizeRange.addEventListener('change', function() {
        const query = searchInput.value.trim();
        if (query) {
            performSearch(query);
        }
    });

    // Get the search query from URL and perform search
    const params = new URLSearchParams(window.location.search);
    const queryFromURL = params.get('query');
    if (queryFromURL) {
        searchInput.value = queryFromURL;
        performSearch(queryFromURL);
    }
});
