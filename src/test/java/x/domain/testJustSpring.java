package x.domain;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import x.service.MService;
import x.service.MathDiy;

import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;
import java.util.concurrent.atomic.AtomicStampedReference;
import java.util.concurrent.locks.Lock;

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

    public class SpinLock {
        private AtomicReference<Thread> owner = new AtomicReference<>();

        public void lock() {
            Thread current = Thread.currentThread();
            while (!owner.compareAndSet(null, current)) {
            }
        }

        public void unlock() {
            Thread current = Thread.currentThread();
            owner.compareAndSet(current, null);
        }
    }

    @Test
    public void testDeadlock() {
        SpinLock spinLock = new SpinLock();
        spinLock.lock();
        System.out.println("1123");
        spinLock.unlock();
    }

    private static AtomicInteger atomicInt = new AtomicInteger(100);
    private static AtomicStampedReference<Integer> atomicStampedRef =
            new AtomicStampedReference<Integer>(100, 0);

    @Test
    public void testABA() {
        try {
            Thread intT1 = new Thread(() -> {
                atomicInt.compareAndSet(100, 101);
                atomicInt.compareAndSet(101, 100);
            });

            Thread intT2 = new Thread(() -> {
                try {
                    TimeUnit.SECONDS.sleep(1);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                boolean c3 = atomicInt.compareAndSet(100, 101);
                System.out.println(c3);        //true
            });

            intT1.start();
            intT2.start();
            intT1.join();
            intT2.join();

            Thread refT1 = new Thread(() -> {
                try {
                    TimeUnit.SECONDS.sleep(1);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                atomicStampedRef.compareAndSet(100, 101,
                        atomicStampedRef.getStamp(), atomicStampedRef.getStamp() + 1);
                atomicStampedRef.compareAndSet(101, 100,
                        atomicStampedRef.getStamp(), atomicStampedRef.getStamp() + 1);
            });

            Thread refT2 = new Thread(() -> {
                int stamp = atomicStampedRef.getStamp();
                System.out.println("before sleep : stamp = " + stamp);    // stamp = 0
                try {
                    TimeUnit.SECONDS.sleep(2);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("after sleep : stamp = " + atomicStampedRef.getStamp());//stamp = 2
                boolean c3 = atomicStampedRef.compareAndSet(100, 101, stamp, stamp + 1);
                System.out.println(c3);        //false
            });

            refT1.start();
            refT2.start();
            refT1.join();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
