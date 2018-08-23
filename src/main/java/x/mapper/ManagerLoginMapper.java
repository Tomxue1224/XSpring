package x.mapper;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import x.model.ManagerLoginVo;

public interface ManagerLoginMapper {
    int deleteByPrimaryKey(String managerloginId);

    int insert(ManagerLoginVo record);

    int insertSelective(ManagerLoginVo record);

    ManagerLoginVo selectByPrimaryKey(String managerloginId);

    //    ManagerLoginVo selectByloginInfo(@Param("tel") String tel, @Param("password") String password);
    ManagerLoginVo selectByloginInfo(String tel, String password);

    @Select("select * from xy_managerlogin where id=#{tableId}")
    ManagerLoginVo selectById(@Param("tableId") String tableId);

    int updateByPrimaryKeySelective(ManagerLoginVo record);

    int updateByPrimaryKey(ManagerLoginVo record);

    int updateManagerLoginip(String ip, String id);
}