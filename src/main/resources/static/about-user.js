let userInput = ''
fetch('/api/user')
    .then(response => response.json())
    .then(user => {
        userInput+=`
                <tr>
                <td>${user.id}</td>
                <td>${user.firstname}</td>
                <td>${user.lastname}</td>
                <td>${user.age}</td>
                <td>${user.username}</td>
                <td>${user.roleName}</td>
                </tr>
                `
        document.getElementById('aboutUser').innerHTML = userInput
    }
)
