package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MyRestController {

    private UserService userService;
    private RoleService roleService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public void setRoleService(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.allUsers();
    }

    @GetMapping("users/{id}")
    public User getUserById(@PathVariable long id) {
        return userService.findById(id);
    }

    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        userService.saveUser(user);
        return user;
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody User user) {
        userService.updateUser(user);
        return user;
    }

    @DeleteMapping("/users/{id}")
    public void removeUser(@PathVariable long id) {
        userService.deleteUser(id);
    }

    @GetMapping("/user")
    public User aboutUser(Principal principal){
        return userService.getUserByUsername(principal.getName());
    }
}
