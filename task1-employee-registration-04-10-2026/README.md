# Employee Registration - Backend (JavaScript + JSON)

A beginner-level backend project that handles employee data using **JavaScript** and **JSON**. It performs full CRUD operations, validation, search and error handling. `index.html` is a simple test page used to try the backend in a browser.

## Project Files

| File | Purpose |
|---|---|
| `script.js` | Main backend logic: JSON data handling, validation, CRUD, search and messages |
| `index.html` | Simple test page (form, search box, employee table) to run and show the backend |
| `employees.json` | JSON data file. It starts empty (`[]`) and has the same format as the data downloaded from the page |

## How to Run

1. Keep `index.html`, `script.js` and `employees.json` in the same folder.
2. Open `index.html` in any browser (Chrome, Edge, Firefox).
3. Use the form and buttons to test every operation.

No installation or Node.js is required.

## How Data Is Stored (JSON Handling)

- Employee records are kept in a JavaScript array called `employees`.
- `JSON.stringify()` converts the array to JSON text, which is saved in the browser (`localStorage`) after every add, update and delete.
- `JSON.parse()` converts the saved JSON text back to an array when the page opens, so data stays after refresh.
- A browser cannot write directly to a file on the computer, so the **Download JSON** button is used to export the records as a JSON file.

## Runtime Entries and Download JSON

Employees are added at **run time**, which means while the page is running in the browser.

1. Fill in the form and click **Register**. The employee is added to the `employees` array and saved as JSON in the browser.
2. Add as many employees as needed. Each new entry is added to the same list.
3. Click **Download JSON**. All the entries added so far are converted to JSON and downloaded as a file named `employees.json`.
4. Open the downloaded file to see every registered employee in JSON format.

Important points:
- The downloaded file always contains the **current** list of employees. If an employee is updated or deleted, the next download shows the changes.
- If a file named `employees.json` already exists in the Downloads folder, the browser automatically adds a number to the new file name (for example `employees (1).json`). This is normal browser behavior. The content of the file is the same.
- Clicking **Download JSON** does not change the `employees.json` file stored in this project folder. That file stays as the empty starting file (`[]`). To use the downloaded data, rename the downloaded file to `employees.json` and replace the old one.
- If no employees are registered, the downloaded file contains only `[]`.

Example of a downloaded JSON file with entries added at run time:

```json
[
  {
    "employeeName": "John Doe",
    "employeeId": "EMP001",
    "email": "john@example.com",
    "mobile": "9876543210",
    "password": "12345678",
    "confirmPassword": "12345678",
    "dob": "1998-05-14",
    "department": "IT",
    "designation": "Developer",
    "doj": "2024-07-01",
    "employmentType": "Full Time",
    "gender": "Male",
    "profilePhoto": "john.jpg"
  },
  {
    "employeeName": "Asha Patel",
    "employeeId": "EMP002",
    "email": "asha@example.com",
    "mobile": "9123456780",
    "password": "asha1234",
    "confirmPassword": "asha1234",
    "dob": "1999-02-20",
    "department": "HR",
    "designation": "Manager",
    "doj": "2024-08-10",
    "employmentType": "Full Time",
    "gender": "Female",
    "profilePhoto": ""
  }
]
```

## JSON Employee Data Fields

Employee Name, Employee ID, Email Address, Mobile Number, Password, Confirm Password, Gender, Date of Birth, Department, Designation, Date of Joining, Employment Type, Profile Photo.

## CRUD Operations (in `script.js`)

| Operation | Function | What it does |
|---|---|---|
| Create | `createEmployee()` | Validates the data and adds a new employee |
| Read (all) | `showAll()` | Displays all employees in a table |
| Read by ID | `getEmployeeById()` | Displays one employee by Employee ID |
| Update | `updateEmployee()` | Validates the new data and updates an employee |
| Delete | `deleteEmployee()` | Removes an employee |

## Unique Employee ID

If the Employee ID field is left blank, `makeNewId()` generates an ID such as `EMP001`, `EMP002` and so on. It checks the existing records so the same ID is never used twice. The ID cannot be changed when updating.

## Validation and Error Handling

All checks are done in the `validate()` function. If a check fails, a red error message is shown and nothing is saved.

| Check | Message shown |
|---|---|
| Required fields (all fields except Profile Photo) | `<field> is required` |
| Email must contain `@` and `.` | Invalid email format |
| Mobile must be exactly 10 digits | Mobile number must be 10 digits |
| Password and Confirm Password must match | Password and Confirm Password do not match |
| Duplicate Employee ID (when adding) | Duplicate Employee ID |
| Duplicate Email Address (when adding or updating) | Duplicate Email Address |
| Missing Employee ID (get, update, delete) | Employee ID is missing |
| Employee does not exist (get, update, delete) | Employee not found |
| Invalid data while updating | Same messages as above |
| Terms & Conditions not accepted | Please accept Terms & Conditions |

## Search

`searchEmployee()` finds employees by **Employee ID**, **Name** or **Email**. Name and email searches also match part of the text, and case is ignored. If nothing matches, it shows "No employee found".

## Displaying Data

- `showTable()` displays employee records in a readable table.
- `showMessage()` shows a **green** message for success and a **red** message for errors.

## How to Test on the Page

| To do this | Do this |
|---|---|
| Create | Fill in the form, tick Terms & Conditions, click **Register** |
| Read all | Click **Show All** |
| Read by ID / Search | Type an ID, name or email in the search box and click **Search** |
| Update | Click **Edit** on a row, change the details, click **Update** |
| Delete | Click **Delete** on a row and confirm |
| Clear the form | Click **Reset / Clear** |
| Export the entries added at run time | Click **Download JSON** to get all current entries as a JSON file |

## Notes

- Passwords are stored as plain text to keep this practice project simple. A real application must hash passwords.
- Profile Photo stores only the file name, not the image itself.
- The frontend design for this task is done separately in Figma. `index.html` is only for testing the backend.

## Learning Goal

JavaScript → JSON → Data Handling → Validation → CRUD → Search → Error Handling → Display Data
