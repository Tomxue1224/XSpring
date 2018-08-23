package x.model;

public class ManagerLoginVo {
    private String managerloginId;

    private String managerloginTel;

    private String managerloginPassword;

    private String managerloginToken;

    private String managerloginCreattime;

    private String managerloginAlerttime;

    private String managerloginIp;

    private String managerloginShopid;

    public String getManagerloginId() {
        return managerloginId;
    }

    public void setManagerloginId(String managerloginId) {
        this.managerloginId = managerloginId == null ? null : managerloginId.trim();
    }

    public String getManagerloginTel() {
        return managerloginTel;
    }

    public void setManagerloginTel(String managerloginTel) {
        this.managerloginTel = managerloginTel == null ? null : managerloginTel.trim();
    }

    public String getManagerloginPassword() {
        return managerloginPassword;
    }

    public void setManagerloginPassword(String managerloginPassword) {
        this.managerloginPassword = managerloginPassword == null ? null : managerloginPassword.trim();
    }

    public String getManagerloginToken() {
        return managerloginToken;
    }

    public void setManagerloginToken(String managerloginToken) {
        this.managerloginToken = managerloginToken == null ? null : managerloginToken.trim();
    }

    public String getManagerloginCreattime() {
        return managerloginCreattime;
    }

    public void setManagerloginCreattime(String managerloginCreattime) {
        this.managerloginCreattime = managerloginCreattime == null ? null : managerloginCreattime.trim();
    }

    public String getManagerloginAlerttime() {
        return managerloginAlerttime;
    }

    public void setManagerloginAlerttime(String managerloginAlerttime) {
        this.managerloginAlerttime = managerloginAlerttime == null ? null : managerloginAlerttime.trim();
    }

    public String getManagerloginIp() {
        return managerloginIp;
    }

    public void setManagerloginIp(String managerloginIp) {
        this.managerloginIp = managerloginIp == null ? null : managerloginIp.trim();
    }

    public String getManagerloginShopid() {
        return managerloginShopid;
    }

    public void setManagerloginShopid(String managerloginShopid) {
        this.managerloginShopid = managerloginShopid == null ? null : managerloginShopid.trim();
    }
}