document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const main = document.querySelector('main');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(30, 58, 138, 0.9)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }
    });

    const searchInput = document.querySelector('input[type="text"]');
    searchInput.addEventListener('focus', function() {
        this.style.transform = 'scale(1.05)';
    });
    searchInput.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
    });

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// List of locations in Kolkata
const locations = {
    'H': ['Hussainpur', 'Howrah', 'Hazra', 'Hindustan Park', 'Hatiara', 'Hatibagan'],
    'R': ['Ruby', 'Rajarhat', 'Ranikuthi', 'Rabindra Sadan', 'Rashbehari', 'Ripon Street'],
    'B': ['Baguiati', 'Ballygunge', 'Behala', 'Bansdroni', 'Baranagar', 'Barrackpore'],
    'M': ['Maheshtala', 'Maniktala', 'Minto Park', 'Metiabruz', 'Madhyamgram'],
    'S': ['Salt Lake', 'Shyambazar', 'Sonarpur', 'Sealdah', 'Santoshpur']
};

// Reference to the search input and suggestions container
const searchBar = document.getElementById('searchBar');
const suggestionsContainer = document.getElementById('suggestions');

// Function to show suggestions
function showSuggestions(value) {
    // Clear any previous suggestions
    suggestionsContainer.innerHTML = '';

    // If there's no input, hide the suggestions box
    if (value === '') {
        suggestionsContainer.style.display = 'none';
        return;
    }

    // Find matching locations based on the first letter
    const firstLetter = value.charAt(0).toUpperCase();
    const matchingLocations = locations[firstLetter];

    if (matchingLocations) {
        // Filter places that start with the entered input
        const filtered = matchingLocations.filter(place => place.toLowerCase().startsWith(value.toLowerCase()));

        // Populate the suggestions container
        if (filtered.length > 0) {
            filtered.forEach(place => {
                const div = document.createElement('div');
                div.textContent = place;
                div.addEventListener('click', () => {
                    searchBar.value = place; // Fill the search bar with the clicked suggestion
                    suggestionsContainer.style.display = 'none'; // Hide suggestions after selection
                });
                suggestionsContainer.appendChild(div);
            });
            suggestionsContainer.style.display = 'block'; // Show suggestions
        } else {
            suggestionsContainer.style.display = 'none'; // Hide if no matches
        }
    } else {
        suggestionsContainer.style.display = 'none'; // Hide if no matching letter
    }
}

// Event listener for input changes
searchBar.addEventListener('input', function() {
    showSuggestions(this.value);
});
