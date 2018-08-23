package x.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import x.constant.FailEnumType;
import x.constant.SuccessEnumType;
import x.service.LoginManagerService;
import x.util.CaptchaUtil;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;


@Controller
@RequestMapping("/captcha")
public class CaptchaController {

    private final LoginManagerService loginManager;

    @Autowired
    private CaptchaController(LoginManagerService loginManager) {
        Assert.notNull(loginManager, "loginManager must not be null!");
        this.loginManager = loginManager;
    }

    @RequestMapping(value = "/check", method = RequestMethod.POST)
    @ResponseBody()
    public Object checkCaptcha
            (@RequestParam(required = false, defaultValue = "1", value = "captcha") String captcha
                    , HttpSession session, HttpServletRequest request) {
        Object sessionCaptcha = session.getAttribute("captcha");
        Map<String, Object> map = new HashMap<String, Object>();
        if (sessionCaptcha != null &&
                ((String) sessionCaptcha).equalsIgnoreCase(captcha)) {
            String ip = request.getRemoteAddr();
            Object id = session.getAttribute("managerid");
            if (!(StringUtils.isEmpty(ip) || StringUtils.isEmpty(id))) {
                loginManager.updateManagerLoginIdById(request.getRemoteAddr(), (String) session.getAttribute("managerid"));
                map.put("code", SuccessEnumType.requestOk.getStatus());
                map.put("message", SuccessEnumType.requestOk);
                return map;
            }
        }

        map.put("code", FailEnumType.authErr.getErrorValue());
        map.put("message", FailEnumType.authErr);
        return map;
    }

    @RequestMapping("/next")
    public void next(HttpServletResponse response, HttpSession session) {
        try {
            String captcha = CaptchaUtil.getCaptcha(4);
            session.setAttribute("captcha", captcha);
            BufferedImage image = CaptchaUtil.outputCaptchaImg(100, 46, captcha);
            ImageIO.write(image, "png", response.getOutputStream());
        } catch (Exception e) {
        }
    }
}

