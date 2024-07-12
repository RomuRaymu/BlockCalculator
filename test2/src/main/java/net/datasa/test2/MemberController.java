package net.datasa.test2;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MemberController {
	@GetMapping("../member/info")
	public String memberInfo() {
		return "memberInfo";
	}
}
