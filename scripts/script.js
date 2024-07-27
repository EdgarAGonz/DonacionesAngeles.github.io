let totalValue = 0;
const maxValue = 40000;
const messages = [
    "¡Estamos a punto de alcanzar la meta!",
    "¡Lo logramos! Gracias por tus donaciones"
];

const donationsPerPage = 5;
let currentPage = 1;
const donations = [];

document.getElementById('addDonation').addEventListener('click', function() {
    const donorName = document.getElementById('donorName').value.trim();
    const donationAmount = parseFloat(document.getElementById('donationAmount').value);
    const editingIndex = document.getElementById('editingIndex').value;

    if (donorName && !isNaN(donationAmount)) {
        if (editingIndex !== "") {
            // Edit existing donation
            const oldDonation = donations[editingIndex];
            totalValue -= oldDonation.donationAmount;
            donations[editingIndex] = { donorName, donationAmount };
        } else {
            // Add new donation
            donations.push({ donorName, donationAmount });
        }
        
        totalValue += donationAmount;

        const percentage = Math.min((totalValue / maxValue) * 100, 100);
        document.getElementById('progressBar').style.height = percentage + '%';
        document.getElementById('progressText').textContent = `Q${totalValue.toFixed(2)} / Q${maxValue.toFixed(2)} (${percentage.toFixed(2)}%)`;

        updateTable();

        if (totalValue >= 35000 && !document.getElementById('message-35000')) {
            showMessage('¡Estamos a punto de alcanzar la meta!');
        }

        if (totalValue >= maxValue) {
            showConfetti();
            setTimeout(() => {
                showMessage('¡Lo logramos! Gracias por las donaciones que Dios los Benndiga!');
            }, 500);
        }

        document.getElementById('editingIndex').value = '';
        document.getElementById('donorName').value = '';
        document.getElementById('donationAmount').value = '';
    }
});

document.getElementById('prevPage').addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        updateTable();
    }
});

document.getElementById('nextPage').addEventListener('click', function() {
    if (currentPage < Math.ceil(donations.length / donationsPerPage)) {
        currentPage++;
        updateTable();
    }
});

function updateTable() {
    const donationsTable = document.querySelector('#donationsTable tbody');
    donationsTable.innerHTML = '';

    const start = (currentPage - 1) * donationsPerPage;
    const end = start + donationsPerPage;
    const currentDonations = donations.slice(start, end);

    currentDonations.forEach((donation, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${donation.donorName}</td><td>Q${donation.donationAmount.toFixed(2)}</td><td><button onclick="editDonation(${start + index})">Editar</button></td>`;
        donationsTable.appendChild(row);
    });

    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === Math.ceil(donations.length / donationsPerPage);
}

function editDonation(index) {
    const donation = donations[index];
    document.getElementById('donorName').value = donation.donorName;
    document.getElementById('donationAmount').value = donation.donationAmount;
    document.getElementById('editingIndex').value = index;
}

function showMessage(message) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.id = `message-${totalValue}`;
    messageDiv.textContent = message;
    messagesDiv.appendChild(messageDiv);
    setTimeout(() => {
        messageDiv.style.opacity = 1;
    }, 100);
}

function showConfetti() {
    const confetti = document.getElementById('confetti');
    confetti.style.display = 'block';

    for (let i = 0; i < 100; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.classList.add('confetti-piece');
        confettiPiece.style.left = Math.random() * 100 + 'vw';
        confettiPiece.style.animationDelay = Math.random() * 2 + 's';
        confetti.appendChild(confettiPiece);
    }

    setTimeout(() => {
        confetti.style.display = 'none';
    }, 5000);
}
