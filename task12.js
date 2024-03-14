document.addEventListener("DOMContentLoaded", async function() {
    // Function to handle form submission
    let form = document.getElementById('my-form');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
		let phone = document.getElementById('phone').value;

		if (name === '' || email === '' || phone === '') {
			alert('Please enter name, email, and phone number.');
			return;
		}
		
		let userData = {
			name: name,
			email: email,
			phone: phone
		};

        try {
            let response = await axios.post('http://localhost:4000/add-user', userData);
            console.log(response.data);
            // You can handle the response here (e.g., display a success message)
        } catch (error) {
            console.error('Error:', error);
            // You can handle errors here (e.g., display an error message)
        }

        // Clear the form fields after submission
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
    });

    // Function to fetch and display existing users on page load
    try {
        let response = await axios.get('http://localhost:4000/add-user');
        // console.log(response.data);
        for (let user of response.data) {
            showToDisplay(user);
        }
    } catch (error) {
        console.log(error);
    }
});

// Function to display user data on the page
function showToDisplay(userData) {
    let { Name, Mail, id } = userData;

    const userlist = document.querySelector('#users');
    const li = document.createElement('li');
    li.textContent = Name + " - " + Mail;

    const deleteButton = document.createElement('input');
    deleteButton.type = 'button';
    deleteButton.value = 'Delete';
    deleteButton.className = 'btn btn-danger float-end Extra-Style';

    const updateButton = document.createElement('input');
    updateButton.type = 'button';
    updateButton.className = 'btn btn-primary float-end Extra-Style';
    updateButton.value = 'Edit';

    deleteButton.onclick = async () => {
        try {
            let res = await axios.post('http://localhost:4000/delete-user/', { id })
            console.log(res);
        } catch (err) {
            console.log(err);
        }
        userlist.removeChild(li);
    };

    updateButton.onclick = async () => {
        let newName = prompt("Enter new name:", Name);
        let newEmail = prompt("Enter new email:", Mail);

        if (newName === null || newEmail === null) {
            return; // If user cancels, do nothing
        }

        try {
            let response = await axios.put(`http://localhost:4000/add-user/${id}`, {
                name: newName,
                email: newEmail
            });
            console.log(response.data);
            // You can handle the response here (e.g., display a success message)
            // Update the displayed user information if needed
            Name = newName;
            Mail = newEmail;
            li.textContent = newName + " - " + newEmail;
        } catch (error) {
            console.error('Error:', error);
            // You can handle errors here (e.g., display an error message)
        }
    };

    li.appendChild(deleteButton);
    li.appendChild(updateButton);
    userlist.appendChild(li);
}
