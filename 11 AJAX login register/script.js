let users = JSON.parse(localStorage.getItem("users")) || [];

function registerUser() {
  const name = document.getElementById("name").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const dob = document.getElementById("dob").value;
  const city = document.getElementById("city").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !username || !password || !email || !mobile || !dob || !city || !address) {
    alert("All fields are required!");
    return;
  }

  if (!/^\d{10}$/.test(mobile)) {
    alert("Enter valid 10-digit mobile number");
    return;
  }

  if (!/^[a-zA-Z0-9_]{4,12}$/.test(username)) {
    alert("Username must be 4-12 characters, no spaces");
    return;
  }

  // Simulate AJAX POST
  setTimeout(() => {
    users.push({ name, username, password, email, mobile, dob, city, address });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");
    window.location.href = "index.html";
  }, 100);
}

function loginUser() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  const matchedUser = users.find(u => u.username === username && u.password === password);

  if (matchedUser) {
    // alert("Login successful!");
    window.location.href = "users.html";
  } else {
    alert("Invalid username or password.");
  }
}

function showUsers() {
  const tableBody = document.getElementById("tbody");
  users.forEach(user => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.mobile}</td>
      <td>${user.dob}</td>
      <td>${user.city}</td>
      <td>${user.address}</td>
    `;
    tableBody.appendChild(row);
  });
}
