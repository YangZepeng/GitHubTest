package web;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/")
public class HomeController {
	Log LOG = LogFactory.getLog(this.getClass());

	@RequestMapping(value = "/homeC", method = RequestMethod.GET)

	public String home() {
		return "home";
	}

	@RequestMapping("/sr")
	public String showRegisterForm() {
		LOG.info("***************SR***HERE*******");
		return "registerForm";
	}

}
