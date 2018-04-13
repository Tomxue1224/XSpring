package x.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import x.dao.EmployeeDAO;
import x.dao.EmployeeDAOImpl;
import x.model.EmployeeVo;

import javax.annotation.Resource;
import java.util.List;

@Service
public class EmployeeManagerImpl implements EmployeeManager {

    @Resource
    private EmployeeDAOImpl dao2;

    @Override
    public List<EmployeeVo> getAllEmployees() {
        return dao2.getAllEmployees();
    }
}
