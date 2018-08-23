package x.dao;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginDao {

    @Select("SELECT email FROM customer WHERE nick_name = #{name}")
    String getPwByUserNm(@Param("name") String name);
}
