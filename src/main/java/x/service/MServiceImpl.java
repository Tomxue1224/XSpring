package x.service;

import org.springframework.stereotype.Service;
import x.dao.Dao;

import javax.annotation.Resource;

@Service("service")
public class MServiceImpl implements MService {

    @Resource
    private Dao idao;

    //实现通过用户名获取密码的服务
    @Override
    public String getPwByUserNm(String name) {
        return this.idao.getPwByUserNm(name);
    }

}
