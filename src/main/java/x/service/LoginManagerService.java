package x.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import x.mapper.ManagerLoginMapper;
import x.model.ManagerLoginVo;

@Service
public class LoginManagerService {

    private final ManagerLoginMapper managerLoginMapper;

    @Autowired
    public LoginManagerService(ManagerLoginMapper managerLoginMapper) {
        Assert.notNull(managerLoginMapper, "managerLoginMapper must not be null!");
        this.managerLoginMapper = managerLoginMapper;
    }


    public ManagerLoginVo findManagerByName(String userName, String password) {
        return managerLoginMapper.selectByloginInfo(userName, password);
    }

    public ManagerLoginVo findManagerById(String tableId) {
        return managerLoginMapper.selectByPrimaryKey(tableId);
    }

    public int updateManagerLoginIdById(String id, String ip) {
        return managerLoginMapper.updateManagerLoginip(ip, id);
    }
}
