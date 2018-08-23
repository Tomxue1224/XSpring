package x.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import x.constant.FailEnumType;
import x.constant.SuccessEnumType;
import x.model.ManagerLoginVo;
import x.service.LoginManagerService;
import x.util.DataSecurityUtil;
import x.util.StringUtil;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/user")
public class LoginController {

    final LoginManagerService loginManager;

    @Autowired
    public LoginController(LoginManagerService loginManager) {
        Assert.notNull(loginManager, "loginManager must not be null!");
        this.loginManager = loginManager;
    }

    @RequestMapping(value = "/checkLogin", method = RequestMethod.POST)
    @ResponseBody
    public Object checkLogin(HttpServletRequest request,
                             HttpServletResponse response,
                             HttpSession session) {
        String loginId = request.getParameter("loginID");
        String password = request.getParameter("password");
        Map<String, Object> resultMap = new HashMap<>();
        ManagerLoginVo managerLoginVo = loginManager.findManagerByName(loginId, password);
        if (managerLoginVo == null) {
            resultMap.put("code", FailEnumType.usernull.getErrorValue());
            resultMap.put("msg", FailEnumType.usernull);
            return resultMap;
        }
        System.out.println("loginId:" + loginId);
        System.out.println("password:" + password);

        session.setAttribute("managerid", managerLoginVo.getManagerloginId());
        session.setAttribute("mshopid", managerLoginVo.getManagerloginShopid());
        session.setAttribute("managerName", managerLoginVo.getManagerloginTel());
        Cookie cookie = new Cookie("xy_Username", loginId);
        cookie.setMaxAge(Integer.MAX_VALUE);
        response.addCookie(cookie);
        String ip = request.getRemoteAddr();
        if (!ip.equals(managerLoginVo.getManagerloginIp())) {
            resultMap.put("code", FailEnumType.iperr.getErrorValue());
            resultMap.put("msg", FailEnumType.iperr);
            return resultMap;
        }
        resultMap.put("code", SuccessEnumType.requestOk.getStatus());
        resultMap.put("msg", SuccessEnumType.requestOk);
        return resultMap;
    }

    @RequestMapping("/index")
    public String isOk(HttpSession session) {
        String successId = (String) session.getAttribute("managerid");
        if (null == successId) {
            return "redirect:/login.jsp";
        } else {
            return "/page/index";
        }
    }

    @RequestMapping("/logout")
    public String logout(HttpSession session, HttpServletRequest request) {
        session.invalidate();
        request.getSession();
        return "redirect:/user/login";
    }

    @RequestMapping("/shopInfo")
    @Ok("json:{locked:'password|token|alerttime|ip|shopid|managerlogin_id',ignoreNull:false}")
    public Object getShopInfo(HttpSession session) {
        String tableId = (String) session.getAttribute("managerid");
        HashMap resultMap = new HashMap<String, Object>();
        if (tableId == null) {
            resultMap.put("code", 500);
            resultMap.put("msg", "非法访问");
            return resultMap;
        }
        resultMap.put("code", 1000);
        ManagerLoginVo managerloginPojo = loginManager.findManagerById(tableId);

        managerloginPojo.setManagerloginTel(DataSecurityUtil.decryptAES(managerloginPojo.getManagerloginTel(), DataSecurityUtil.password));
        Date createTime = new Date();
        if (!StringUtil.isBlank(managerloginPojo.getManagerloginCreattime())) {
            createTime = new Date(Long.parseLong(managerloginPojo.getManagerloginCreattime()) * 1000);
        }
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy年MM月dd日");
        String createTimeStr = simpleDateFormat.format(createTime);
        managerloginPojo.setManagerloginCreattime(createTimeStr);
        resultMap.put("msg", managerloginPojo);
        return resultMap;
    }

}
