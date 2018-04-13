package x.dao;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Repository("dao") //没有实现类DaoImpl，所以将这个注解放在了这里
public interface Dao {
    //通过@Select注释也可以不用写xml直接进行数据库操作，但是在比较复杂的查询情况下还是需要xml的（官方的说法），所以这里还是使用xml的方法
    @Select("SELECT email FROM customer WHERE nick_name = #{name}")
    String getPwByUserNm(@Param("name") String name);
    //@Param是一个注解，表示传进去的参数名字，在xml当中通过@Param括号里面的名字，可以获取到传进去的参数
}

