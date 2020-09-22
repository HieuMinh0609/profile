package eln.webview.model;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InformationDTO {
   private String courseWareType;
   private Long idChapter;
   private Long idCourseWare;
   private Integer length;
   private Integer totalQuitz;
   private String type;
   private String userName;
   private String token;


   public InformationDTO(String courseWareType, Long idChapter, Long idCourseWare, Integer length, Integer totalQuitz, String type, String userName, String token) {
      this.courseWareType = courseWareType;
      this.idChapter = idChapter;
      this.idCourseWare = idCourseWare;
      this.length = length;
      this.totalQuitz = totalQuitz;
      this.type = type;
      this.userName = userName;
      this.token = token;
   }
}
