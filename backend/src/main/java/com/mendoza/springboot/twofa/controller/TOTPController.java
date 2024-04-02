package com.mendoza.springboot.twofa.controller;

import com.mendoza.springboot.twofa.model.User;
import com.mendoza.springboot.twofa.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/2fa")
public class TOTPController {

    @Autowired
    private UserService userService;

    @PostMapping(value = "/users")
    public @ResponseBody
    User createUser(@RequestBody User user) {
        User savedUser = userService.createUser(user);
        savedUser.setPassword("");
        return savedUser;
    }

    @GetMapping(value = "/qrcode/get/{username}")
    public String generateQRCode(@PathVariable("username") String userName) throws Throwable {
        String otpProtocol = userService.generateOTPProtocol(userName);
        System.out.println(otpProtocol);
        return userService.generateQRCode(otpProtocol);
    }

    @PostMapping(value = "/qrcode/validate/{username}")
    public boolean validateTotp(@PathVariable("username") String userName, @Valid @RequestBody String requestJson) {
        JSONObject json = new JSONObject(requestJson);
        return userService.validateTotp(userName, Integer.parseInt(json.getString("totpKey")));
    }

}
