package x.util;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.security.SecureRandom;
import java.util.Random;

public class CaptchaUtil {

    public static final String CAPTCHAS = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

    /**
     * 使用系统默认字符源生成验证码
     *
     * @param captchaSize 验证码长度
     * @return
     */
    public static String getCaptcha(int captchaSize) {
        return getCaptcha(captchaSize, CAPTCHAS);
    }

    /**
     * 使用指定的字符源生成验证码
     *
     * @param captchaSize 验证码长度
     * @param source      字符源
     * @return
     */
    public static String getCaptcha(int captchaSize, String source) {
        if (null == source || source.isEmpty()) {
            source = CAPTCHAS;
        }
        int codeslen = source.length();
        Random random = new Random(System.currentTimeMillis());
        StringBuffer captchaBuffer = new StringBuffer(captchaSize);
        for (int i = 0; i < captchaSize; i++) {
            captchaBuffer.append(source.charAt(random.nextInt(codeslen)));
        }
        return captchaBuffer.toString();
    }

    /**
     * @param w 图片宽度
     * @param h 图片高度
     * @return
     * @throws IOException
     */
    public static BufferedImage outputCaptchaImg(
            int w, int h, String captcha) throws IOException {
        BufferedImage bufferedImage = new BufferedImage(w, h, BufferedImage.TYPE_INT_BGR);
/*		生成透明的png图片在审查Graphics2D对象的时候
		加入getDeviceConfiguration().createCompatibleImage(w, h, Transparency.TRANSLUCENT); 
		然后当背景形状画完以后，输出缓存dispose,然后在重新新建Graphics2D对象*/

        Graphics2D graphics2d = bufferedImage.createGraphics();
        bufferedImage = graphics2d.getDeviceConfiguration().createCompatibleImage(w, h, Transparency.TRANSLUCENT);
//		消除线段的锯齿边缘
        graphics2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        graphics2d.fillRect(0, 0, w, h);
        graphics2d.drawRect(0, 0, w, h);
        graphics2d.dispose();
        graphics2d = bufferedImage.createGraphics();
        graphics2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        int font_size = h - 18;
        Font font = new Font("黑体", Font.BOLD, font_size);

        graphics2d.setColor(Color.BLACK);
        graphics2d.setFont(font);
        char[] chars = captcha.toCharArray();
        for (int i = 0; i < chars.length; i++) {
            graphics2d.drawChars(chars, i, 1, (w / chars.length) * i, h / 2 + font_size / 2 - 10);
        }

        graphics2d.dispose();
        return bufferedImage;
    }

    public static void main(String[] args) {
        SecureRandom secureRandom = new SecureRandom();
        System.out.println(secureRandom.nextInt(100));
    }
}
