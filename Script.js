// Smooth scrolling for navbar links
document.querySelectorAll('#navbar a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Get the submit button
const submitBtn = document.getElementById("submitBtn");

// Create a container to display messages (you can also add <div id="messagesContainer"></div> in HTML)
let messagesContainer = document.getElementById("messagesContainer");
if (!messagesContainer) {
    messagesContainer = document.createElement("div");
    messagesContainer.id = "messagesContainer";
    messagesContainer.style.marginTop = "20px";
    document.body.appendChild(messagesContainer);
}

// Function to display all messages
function displayMessages() {
    messagesContainer.innerHTML = ""; // Clear previous messages
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.forEach((msg, index) => {
        const msgDiv = document.createElement("div");
        msgDiv.style.border = "1px solid #ccc";
        msgDiv.style.padding = "10px";
        msgDiv.style.margin = "10px 0";
        msgDiv.style.borderRadius = "5px";
        msgDiv.innerHTML = `
            <strong>Name:</strong> ${msg.name} <br>
            <strong>Email:</strong> ${msg.email} <br>
            <strong>Phone:</strong> ${msg.phone} <br>
            <strong>Message:</strong> ${msg.message} <br>
            <strong>Time:</strong> ${msg.time} <br>
            <button onclick="deleteMessage(${index})">Delete</button>
        `;
        messagesContainer.appendChild(msgDiv);
    });
}

// Function to delete a message
function deleteMessage(index) {
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.splice(index, 1); // Remove the message
    localStorage.setItem("messages", JSON.stringify(messages));
    displayMessages(); // Refresh the display
}

// Display messages on page load
displayMessages();

// Form submission
submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation
    if (name === "" || email === "" || phone === "" || message === "") {
        alert("Please fill all the fields");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email");
        return;
    }

    if (phone.length < 10 || isNaN(phone)) {
        alert("Please enter a valid phone number");
        return;
    }

    // Store data in localStorage
    const userData = {
        name,
        email,
        phone,
        message,
        time: new Date().toLocaleString()
    };

    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.push(userData);
    localStorage.setItem("messages", JSON.stringify(messages));

    alert("Message submitted successfully!");

    // Clear form
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("message").value = "";

    // Refresh displayed messages
    displayMessages();
});
