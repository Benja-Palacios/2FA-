package com.mendoza.springboot.twofa.controller;

import com.mendoza.springboot.twofa.model.User;
import com.mendoza.springboot.twofa.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class TOTPController {

    @Autowired
    private UserService userService;
    @CrossOrigin(origins = "http://localhost:8080")
    @PostMapping(value = "/users")
    public @ResponseBody
    User createUser(@RequestBody User user) {
        User savedUser = userService.createUser(user);
        savedUser.setPassword("");
        return savedUser;
    }
    @CrossOrigin(origins = "http://localhost:8080")
    @PostMapping(value = "/qrcode/create")
    public String generateQRCode(@RequestBody User user) throws Throwable {
        boolean validatepassword = userService.firstAuth(user.getUsername(), user.getPassword());
        if (validatepassword) {
            String otpProtocol = userService.generateOTPProtocol(user.getUsername());
            System.out.println(otpProtocol);
            return userService.generateQRCode(otpProtocol);
        }
        return "data not found";
    }

    @CrossOrigin(origins = "http://localhost:8080")
    @PostMapping(value = "/qrcode/validate/{username}")
    public boolean validateTotp(@PathVariable("username") String userName, @Valid @RequestBody String requestJson) {
        JSONObject json = new JSONObject(requestJson);
        return userService.validateTotp(userName, Integer.parseInt(json.getString("totpKey")));
    }

}
