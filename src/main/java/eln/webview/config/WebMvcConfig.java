package eln.webview.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {

    @Value("${uploadimage.folder}")
    private String uploadImageFolder;

	@Value("${uploadimage2.folder}")
	private String uploadImageFolder2;


	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		//   file:D:\\data\\file\\image\\
		/*registry.addResourceHandler("/public/image/**").addResourceLocations(uploadImageFolder);*/
		registry.addResourceHandler("/web-view/static/**").addResourceLocations("/static/");
		registry.addResourceHandler("/admin/ckfinder/**").addResourceLocations("/admin/template/ckfinder/");
		registry.addResourceHandler("/admin/ckeditor/**").addResourceLocations("/admin/template/ckeditor/");
		registry.addResourceHandler("/admin/template/**").addResourceLocations("/admin/template/");
		registry.addResourceHandler("/admin/css/**").addResourceLocations("/admin/css/");
		registry.addResourceHandler("/images/**").addResourceLocations(uploadImageFolder);
		registry.addResourceHandler("/public/image/**").addResourceLocations(uploadImageFolder2);
		registry.addResourceHandler("/e-learning/**").addResourceLocations(uploadImageFolder);
		super.addResourceHandlers(registry);
	}

}
