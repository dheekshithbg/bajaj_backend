package bajaj.io.demo.controller;

import bajaj.io.demo.model.RequestData;
import bajaj.io.demo.model.ReplyData;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/bfhl")
@CrossOrigin(origins = "http://localhost:5173")
public class BFHLController {

    @PostMapping
    public ReplyData handlePostRequest(@RequestBody RequestData requestData) {
        List<String> numbers = requestData.getData().stream()
                .filter(item -> item.matches("\\d+"))
                .collect(Collectors.toList());

        List<String> alphabets = requestData.getData().stream()
                .filter(item -> item.matches("[a-zA-Z]"))
                .collect(Collectors.toList());

        List<String> lowerCaseAlphabets = alphabets.stream()
                .filter(item -> item.matches("[a-z]"))
                .collect(Collectors.toList());

        String highestLowerCaseAlphabet = lowerCaseAlphabets.stream()
                .max(String::compareTo)
                .orElse("");

        ReplyData response = new ReplyData();
        response.setSuccess(true);
        response.setUserId("ashwin_kashyap_ddmmyyyy"); // Replace with your details
        response.setEmail("ashwin@xyz.com");
        response.setRollNumber("ABCD123");
        response.setNumbers(numbers);
        response.setAlphabets(alphabets);
        response.setHighestLowercaseAlphabet(highestLowerCaseAlphabet.isEmpty() ? new ArrayList<>() : List.of(highestLowerCaseAlphabet));

        return response;
    }

    @GetMapping
    public Map<String, Integer> handleGetRequest() {
        return Map.of("operation_code", 1);
    }
}