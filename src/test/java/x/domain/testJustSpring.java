package x.domain;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import x.service.MService;
import x.service.MathDiy;

public class testJustSpring {

    @Test
    public void testIOC() {
        //引入spring的配置文件获取上下文
        ApplicationContext context = new ClassPathXmlApplicationContext("src/web/WEB-INF/applicationContext.xml");
        //通过上下文和bean的名字获取service实例，就是刚才在配置文件下配置的第二个
        //其实这里也可以通过依赖注入来实现，不过需要写setter代码不太好看
        MService service = (MService) context.getBean("service");
        String string = service.getPwByUserNm("aa12");
        System.out.println(string);
    }

    @Test
    public void testAOP() {
        ApplicationContext context = new ClassPathXmlApplicationContext("src/web/WEB-INF/applicationContext.xml");
        MathDiy math = context.getBean("math", MathDiy.class);
        int n1 = 100, n2 = 5;
        math.add(n1, n2);
        math.div(n1, n2);
        math.mut(n1, n2);
        math.sub(n1, n2);
    }
}
