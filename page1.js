document.addEventListener('DOMContentLoaded', () => {
    const studentBtn = document.getElementById('studentBtn');
    const landlordBtn = document.getElementById('landlordBtn');
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const container = document.querySelector('.container');
    let userType = 'student';

    function setActiveButton(button) {
        studentBtn.classList.remove('active');
        landlordBtn.classList.remove('active');
        button.classList.add('active');
    }

    function animateEntrance() {
        container.style.opacity = '0';
        container.style.transform = 'scale(0.9)';
        setTimeout(() => {
            container.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            container.style.opacity = '1';
            container.style.transform = 'scale(1)';
        }, 50);
    }

    studentBtn.addEventListener('click', () => {
        setActiveButton(studentBtn);
        userType = 'student';
    });

    landlordBtn.addEventListener('click', () => {
        setActiveButton(landlordBtn);
        userType = 'landlord';
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;
        console.log('Logging in as', userType, 'with email:', email);
        // Here you would typically send the login data to a server
        // For this example, we'll just log the data and show an alert
        alert(`Login attempt as ${userType} with email: ${email}`);
    });

    // Implement the hover effect for the submit button
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.addEventListener('mouseenter', () => {
        submitBtn.style.transform = 'translateY(-2px)';
        submitBtn.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    });
    submitBtn.addEventListener('mouseleave', () => {
        submitBtn.style.transform = 'translateY(0)';
        submitBtn.style.boxShadow = 'none';
    });

    // Implement the stars animation
    const stars = document.querySelector('.stars');
    function animateStars() {
        stars.style.transform = 'translateY(-100%)';
        stars.style.transition = 'transform 10s linear';
        setTimeout(() => {
            stars.style.transform = 'translateY(0)';
            stars.style.transition = 'none';
            requestAnimationFrame(animateStars);
        }, 10000);
    }
    requestAnimationFrame(animateStars);

    // Call the entrance animation when the page loads
    animateEntrance();
});