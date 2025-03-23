const userContainer = document.getElementById("user-container");
const editForm = document.getElementById("edit-form");
const editInputs = {
  name: document.getElementById("edit-name"),
  username: document.getElementById("edit-username"),
  phone: document.getElementById("edit-phone"),
  website: document.getElementById("edit-website"),
  email: document.getElementById("edit-email"),
};
const loader = document.getElementById("loader");
let currentUser = null;
let users = [];

function showLoader() {
  loader.style.visibility = "visible";
}

function hideLoader() {
  loader.style.visibility = "hidden";
}

async function getUsers() {
  try {
    showLoader();
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    users = await response.json();
    renderUsers();
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    hideLoader();
  }
}

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
  editForm.classList.add("show");
}

document.getElementById("save-button").addEventListener("click", async () => {
  if (currentUser !== null) {
    showLoader();
    const updatedUser = {
      name: editInputs.name.value,
      username: editInputs.username.value,
      phone: editInputs.phone.value,
      website: editInputs.website.value,
      email: editInputs.email.value,
    };
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${currentUser + 1}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        }
      );
      if (response.ok) {
        users[currentUser] = updatedUser;
        renderUsers();
        editForm.classList.add("hidden");
        editForm.classList.remove("show");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      hideLoader();
    }
  }
});

async function deleteUser(index) {
  showLoader();
  const userCard = userContainer.children[index];
  userCard.classList.add("fade-out");
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${index + 1}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      users.splice(index, 1);
      renderUsers();
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  } finally {
    hideLoader();
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && currentUser !== null) {
    document.getElementById("save-button").click();
  }
});

getUsers();

