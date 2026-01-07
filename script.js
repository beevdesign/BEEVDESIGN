// Data
const designerPhone = "5511999999999"; // Replace with actual number if provided

// State
let selectedService = "";
let selectedPrice = "";

// DOM Elements
const modal = document.getElementById("paymentModal");
const serviceCards = document.querySelectorAll(".service-card");
const closeModalBtn = document.querySelector(".modal-close");
const paymentOptions = document.querySelectorAll(".payment-option");
const selectedServiceTitle = document.getElementById("selectedServiceTitle");

// Functions
function openModal(serviceName, price) {
    selectedService = serviceName;
    selectedPrice = price;
    selectedServiceTitle.textContent = `${serviceName} (${price})`;
    modal.classList.add("active");
}

function closeModal() {
    modal.classList.remove("active");
    selectedService = "";
    selectedPrice = "";
}

function handlePaymentSelection(paymentMethod) {
    if (!selectedService) return;

    const message = `Olá! Gostaria de contratar o serviço *${selectedService}* no valor de *${selectedPrice}*. Prefiro realizar o pagamento via *${paymentMethod}*. Poderia me passar mais detalhes?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${designerPhone}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    closeModal();
}

// Event Listeners
serviceCards.forEach(card => {
    card.addEventListener("click", () => {
        const serviceName = card.querySelector("h3").innerText;
        const price = card.querySelector(".price").innerText;
        openModal(serviceName, price);
    });
});

closeModalBtn.addEventListener("click", closeModal);

// Close modal if clicking outside
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

paymentOptions.forEach(option => {
    option.addEventListener("click", () => {
        const paymentMethod = option.dataset.method;
        handlePaymentSelection(paymentMethod);
    });
});

