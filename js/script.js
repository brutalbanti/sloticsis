document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Сброс сообщений об ошибках
    let errors = [];
    document.getElementById('fullNameError').style.display = 'none';
    document.getElementById('emailError').style.display = 'none';
    document.getElementById('subjectError').style.display = 'none';

    // Получение значений полей формы
    let fullName = document.getElementById('fullName').value.trim();
    let email = document.getElementById('email').value.trim();
    let subject = document.getElementById('subject').value.trim();
    let message = document.getElementById('message').value.trim();

    // Проверка полей на пустоту
    if (fullName === '') {
        document.getElementById('fullName').classList.add('error');
        document.getElementById('fullNameError').style.display = 'flex';
        errors.push('Full Name is required.');
    } else {
        document.getElementById('fullName').classList.remove('error');
    }

    if (email === '') {
        document.getElementById('email').classList.add('error');
        document.getElementById('emailError').style.display = 'flex';
        errors.push('Email is required.');
    } else if (!validateEmail(email)) {
        document.getElementById('email').classList.add('error');
        document.getElementById('emailError').style.display = 'flex';
        errors.push('Please enter a valid email address.');
    } else {
        document.getElementById('email').classList.remove('error');
    }

    if (subject === '') {
        document.getElementById('subject').classList.add('error');
        document.getElementById('subjectError').style.display = 'flex';
        errors.push('Subject is required.');
    } else {
        document.getElementById('subject').classList.remove('error');
    }

    if (errors.length > 0) {
        return;
    }
    const btnForm = document.querySelector('.contact__btn');
    btnForm.classList.add('disabled');
    // Отправка данных в Telegram
    let token = '7173641774:AAHiE_EYJpVwZEUG9cXTLttrEtPbgARwNos';
    let chat_id = '-4256259581';
    let text = `Full Name: ${fullName}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;

    let url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(text)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                showPopup();
                document.getElementById('contactForm').reset();
                btnForm.classList.remove('disabled');
            } else {
                alert('Error sending message.');
            }
        })
        .catch(error => console.error('Error:', error));
});

// Функция для проверки валидности email
function validateEmail(email) {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


function showPopup() {
    document.getElementById('popup').classList.toggle('active')
}

function hidePopup() {
    document.getElementById('popup').classList.toggle('active')
}

document.getElementById('popupClose').addEventListener('click', hidePopup);
document.getElementById('popupContinue').addEventListener('click', hidePopup);