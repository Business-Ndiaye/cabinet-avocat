const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('nav ul');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (navMenu) {
                navMenu.classList.remove('show');
            }
        }
    });
});

function setFormMessage(form, message, type = 'success') {
    const alert = form.querySelector('.alert');
    if (!alert) return;
    alert.textContent = message;
    alert.className = `alert ${type}`;
    alert.style.display = 'block';
}

function clearFormMessage(form) {
    const alert = form.querySelector('.alert');
    if (alert) {
        alert.style.display = 'none';
    }
}

function validateInput(input) {
    if (!input.checkValidity()) {
        return false;
    }
    return true;
}

const appointmentForm = document.querySelector('form[data-form="appointment"]');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', event => {
        event.preventDefault();
        clearFormMessage(appointmentForm);

        const requiredFields = appointmentForm.querySelectorAll('[required]');
        let valid = true;

        requiredFields.forEach(field => {
            if (!validateInput(field)) {
                valid = false;
                field.classList.add('invalid');
            } else {
                field.classList.remove('invalid');
            }
        });

        if (!valid) {
            setFormMessage(appointmentForm, 'Veuillez remplir tous les champs obligatoires de manière valide.', 'error');
            return;
        }

        setFormMessage(appointmentForm, 'Votre demande de rendez-vous a bien été envoyée. Nous revenons vers vous sous 24h ouvrées.', 'success');
        appointmentForm.reset();
    });
}

const loginForm = document.querySelector('form[data-form="client-login"]');
if (loginForm) {
    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        clearFormMessage(loginForm);

        const email = loginForm.querySelector('input[type="email"]');
        const password = loginForm.querySelector('input[type="password"]');
        let valid = true;

        if (!validateInput(email)) {
            valid = false;
            email.classList.add('invalid');
        } else {
            email.classList.remove('invalid');
        }

        if (!validateInput(password) || password.value.length < 8) {
            valid = false;
            password.classList.add('invalid');
        } else {
            password.classList.remove('invalid');
        }

        if (!valid) {
            setFormMessage(loginForm, 'Email ou mot de passe invalide. Vérifiez vos informations et réessayez.', 'error');
            return;
        }

        setFormMessage(loginForm, 'Connexion sécurisée établie. Bienvenue dans votre espace client.', 'success');
        const dashboard = document.querySelector('.client-dashboard');
        if (dashboard) {
            dashboard.style.display = 'block';
        }
        loginForm.reset();
    });
}

const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('input', () => {
        input.classList.remove('invalid');
    });
});
