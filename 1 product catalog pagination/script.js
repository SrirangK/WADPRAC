const products = [
  { image: "img1.jpg", name: "Wireless Headphones", price: "₹7,999", description: "Noise-cancelling over-ear headphones." },
  { image: "img2.jpg", name: "Smartwatch", price: "₹12,999", description: "Fitness tracking smartwatch." },
  { image: "img3.jpg", name: "Gaming Mouse", price: "₹2,499", description: "Ergonomic gaming mouse." },
  { image: "img4.jpg", name: "Laptop Stand", price: "₹1,999", description: "Adjustable aluminium stand." },
  // Add more dummy products as needed (15–20) to test pagination
];

const itemsPerPage = 10;
let currentPage = 1;

function renderTable() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = products.slice(start, end);

  const tbody = document.getElementById("productBody");
  tbody.innerHTML = "";

  paginatedItems.forEach(product => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${product.image}" alt="${product.name}"></td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.description}</td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${Math.ceil(products.length / itemsPerPage)}`;
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
  }
}

function nextPage() {
  if (currentPage < Math.ceil(products.length / itemsPerPage)) {
    currentPage++;
    renderTable();
  }
}

renderTable();
