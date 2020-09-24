package eln.webview.controller;

import eln.webview.model.InformationDTO;
import org.springframework.http.*;
import org.springframework.http.client.support.BasicAuthorizationInterceptor;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

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


    @RequestMapping(value ="/scrom", method = RequestMethod.GET)
    public String AppendCompetiton(Model model
    ,@RequestParam(required = false,name = "courseWareType")  String courseWareType
    ,@RequestParam(required = false,name = "idChapter")  Long idChapter
    ,@RequestParam(required = false,name = "length")  Integer length
    ,@RequestParam(required = false,name = "idCourseWare")  Long idCourseWare
    ,@RequestParam(required = false,name = "totalQuitz")  Integer totalQuitz
    ,@RequestParam(required = false,name = "type")  String type
    ,@RequestParam(required = false,name = "userName")  String userName
    ,@RequestParam(required = false,name = "token")  String token
    ,@RequestParam(required = false,name = "springId")  String springId
    ,@RequestParam(required = false,name = "linkScorm")  String linkScorm
    ) {

//        Map<String, String> params = new HashMap<>();
//        params.put("userName", userName);
//        params.put("idChapter", idChapter.toString());
//        params.put("idCourseWare", idCourseWare.toString());
//
//        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl("http://localhost:8082/api/web-view/permission");
//        for (Map.Entry<String, String> entry : params.entrySet()) {
//            builder.queryParam(entry.getKey(), entry.getValue());
//        }
//        HttpHeaders headers = new HttpHeaders();
//        headers.set("Authorization"," Bearer "+ token);
//        headers.set("Accept", "application/json");
//        RestTemplate restTemplate = new RestTemplate();
//
//        HttpEntity<Boolean> response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, new HttpEntity(headers), Boolean.class);
//        if(response.getBody()){
//            InformationDTO informationDTO = new InformationDTO( courseWareType,  idChapter,  idCourseWare,  length,  totalQuitz,  type,  userName,  token,  springId,  linkScorm);
//            model.addAttribute("infor",informationDTO );
//            return "view";
//        }else {
//            return null;
//        }

        InformationDTO informationDTO = new InformationDTO( courseWareType,  idChapter,  idCourseWare,  length,  totalQuitz,  type,  userName,  token,  springId,  linkScorm);
        model.addAttribute("infor",informationDTO );
        return "view";
    }


}
