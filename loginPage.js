document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const loginForm = document.getElementById('loginForm');
    const userTypeRadios = document.querySelectorAll('input[name="userType"]');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    // Header background change on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(30, 58, 138, 0.9)';
        } else {
            header.style.backgroundColor = 'rgba(10, 25, 47, 0.7)';
        }
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const userType = document.querySelector('input[name="userType"]:checked').value;
        const name = nameInput.value;
        const email = emailInput.value;
        const rememberMe = document.querySelector('input[name="remember"]').checked;

        console.log('Login attempt:', { userType, name, email, rememberMe });
        // Here you would typically send this data to your server
        alert(`Login attempt for ${userType}: ${name} (${email})`);
    });

    // Input animations
    [nameInput, emailInput].forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // User type selection effect
    userTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            userTypeRadios.forEach(r => r.parentElement.classList.remove('selected'));
            this.parentElement.classList.add('selected');
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