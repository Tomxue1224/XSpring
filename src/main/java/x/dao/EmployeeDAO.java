package x.dao;

import org.springframework.stereotype.Repository;
import x.model.EmployeeVo;

import java.util.List;


public interface EmployeeDAO {
    public List<EmployeeVo> getAllEmployees();
}
