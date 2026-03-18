const data = JSON.parse(localStorage.getItem("moneyData")) || [];

let editId = null;
const tbody = document.getElementById("tbody");
const searchInput = document.getElementById("search");

searchInput.addEventListener("input", function () {
  const value = searchInput.value.toLowerCase();

  const filtered = data.filter(person =>
    person.Name.toLowerCase().includes(value)
  );
  showData(filtered);
});

function deleteData(id) {
  const index = data.findIndex(person => person.Id == id);

  if (index !== -1) {
    data.splice(index, 1);
    showData(data);
    localStorage.setItem("moneyData", JSON.stringify(data));
  }
}

function editData(id) {
  const person = data.find((p) => {
    return p.Id == id
  });
  document.getElementById("name").value = person.Name;
  document.getElementById("phone").value = person.Phone;
  document.getElementById("taken").value = person.Taken;
  document.getElementById("given").value = person.Given;
  document.getElementById("mode").value = person.Mode;

  editId = id;
};


function showData(list) {
  tbody.innerHTML = "";

  list.forEach(person => {
    const Balance = person.Taken - person.Given;
    const row = `
        <tr>
        <td>${person.Id}</td>
        <td>${person.Name}</td>
        <td>${person.Phone}</td>
        <td>${person.Taken}</td>
        <td>${person.Given}</td>
        <td>${Balance}</td>
        <td>${person.Date}</td>
        <td>${person.Mode}</td>
        <td>
        <button onclick="deleteData(${person.Id})">Delete</button>
        <button onclick="editData(${person.Id})">Edit</button>
        </td>
      </tr>
        `;
    tbody.innerHTML += row;
  });
}

showData(data);

document.querySelectorAll(".information input")
  .forEach(input => input.value = "");

function addData() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const taken = Number(document.getElementById("taken").value);
  const given = Number(document.getElementById("given").value);
  const mode = document.getElementById("mode").value;

  if (!name || !phone || !taken || !given || !mode) {
    alert("Please fill all fields");
    return;
  }

  document.querySelectorAll(".information input").forEach(input => input.value = "");

  const newEntry = {
    Id: Date.now(),
    Name: name,
    Phone: phone,
    Taken: taken,
    Given: given,
    Date: new Date().toLocaleDateString(),
    Mode: mode
  };

  data.push(newEntry);
  showData(data);
  localStorage.setItem("moneyData", JSON.stringify(data));
}
