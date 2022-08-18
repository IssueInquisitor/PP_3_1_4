$(document).ready(function () {
    getAllUsers()
})

function getAllUsers() {
    let temp = ''
    fetch('/api/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                temp += `
                <tr>
                <td>${user.id}</td>
                <td>${user.firstname}</td>
                <td>${user.lastname}</td>
                <td>${user.age}</td>
                <td>${user.username}</td>
                <td>${user.roleName}</td>
                <td><button type="button" class="btn btn-info" data-toggle="modal"
                onclick="updateUser('${user.id}')">Edit</button></td>      
                <td><button type="button" class="btn btn-danger" data-toggle="modal" 
                onclick="deleteUser('${user.id}')">Delete</button></td>      
                `
            })
            document.querySelector('#allUsers tbody').innerHTML = temp
            temp = ''
        })
}

function addNewUser() {
    let firstname = document.getElementById('firstname').value
    let lastname = document.getElementById('lastname').value
    let age = document.getElementById('age').value
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value
    let roles = $('[id="newRole"]').val()

    for (let i = 0; i < roles.length; i++) {
        if (roles[i] === 'ROLE_ADMIN') {
            roles[i] = {
                'id': 1,
                'role': 'ROLE_ADMIN'
            }
        }
        if (roles[i] === 'ROLE_USER') {
            roles[i] = {
                'id': 2,
                'role': 'ROLE_USER'
            }
        }
    }

    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            firstname,
            lastname,
            age,
            username,
            password,
            'roles': roles
        })
    })
        .then(() => {
            document.getElementById('home-tab').click()
            getAllUsers()
            document.createUser.reset()
        })
}


function deleteUser(id) {
    let tempModal = ''
    fetch('/api/users/' + id)
        .then(result => result.json())

        .then(user => {
            tempModal = `
            <div class="modal fade" id="deleteuser" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Delete user</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"> 
                                <span aria-hidden="true"></span> 
                            </button>
                        </div>
                            <div class="modal-body">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-sm-3">
                                    </div>
                                        <div class="col-sm-6 text-center">
                                            <form method="DELETE">
                                                <div class="form-group"><label for="deleteId"><b>ID</b></label>
                                                    <input type="text" class="form-control" name="id" value="${user.id}" readonly>
                                                </div>
                                                <div class="form-group"><label for="deleteFirstname"><b>First name</b></label>
                                                    <input type="text" class="form-control" value="${user.firstname}" name="Name" readonly>
                                                </div>
                                                <div class="form-group"><label for="deleteLastname"><b>Last name</b></label>
                                                    <input type="text" class="form-control" value="${user.lastname}" name="lastName" readonly>
                                                </div>
                                                <div class="form-group"><label for="deleteAAge"><b>Age</b></label>
                                                    <input type="number" class="form-control" value="${user.age}" name="age" readonly>
                                                </div>
                                                <div class="form-group"><label for="deleteUsername"><b>Email</b></label>
                                                    <input type="text" class="form-control" value="${user.username}" name="email" readonly>
                                                </div>
                                                <div class="form-group"><label for="deletePassword"><b>Password</b></label>
                                                    <input type="password" class="form-control" name="password" value="${user.password}" readonly>
                                                </div>
                                                <div class="form-group"><label for="select2"><b>Role</b></label>
                                                    <select multiple class="form-control" size="2" name="roles" id="deleteRole" readonly> 
                                                        <option value="ROLE_ADMIN">ADMIN</option>
                                                        <option value="ROLE_USER">USER</option>
                                                    </select>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="col-sm-3"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-danger" onclick="deleteSubmit(${user.id})" data-dismiss="modal">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
            document.getElementById('modal').innerHTML = tempModal
            $("#deleteuser").modal()
        })
        .then(() => {
            getAllUsers()
        })
}

function deleteSubmit(id) {
    fetch('/api/users/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
        .then(() => {
            getAllUsers()
        })
}

function updateUser(id) {
    let tempModal = ''
    fetch('/api/users/' + id)
        .then(result => result.json())
        .then(user => {
            tempModal = `
            <div class="modal fade" id="updateuser" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit user</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"> 
                                <span aria-hidden="true"></span> 
                            </button>
                        </div>
                            <div class="modal-body">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-sm-3">
                                    </div>
                                        <div class="col-sm-6 text-center">
                                            <form method="PUT">
                                                <div class="form-group">
                                                    <label for="editId"><b>ID</b></label>
                                                    <input id="editId" type="text" class="form-control" name="id" value="${user.id}" readonly>
                                                </div>
                                                <div class="form-group"><label for="editFirstname"><b>First name</b></label>
                                                    <input id="editFirstname" type="text" class="form-control" value="${user.firstname}" name="Name">
                                                </div>
                                                <div class="form-group"><label for="editLastname"><b>Last name</b></label>
                                                    <input id="editLastname" type="text" class="form-control" value="${user.lastname}" name="lastName">
                                                </div>
                                                <div class="form-group"><label for="editAge"><b>Age</b></label>
                                                    <input id="editAge" type="number" class="form-control" value="${user.age}" name="age" >
                                                </div>
                                                <div class="form-group"><label for="editUsername"><b>Email</b></label>
                                                    <input id="editUsername" type="text" class="form-control" value="${user.username}" name="email">
                                                </div>
                                                <div class="form-group"><label for="editPassword"><b>Password</b></label>
                                                    <input id="editPassword" type="password" class="form-control" name="password" value="${user.password}">
                                                </div>
                                                <div class="form-group"><label for="editRole"><b>Role</b></label>
                                                    <select id="editRole" multiple class="form-control" size="2" name="roles" id="select2"> 
                                                        <option value="ROLE_ADMIN">ADMIN</option>
                                                        <option value="ROLE_USER">USER</option>
                                                    </select>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="col-sm-3"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary" onclick="updateSubmit()" data-dismiss="modal">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
            document.getElementById('modal').innerHTML = tempModal
            $("#updateuser").modal()
        })
        .then(() => {
            getAllUsers()
        })
}

function updateSubmit() {
    let id = document.getElementById('editId').value
    let firstname = document.getElementById('editFirstname').value
    let lastname = document.getElementById('editLastname').value
    let age = document.getElementById('editAge').value
    let username = document.getElementById('editUsername').value
    let password = document.getElementById('editPassword').value
    let roles = $('[id="editRole"]').val()

    for (let i = 0; i < roles.length; i++) {
        if (roles[i] === 'ROLE_ADMIN') {
            roles[i] = {
                'id': 1,
                'role': 'ROLE_ADMIN'
            }
        }
        if (roles[i] === 'ROLE_USER') {
            roles[i] = {
                'id': 2,
                'role': 'ROLE_USER'
            }
        }
    }

    fetch('/api/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            id,
            firstname,
            lastname,
            age,
            username,
            password,
            'roles': roles
        })
    })
        .then(() => {
            getAllUsers()
        })
}