const users = [
    { name: "Leanne Graham", username: "Bret", phone: "1-770-736-8031", website: "hildegard.org", email: "leanne@gmail.com" },
    { name: "Ervin Howell", username: "Antonette", phone: "010-692-6593", website: "anastasia.net", email: "ervin@gmail.com" },
    { name: "Carmen Scott", username: "Carrie", phone: "123-456-7890", website: "example.com", email: "carmen@example.com" },
    { name: "Jane Doe", username: "jdoe", phone: "555-555-5555", website: "janedoe.com", email: "jane@example.com" },
    { name: "John Smith", username: "johnny", phone: "987-654-3210", website: "johnsmith.com", email: "john@example.com" }
];

const userContainer = document.getElementById("user-container");
const editForm = document.getElementById("edit-form");
const editInputs = {
    name: document.getElementById("edit-name"),
    username: document.getElementById("edit-username"),
    phone: document.getElementById("edit-phone"),
    website: document.getElementById("edit-website"),
    email: document.getElementById("edit-email")
};
let currentUser = null;

function renderUsers() {
    userContainer.innerHTML = "";
    users.forEach((user, index) => {
        const userCard = document.createElement("div");
        userCard.classList.add("user-card");
        userCard.innerHTML = `
            <div class="card-header">${user.name}</div>
            <div class="card-username">@${user.username}</div>
            <div class="card-body">
                <div class="card-section"><span>phone</span><strong>${user.phone}</strong></div>
                <div class="card-section"><span>website</span><strong>${user.website}</strong></div>
                <div class="card-section"><span>email</span><strong>${user.email}</strong></div>
            </div>
            <div class="card-actions">
                <button class="edit-btn" onclick="editUser(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteUser(${index})">Delete</button>
            </div>
        `;
        userContainer.appendChild(userCard);
    });
}

function editUser(index) {
    currentUser = index;
    const user = users[index];
    editInputs.name.value = user.name;
    editInputs.username.value = user.username;
    editInputs.phone.value = user.phone;
    editInputs.website.value = user.website;
    editInputs.email.value = user.email;
    editForm.classList.remove("hidden");
    editForm.style.display = 'flex';
}

document.getElementById("save-button").addEventListener("click", () => {
    if (currentUser !== null) {
        users[currentUser] = {
            name: editInputs.name.value,
            username: editInputs.username.value,
            phone: editInputs.phone.value,
            website: editInputs.website.value,
            email: editInputs.email.value
        };
        renderUsers();
        editForm.classList.add("hidden");
        editForm.style.display = 'none'; 
    }
});

function deleteUser(index) {
    users.splice(index, 1);
    renderUsers();
}

renderUsers();
