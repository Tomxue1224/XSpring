package x.dao;

import org.springframework.stereotype.Repository;
import x.model.EmployeeVo;

import java.util.ArrayList;
import java.util.List;

@Repository
public class EmployeeDAOImpl implements EmployeeDAO {
    @Override
    public List<EmployeeVo> getAllEmployees() {
        List<EmployeeVo> employees = new ArrayList<EmployeeVo>();

        EmployeeVo vo1 = new EmployeeVo();
        vo1.setId(1);
        vo1.setFirstName("Lokesh");
        vo1.setLastName("Gupta");
        employees.add(vo1);

        EmployeeVo vo2 = new EmployeeVo();
        vo2.setId(2);
        vo2.setFirstName("Raj");
        vo2.setLastName("Kishore");
        employees.add(vo2);

        return employees;
    }
}


