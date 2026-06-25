// Professional staff database
const staffData = {
    "juliana": { name: "Juliana Costa", role: "Master Hair Stylist" },
    "gabriela": { name: "Gabriela Dias", role: "Designer de Unhas" },
    "mariana": { name: "Mariana Souza", role: "Makeup Artist & Estética" }
};

document.addEventListener('DOMContentLoaded', () => {
    // Header scrolled state
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Tab switcher logic
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // Professional selection logic
    const professionalCards = document.querySelectorAll('.pro-card');
    let selectedProfessionalId = "juliana"; // Default professional

    professionalCards.forEach(card => {
        card.addEventListener('click', () => {
            professionalCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            selectedProfessionalId = card.getAttribute('data-pro');
        });
    });

    // Appointment Booking validation & simulator
    const bookingForm = document.getElementById('booking-form');
    const successDiv = document.getElementById('booking-success');

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('book-name').value.trim();
        const phone = document.getElementById('book-phone').value.trim();
        const service = document.getElementById('book-service');
        const date = document.getElementById('book-date').value;
        const time = document.getElementById('book-time').value;

        if (!name || !phone || !service.value || !date || !time) {
            alert("Por favor, preencha todos os campos do formulário.");
            return;
        }

        const selectedStaff = staffData[selectedProfessionalId];
        const serviceName = service.options[service.selectedIndex].text;

        successDiv.innerHTML = `
            <strong>Agendamento Pré-Confirmado!</strong><br>
            Obrigada, Sr(a). ${name.split(' ')[0]}.<br>
            Seu procedimento de <strong>${serviceName}</strong> foi reservado com a profissional <strong>${selectedStaff.name}</strong> (${selectedStaff.role}) para o dia <strong>${formatDate(date)} às ${time}</strong>.<br>
            Enviamos um SMS/WhatsApp de confirmação para o número <strong>${phone}</strong>.
        `;

        successDiv.style.display = 'block';
        bookingForm.reset();

        // Reset professional selection to default
        professionalCards.forEach(c => c.classList.remove('active'));
        document.querySelector('[data-pro="juliana"]').classList.add('active');
        selectedProfessionalId = "juliana";

        // Scroll success alert into view
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Hide success banner after 12s
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 12000);
    });

    function formatDate(dateStr) {
        const parts = dateStr.split('-');
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    // Direct CTA action to schedule service from the menu
    window.scheduleService = (serviceValue) => {
        const serviceSelect = document.getElementById('book-service');
        serviceSelect.value = serviceValue;
        document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    };
});
