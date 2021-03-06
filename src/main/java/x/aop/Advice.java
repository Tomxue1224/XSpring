package x.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

/**
 * 通知类，横切逻辑
 */
@Component
@Aspect
public class Advice {
    //切点
    @Pointcut("execution(* x.service.MathDiy.*(..))")
    public void pointcut() {
    }

    @Before("execution(* x.service.MathDiy.*(..))")
    public void before(JoinPoint jp) {
        System.out.print("----------前置通知----------");
        System.out.println(jp.getSignature().getName());
    }

    @After("pointcut()")
    public void after(JoinPoint jp) {
        System.out.println("----------最终通知----------");
    }

    //环绕通知
    @Around("execution(* x.service.MathDiy.s*(..))")
    public Object around(ProceedingJoinPoint pjp) throws Throwable {
        System.out.println(pjp.getSignature().getName());
        System.out.println("----------环绕前置----------");
        Object result = pjp.proceed();
        System.out.println("----------环绕后置----------");
        return result;
    }

    //返回结果通知
    @AfterReturning(pointcut = "execution(* x.service.MathDiy.m*(..))", returning = "result")
    public void afterReturning(JoinPoint jp, Object result) {
        System.out.println(jp.getSignature().getName());
        System.out.println("结果是：" + result);
        System.out.println("----------返回结果----------");
    }

    //异常后通知
    @AfterThrowing(pointcut = "execution(* x.service.MathDiy.d*(..))", throwing = "exp")
    public void afterThrowing(JoinPoint jp, Exception exp) {
        System.out.println(jp.getSignature().getName());
        System.out.println("异常消息：" + exp.getMessage());
        System.out.println("----------异常通知----------");
    }

}
