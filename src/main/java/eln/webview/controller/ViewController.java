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


//    @RequestMapping("/scrom")
//    public String AppendCompetiton(Model model) {
//        model.addAttribute("infor",new InformationDTO
//                ("scorm",Long.parseLong(10095+""),Long.parseLong(20368+""),110,10,"1","admin"
//                ,"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInNjb3BlcyI6IlJPTEVfU1VQRVJfQURNSU4iLCJ1bml0IjoiMSIsImlkIjoxNTA3NDIsIkZVTExfTkFNRSI6ImFkbWluICIsImlhdCI6MTYwMDY5NTM2OCwiZXhwIjoxNjAwNzgxNzY4fQ.ObRxwpPyimcrEPGS4zaszjKlFjaNeUXIcQ84C_mFvUI"));
//
//        return "view";
//    }


    @RequestMapping(value ="/scrom", method = RequestMethod.POST)
    public String AppendCompetiton(Model model,@RequestBody InformationDTO informationDTO) {
        model.addAttribute("infor",informationDTO );
        return "view";
    }


}
