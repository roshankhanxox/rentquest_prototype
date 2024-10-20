document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const loginForm = document.getElementById('loginForm');
    const nameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Header background change on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(30, 58, 138, 0.9)';
        } else {
            header.style.backgroundColor = 'rgba(10, 25, 47, 0.7)';
        }
    });

    // Form submission (API call)
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
    
        const username = nameInput.value;
        const password = passwordInput.value;
    
        // Login attempt
        fetch('https://rentquest-production.up.railway.app/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.access && data.refresh) {
                const accessToken = data.access;
                const refreshToken = data.refresh;
    
                // Store tokens in local storage
                localStorage.setItem('token', accessToken);
                localStorage.setItem('refresh_token', refreshToken);
    
                // Fetch the user's profile
                fetch('https://rentquest-production.up.railway.app/api/users/me/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => response.json())
                .then(userData => {
                    // Store the user's role in local storage
                    localStorage.setItem('role', userData.role);
    
                    // Update login message
                    document.getElementById('login-message').innerText = 'Login successful!';
                    document.getElementById('login-message').classList.add('success');

                    // Redirect to another page after successful login
                    window.location.href = 'home.html';
    
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
            } else {
                document.getElementById('login-message').innerText = 'Invalid credentials.';
            }
        })
        .catch(error => {
            console.error('Error logging in:', error);
            document.getElementById('login-message').innerText = 'Error logging in.';
        });
    });

    // Input animations
    const inputs = [nameInput, passwordInput];
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Animated background
    const starsElement = document.querySelector('.stars');
    let starsPosition = 0;
    function animateStars() {
        starsPosition -= 0.1;
        if (starsPosition <= -100) {
            starsPosition = 0;
        }
        starsElement.style.backgroundPosition = `0 ${starsPosition}%`;
        requestAnimationFrame(animateStars);
    }
    animateStars();
});

