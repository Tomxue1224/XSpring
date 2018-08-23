package x.util;

import org.junit.jupiter.api.Test;
import sun.misc.BASE64Encoder;

import javax.crypto.*;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;


public class DataSecurityUtil {
    public static final String ALGORITHM_MD5 = "MD5";
    public static final int LENGTH = 2;
    public static String password = "xingshen";

    /**
     * MD5+ 盐 +BASE64 加密
     *
     * @param encryptStr 加密方法
     * @return
     */
    public static String encryptMD5Base64(String encryptStr, byte[] salt) {
        StringBuilder pwd = new StringBuilder();
        if (encryptStr == null) {
            return null;
        }
        try {
            MessageDigest messageDigest = MessageDigest.getInstance(ALGORITHM_MD5);
            byte[] bys = encryptMD5(messageDigest, encryptStr, salt);

            BASE64Encoder b64Encoder = new BASE64Encoder();
            for (int i = 0; i < LENGTH; i++) {
                pwd.append((char) salt[i]);
            }
            String b64Str = b64Encoder.encode(bys);
            pwd.append(b64Str);

            return pwd.toString();
        } catch (Exception ex) {
            ex.printStackTrace();
            pwd.append("");
        }
        return pwd.toString();
    }

    /**
     * MD5 + 盐
     *
     * @param messageDigest 信息摘要对象
     * @param inputPasswd   输入密码
     * @param salt          盐
     * @return
     * @throws Exception
     */
    public static byte[] encryptMD5(MessageDigest messageDigest,
                                    String inputPasswd, byte[] salt) throws Exception {

        messageDigest.reset();
        messageDigest.update(salt);
        messageDigest.update(inputPasswd.getBytes("UTF-8"));
        byte[] bys = messageDigest.digest();
        for (int i = 0; i < 5; i++) {
            messageDigest.reset();
            bys = messageDigest.digest(bys);
        }
        return bys;
    }

    /**
     * 校验密码
     *
     * @param formPwd 表单密码
     * @param truePwd 后台真正密码
     * @return true 密码一致  false  密码不一致
     * @throws UnsupportedEncodingException
     */
    public static boolean AuthPassword(String formPwd, String truePwd) throws UnsupportedEncodingException {
        byte[] pwdSalt = (truePwd.substring(0, LENGTH)).getBytes("UTF-8");
        String encryptFormPwd = DataSecurityUtil.encryptMD5Base64(formPwd, pwdSalt);
        return truePwd.equals(encryptFormPwd);
    }


    /**
     * 返回指定长度的盐(ASCII码)
     *
     * @return
     */
    public static byte[] getSaltOfASCII() {
        byte[] salt = new byte[LENGTH];
        Random rand = new Random();

        for (int i = 0; i < LENGTH; i++) {
            salt[i] = (byte) ((rand.nextInt('~' - '!') + '!') & 0x007f);
        }
        return salt;
    }

    /**
     * AES解密
     *
     * @param contentStr 加密内容
     * @param password   加密密钥
     * @return 返回解密string值
     */
    public static String decryptAES(String contentStr, String password) {
        try {
            byte[] content = parseHexStr2Byte(contentStr);
            KeyGenerator kgen = KeyGenerator.getInstance("AES");
            kgen.init(128, new SecureRandom(password.getBytes()));
            SecretKey secretKey = kgen.generateKey();
            byte[] enCodeFormat = secretKey.getEncoded();
            SecretKeySpec key = new SecretKeySpec(enCodeFormat, "AES");
            Cipher cipher = Cipher.getInstance("AES");// 创建密码器
            cipher.init(Cipher.DECRYPT_MODE, key);// 初始化
            byte[] result = cipher.doFinal(content);
            return new String(result); // 解密值
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (NoSuchPaddingException e) {
            e.printStackTrace();
        } catch (InvalidKeyException e) {
            e.printStackTrace();
        } catch (IllegalBlockSizeException e) {
            e.printStackTrace();
        } catch (BadPaddingException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * AES加密
     *
     * @param content  加密内容
     * @param password 加密密钥
     * @return
     */
    public static String encryptAES(String content, String password) {
        try {
            KeyGenerator kgen = KeyGenerator.getInstance("AES");
            kgen.init(128, new SecureRandom(password.getBytes()));
            SecretKey secretKey = kgen.generateKey();
            byte[] enCodeFormat = secretKey.getEncoded();
            SecretKeySpec key = new SecretKeySpec(enCodeFormat, "AES");
            Cipher cipher = Cipher.getInstance("AES");// 创建密码器
            byte[] byteContent = content.getBytes("utf-8");
            cipher.init(Cipher.ENCRYPT_MODE, key);// 初始化
            byte[] result = cipher.doFinal(byteContent);
            String resultStr = parseByte2HexStr(result);
            return resultStr; // 加密
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (NoSuchPaddingException e) {
            e.printStackTrace();
        } catch (InvalidKeyException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IllegalBlockSizeException e) {
            e.printStackTrace();
        } catch (BadPaddingException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 将16进制转换为二进制
     *
     * @param hexStr
     * @return
     */
    private static byte[] parseHexStr2Byte(String hexStr) {
        if (hexStr.length() < 1)
            return null;
        byte[] result = new byte[hexStr.length() / 2];
        for (int i = 0; i < hexStr.length() / 2; i++) {
            int high = Integer.parseInt(hexStr.substring(i * 2, i * 2 + 1), 16);
            int low = Integer.parseInt(hexStr.substring(i * 2 + 1, i * 2 + 2), 16);
            result[i] = (byte) (high * 16 + low);
        }
        return result;
    }

    /**
     * 将二进制转换成16进制
     *
     * @param buf
     * @return
     */
    private static String parseByte2HexStr(byte buf[]) {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < buf.length; i++) {
            String hex = Integer.toHexString(buf[i] & 0xFF);
            if (hex.length() == 1) {
                hex = '0' + hex;
            }
            sb.append(hex.toUpperCase());
        }
        return sb.toString();
    }

    @Test
    public void test() {
        String content = "123456";
        String str1 = DataSecurityUtil.encryptMD5Base64(("13111976593"), "xingshen".getBytes());
        String str2 = DataSecurityUtil.encryptMD5Base64(("1111"), "222".getBytes());


        /**
         * 手机号码解密
         *
         */
        System.out.println(DataSecurityUtil.decryptAES(
                "6786D17B2503CB14CF3C8A9B5AD81626", DataSecurityUtil.password));

        System.out.println(DataSecurityUtil.encryptAES(
                "13111976593", DataSecurityUtil.password));
    }

}
