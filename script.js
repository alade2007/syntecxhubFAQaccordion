document.addEventListener('DOMContentLoaded', () => {
    const accordionItems = document.querySelectorAll('.accordion-item');
    const searchInput = document.getElementById('searchInput');
    const faqContainer = document.getElementById('faqContainer');

    // Initialize accordion
    accordionItems.forEach(item => {
        const button = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        button.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Toggle current item
            if (isOpen) {
                item.classList.remove('active');
                answer.classList.remove('open');
                button.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                answer.classList.add('open');
                button.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();

        accordionItems.forEach(item => {
            const questionText = item.querySelector('.faq-question span').textContent.toLowerCase();
            const answerText = item.querySelector('.faq-answer p').textContent.toLowerCase();

            if (term === '') {
                item.style.display = 'block';
            } else if (questionText.includes(term) || answerText.includes(term)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Keyboard support
    const buttons = document.querySelectorAll('.faq-question');
    buttons.forEach((button, index) => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }

            if (e.key === 'ArrowDown' && index < buttons.length - 1) {
                e.preventDefault();
                buttons[index + 1].focus();
            }

            if (e.key === 'ArrowUp' && index > 0) {
                e.preventDefault();
                buttons[index - 1].focus();
            }
        });
    });

    // Open first item by default
    setTimeout(() => {
        const firstItem = accordionItems[0];
        if (firstItem) {
            firstItem.classList.add('active');
            firstItem.querySelector('.faq-answer').classList.add('open');
            firstItem.querySelector('.faq-question').setAttribute('aria-expanded', 'true');
        }
    }, 600);
});