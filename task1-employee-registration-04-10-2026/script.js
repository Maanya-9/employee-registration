// ===== 1. LOAD DATA (JSON saved in the browser) =====
var employees = [];
var saved = localStorage.getItem("employees");
if (saved != null) {
  employees = JSON.parse(saved);          // JSON text -> JavaScript array
}
var editingId = "";                       // empty = Register mode, filled = Update mode

// list of all form field ids (same as the keys in JSON)
var fieldIds = ["employeeName", "employeeId", "email", "mobile", "password", "confirmPassword",
                "dob", "department", "designation", "doj", "employmentType"];

// ===== 2. SMALL HELPER FUNCTIONS =====
function saveData() {
  localStorage.setItem("employees", JSON.stringify(employees));   // array -> JSON text
}

function showMessage(text, isGood) {
  var box = document.getElementById("message");
  box.textContent = text;
  if (isGood) {
    box.className = "success";
  } else {
    box.className = "error";
  }
}

// returns position of employee in the array, or -1 if not found
function findEmployee(id) {
  for (var i = 0; i < employees.length; i++) {
    if (employees[i].employeeId.toLowerCase() == id.toLowerCase()) {
      return i;
    }
  }
  return -1;
}

function makeNewId() {
  var number = employees.length + 1;
  while (findEmployee(addZeros(number)) != -1) {
    number = number + 1;
  }
  return addZeros(number);
}

// 1 -> EMP001, 25 -> EMP025
function addZeros(number) {
  if (number < 10) {
    return "EMP00" + number;
  }
  if (number < 100) {
    return "EMP0" + number;
  }
  return "EMP" + number;
}

// ===== 3. VALIDATION =====
// returns "" if OK, otherwise returns the error message
// skipIndex = position of the employee being edited (-1 when adding new)
function validate(emp, skipIndex) {
  for (var i = 0; i < fieldIds.length; i++) {
    var name = fieldIds[i];
    if (emp[name] == "" || emp[name] == undefined) {
      return name + " is required";
    }
  }
  if (emp.gender == "") {
    return "gender is required";
  }
  if (emp.email.indexOf("@") == -1 || emp.email.indexOf(".") == -1) {
    return "Invalid email format";
  }
  if (emp.mobile.length != 10 || isNaN(emp.mobile)) {
    return "Mobile number must be 10 digits";
  }
  if (emp.password != emp.confirmPassword) {
    return "Password and Confirm Password do not match";
  }
  if (skipIndex == -1 && findEmployee(emp.employeeId) != -1) {
    return "Duplicate Employee ID";
  }
  for (var j = 0; j < employees.length; j++) {
    if (j != skipIndex && employees[j].email.toLowerCase() == emp.email.toLowerCase()) {
      return "Duplicate Email Address";
    }
  }
  return "";
}

// ===== 4. CRUD =====

// CREATE
function createEmployee(emp) {
  if (emp.employeeId == "") {
    emp.employeeId = makeNewId();          // auto Employee ID
  }
  var error = validate(emp, -1);
  if (error != "") {
    showMessage(error, false);
    return;
  }
  employees.push(emp);
  saveData();
  showMessage("Employee added: " + emp.employeeId, true);
}

// READ ALL
function showAll() {
  showTable(employees);
  showMessage(employees.length + " employee(s) found", true);
}

// READ BY ID
function getEmployeeById(id) {
  if (id == "") {
    showMessage("Employee ID is missing", false);
    return;
  }
  var index = findEmployee(id);
  if (index == -1) {
    showMessage("Employee not found", false);
    return;
  }
  showTable([employees[index]]);
  showMessage("Employee found", true);
}

// UPDATE
function updateEmployee(id, newData) {
  if (id == "") {
    showMessage("Employee ID is missing", false);
    return;
  }
  var index = findEmployee(id);
  if (index == -1) {
    showMessage("Employee not found", false);
    return;
  }
  newData.employeeId = id;
  if (newData.profilePhoto == "") {
    newData.profilePhoto = employees[index].profilePhoto;   // keep old photo
  }
  var error = validate(newData, index);
  if (error != "") {
    showMessage(error, false);
    return;
  }
  employees[index] = newData;
  saveData();
  showMessage("Employee updated: " + id, true);
}

// DELETE
function deleteEmployee(id) {
  if (id == "") {
    showMessage("Employee ID is missing", false);
    return;
  }
  var index = findEmployee(id);
  if (index == -1) {
    showMessage("Employee not found", false);
    return;
  }
  employees.splice(index, 1);              // remove 1 item
  saveData();
  showMessage("Employee deleted: " + id, true);
}

// SEARCH by ID / Name / Email
function searchEmployee(text) {
  text = text.toLowerCase();
  if (text == "") {
    showMessage("Enter ID, Name or Email to search", false);
    return;
  }
  var found = [];
  for (var i = 0; i < employees.length; i++) {
    var e = employees[i];
    if (e.employeeId.toLowerCase() == text ||
        e.employeeName.toLowerCase().indexOf(text) != -1 ||
        e.email.toLowerCase().indexOf(text) != -1) {
      found.push(e);
    }
  }
  if (found.length == 0) {
    showMessage("No employee found", false);
    return;
  }
  showTable(found);
  showMessage(found.length + " employee(s) found", true);
}

// ===== 5. SCREEN (connects buttons with the functions above) =====

// show employees in the table
function showTable(list) {
  var rows = "";
  for (var i = 0; i < list.length; i++) {
    var e = list[i];
    rows = rows + "<tr>" +
      "<td>" + e.employeeId + "</td>" +
      "<td>" + e.employeeName + "</td>" +
      "<td>" + e.email + "</td>" +
      "<td>" + e.mobile + "</td>" +
      "<td>" + e.gender + "</td>" +
      "<td>" + e.dob + "</td>" +
      "<td>" + e.department + "</td>" +
      "<td>" + e.designation + "</td>" +
      "<td>" + e.doj + "</td>" +
      "<td>" + e.employmentType + "</td>" +
      "<td>" + e.profilePhoto + "</td>" +
      "<td><button onclick=\"editEmployee('" + e.employeeId + "')\">Edit</button> " +
      "<button onclick=\"removeEmployee('" + e.employeeId + "')\">Delete</button></td>" +
      "</tr>";
  }
  document.getElementById("tableBody").innerHTML = rows;
}

// read all values typed in the form
function readForm() {
  var emp = {};
  for (var i = 0; i < fieldIds.length; i++) {
    emp[fieldIds[i]] = document.getElementById(fieldIds[i]).value.trim();
  }
  emp.gender = "";
  var selected = document.querySelector("input[name='gender']:checked");
  if (selected != null) {
    emp.gender = selected.value;
  }
  emp.profilePhoto = "";
  var file = document.getElementById("profilePhoto").files[0];
  if (file != undefined) {
    emp.profilePhoto = file.name;
  }
  return emp;
}

// Register / Update button
function saveForm() {
  if (document.getElementById("terms").checked == false) {
    showMessage("Please accept Terms & Conditions", false);
    return;
  }
  var emp = readForm();
  if (editingId == "") {
    createEmployee(emp);
  } else {
    updateEmployee(editingId, emp);
  }
  if (document.getElementById("message").className == "success") {
    clearForm();
    showTable(employees);
  }
}

// Reset / Clear button
function clearForm() {
  for (var i = 0; i < fieldIds.length; i++) {
    document.getElementById(fieldIds[i]).value = "";
  }
  var radios = document.getElementsByName("gender");
  for (var j = 0; j < radios.length; j++) {
    radios[j].checked = false;
  }
  document.getElementById("profilePhoto").value = "";
  document.getElementById("terms").checked = false;
  document.getElementById("employeeId").disabled = false;
  document.getElementById("registerBtn").textContent = "Register";
  editingId = "";
}

// Edit button in table: put employee data back in the form
function editEmployee(id) {
  var emp = employees[findEmployee(id)];
  for (var i = 0; i < fieldIds.length; i++) {
    document.getElementById(fieldIds[i]).value = emp[fieldIds[i]];
  }
  var radios = document.getElementsByName("gender");
  for (var j = 0; j < radios.length; j++) {
    if (radios[j].value == emp.gender) {
      radios[j].checked = true;
    }
  }
  document.getElementById("employeeId").disabled = true;    // ID cannot change
  document.getElementById("registerBtn").textContent = "Update";
  editingId = id;
  window.scrollTo(0, 0);
}

// Delete button in table
function removeEmployee(id) {
  if (confirm("Delete " + id + " ?")) {
    deleteEmployee(id);
    showTable(employees);
  }
}

// Search button
function searchClick() {
  searchEmployee(document.getElementById("searchBox").value.trim());
}

// Download employees.json file
function downloadJSON() {
  var link = document.createElement("a");
  var file = new Blob([JSON.stringify(employees, null, 2)], { type: "application/json" });
  link.href = URL.createObjectURL(file);
  link.download = "employees.json";
  link.click();
}

showTable(employees);   // show saved data when page opens