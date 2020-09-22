package eln.webview.controller;

import eln.webview.model.InformationDTO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/web-view")
public class ViewController {


    @RequestMapping(value ="/scrom", method = RequestMethod.POST)
    public String AppendCompetiton(Model model,@RequestBody InformationDTO informationDTO) {
        model.addAttribute("infor",informationDTO );
        return "view";
    }


}
