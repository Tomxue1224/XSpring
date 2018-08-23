
package x.util;

import java.io.UnsupportedEncodingException;
import java.lang.Character.UnicodeBlock;
import java.nio.charset.Charset;
import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

public class StringUtil {

    public static boolean isChineseCharacter(char c) {
        UnicodeBlock ub = UnicodeBlock.of(c);
        return ub == UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS || ub == UnicodeBlock.CJK_COMPATIBILITY_IDEOGRAPHS || ub == UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A || ub == UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_B || ub == UnicodeBlock.CJK_SYMBOLS_AND_PUNCTUATION || ub == UnicodeBlock.HALFWIDTH_AND_FULLWIDTH_FORMS || ub == UnicodeBlock.GENERAL_PUNCTUATION;
    }

    public static boolean isFullWidthCharacter(char c) {
        if (c == 12288 || c > '\uff00' && c < '｟') {
            return true;
        } else if (isChineseCharacter(c)) {
            return true;
        } else {
            return c >= 12352 && c <= 12543;
        }
    }

    public static char toHalfWidthCharacter(char c) {
        if (c == 12288) {
            return ' ';
        } else {
            return c > '\uff00' && c < '｟' ? (char) (c - 'ﻠ') : c;
        }
    }

    public static String toHalfWidthString(CharSequence str) {
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < str.length(); ++i) {
            sb.append(toHalfWidthCharacter(str.charAt(i)));
        }

        return sb.toString();
    }

    public static boolean isFullWidthString(CharSequence str) {
        return charLength(str) == str.length() * 2;
    }

    public static boolean isHalfWidthString(CharSequence str) {
        return charLength(str) == str.length();
    }

    public static int charLength(CharSequence str) {
        int clength = 0;

        for (int i = 0; i < str.length(); ++i) {
            clength += isFullWidthCharacter(str.charAt(i)) ? 2 : 1;
        }

        return clength;
    }

    public static String dup(CharSequence cs, int num) {
        if (!isEmpty(cs) && num > 0) {
            StringBuilder sb = new StringBuilder(cs.length() * num);

            for (int i = 0; i < num; ++i) {
                sb.append(cs);
            }

            return sb.toString();
        } else {
            return "";
        }
    }

    public static String dup(char c, int num) {
        if (c != 0 && num >= 1) {
            StringBuilder sb = new StringBuilder(num);

            for (int i = 0; i < num; ++i) {
                sb.append(c);
            }

            return sb.toString();
        } else {
            return "";
        }
    }

    /**
     * @deprecated
     */
    public static String capitalize(CharSequence s) {
        return upperFirst(s);
    }

    public static String lowerFirst(CharSequence s) {
        if (null == s) {
            return null;
        } else {
            int len = s.length();
            if (len == 0) {
                return "";
            } else {
                char c = s.charAt(0);
                return Character.isLowerCase(c) ? s.toString() : (new StringBuilder(len)).append(Character.toLowerCase(c)).append(s.subSequence(1, len)).toString();
            }
        }
    }

    public static String upperFirst(CharSequence s) {
        if (null == s) {
            return null;
        } else {
            int len = s.length();
            if (len == 0) {
                return "";
            } else {
                char c = s.charAt(0);
                return Character.isUpperCase(c) ? s.toString() : (new StringBuilder(len)).append(Character.toUpperCase(c)).append(s.subSequence(1, len)).toString();
            }
        }
    }

    public static boolean equalsIgnoreCase(String s1, String s2) {
        return s1 == null ? s2 == null : s1.equalsIgnoreCase(s2);
    }

    public static boolean equals(String s1, String s2) {
        return s1 == null ? s2 == null : s1.equals(s2);
    }

    public static boolean startsWithChar(String s, char c) {
        return null != s ? (s.length() == 0 ? false : s.charAt(0) == c) : false;
    }

    public static boolean endsWithChar(String s, char c) {
        return null != s ? (s.length() == 0 ? false : s.charAt(s.length() - 1) == c) : false;
    }

    public static boolean isEmpty(CharSequence cs) {
        return null == cs || cs.length() == 0;
    }

    public static boolean isBlank(CharSequence cs) {
        if (null == cs) {
            return true;
        } else {
            int length = cs.length();

            for (int i = 0; i < length; ++i) {
                if (!Character.isWhitespace(cs.charAt(i))) {
                    return false;
                }
            }

            return true;
        }
    }

    public static boolean isNotBlank(CharSequence cs) {
        return !isBlank(cs);
    }

    public static String trim(CharSequence cs) {
        if (null == cs) {
            return null;
        } else {
            int length = cs.length();
            if (length == 0) {
                return cs.toString();
            } else {
                int l = 0;
                int last = length - 1;

                int r;
                for (r = last; l < length && Character.isWhitespace(cs.charAt(l)); ++l) {
                    ;
                }

                while (r > l && Character.isWhitespace(cs.charAt(r))) {
                    --r;
                }

                if (l > r) {
                    return "";
                } else {
                    return l == 0 && r == last ? cs.toString() : cs.subSequence(l, r + 1).toString();
                }
            }
        }
    }

    public static String brief(String str, int len) {
        if (!isBlank(str) && str.length() + 3 > len) {
            int w = len / 2;
            int l = str.length();
            return str.substring(0, len - w) + " ... " + str.substring(l - w);
        } else {
            return str;
        }
    }

    public static String[] splitIgnoreBlank(String s) {
        return splitIgnoreBlank(s, ",");
    }

    public static String[] splitIgnoreBlank(String s, String regex) {
        if (null == s) {
            return null;
        } else {
            String[] ss = s.split(regex);
            List<String> list = new LinkedList();
            String[] var4 = ss;
            int var5 = ss.length;

            for (int var6 = 0; var6 < var5; ++var6) {
                String st = var4[var6];
                if (!isBlank(st)) {
                    list.add(trim(st));
                }
            }

            return (String[]) list.toArray(new String[list.size()]);
        }
    }

    public static String fillDigit(int d, int width) {
        return alignRight(String.valueOf(d), width, '0');
    }

    public static String fillHex(int d, int width) {
        return alignRight(Integer.toHexString(d), width, '0');
    }

    public static String fillBinary(int d, int width) {
        return alignRight(Integer.toBinaryString(d), width, '0');
    }

    public static String toDigit(int d, int width) {
        return cutRight(String.valueOf(d), width, '0');
    }

    public static String toHex(int d, int width) {
        return cutRight(Integer.toHexString(d), width, '0');
    }

    public static String toBinary(int d, int width) {
        return cutRight(Integer.toBinaryString(d), width, '0');
    }

    public static String cutRight(String s, int width, char c) {
        if (null == s) {
            return null;
        } else {
            int len = s.length();
            if (len == width) {
                return s;
            } else {
                return len < width ? dup(c, width - len) + s : s.substring(len - width, len);
            }
        }
    }

    public static String cutLeft(String s, int width, char c) {
        if (null == s) {
            return null;
        } else {
            int len = s.length();
            if (len == width) {
                return s;
            } else {
                return len < width ? s + dup(c, width - len) : s.substring(0, width);
            }
        }
    }

    public static String alignRight(Object o, int width, char c) {
        if (null == o) {
            return null;
        } else {
            String s = o.toString();
            int len = s.length();
            return len >= width ? s : dup(c, width - len) + s;
        }
    }

    public static String alignLeft(Object o, int width, char c) {
        if (null == o) {
            return null;
        } else {
            String s = o.toString();
            int length = s.length();
            return length >= width ? s : s + dup(c, width - length);
        }
    }

    public static boolean isQuoteByIgnoreBlank(CharSequence cs, char lc, char rc) {
        if (null == cs) {
            return false;
        } else {
            int len = cs.length();
            if (len < 2) {
                return false;
            } else {
                int l = 0;
                int last = len - 1;

                int r;
                for (r = last; l < len && Character.isWhitespace(cs.charAt(l)); ++l) {
                    ;
                }

                if (cs.charAt(l) != lc) {
                    return false;
                } else {
                    while (r > l && Character.isWhitespace(cs.charAt(r))) {
                        --r;
                    }

                    return l < r && cs.charAt(r) == rc;
                }
            }
        }
    }

    public static boolean isQuoteBy(CharSequence cs, char lc, char rc) {
        if (null == cs) {
            return false;
        } else {
            int length = cs.length();
            return length > 1 && cs.charAt(0) == lc && cs.charAt(length - 1) == rc;
        }
    }

    public static boolean isQuoteBy(String str, String l, String r) {
        if (null != str && null != l && null != r) {
            return str.startsWith(l) && str.endsWith(r);
        } else {
            return false;
        }
    }

    public static int maxLength(Collection<? extends CharSequence> coll) {
        int re = 0;
        if (null != coll) {
            Iterator var2 = coll.iterator();

            while (var2.hasNext()) {
                CharSequence s = (CharSequence) var2.next();
                if (null != s) {
                    re = Math.max(re, s.length());
                }
            }
        }

        return re;
    }

    public static <T extends CharSequence> int maxLength(T[] array) {
        int re = 0;
        if (null != array) {
            CharSequence[] var2 = array;
            int var3 = array.length;

            for (int var4 = 0; var4 < var3; ++var4) {
                CharSequence s = var2[var4];
                if (null != s) {
                    re = Math.max(re, s.length());
                }
            }
        }

        return re;
    }

    public static String sNull(Object obj) {
        return sNull(obj, "");
    }

    public static String sNull(Object obj, String def) {
        return obj != null ? obj.toString() : def;
    }

    public static String sBlank(Object obj) {
        return sBlank(obj, "");
    }

    public static String sBlank(Object obj, String def) {
        if (null == obj) {
            return def;
        } else {
            String s = obj.toString();
            return isBlank(s) ? def : s;
        }
    }

    public static String removeFirst(CharSequence str) {
        if (str == null) {
            return null;
        } else {
            return str.length() > 1 ? str.subSequence(1, str.length()).toString() : "";
        }
    }

    public static String removeFirst(String str, char c) {
        return !isEmpty(str) && c == str.charAt(0) ? str.substring(1) : str;
    }

    public static boolean isin(String[] ss, String s) {
        if (null != ss && ss.length != 0 && !isBlank(s)) {
            String[] var2 = ss;
            int var3 = ss.length;

            for (int var4 = 0; var4 < var3; ++var4) {
                String w = var2[var4];
                if (s.equals(w)) {
                    return true;
                }
            }

            return false;
        } else {
            return false;
        }
    }

    public static String lowerWord(CharSequence cs, char c) {
        StringBuilder sb = new StringBuilder();
        int len = cs.length();

        for (int i = 0; i < len; ++i) {
            char ch = cs.charAt(i);
            if (Character.isUpperCase(ch)) {
                if (i > 0) {
                    sb.append(c);
                }

                sb.append(Character.toLowerCase(ch));
            } else {
                sb.append(ch);
            }
        }

        return sb.toString();
    }

    public static String upperWord(CharSequence cs, char c) {
        StringBuilder sb = new StringBuilder();
        int len = cs.length();

        for (int i = 0; i < len; ++i) {
            char ch = cs.charAt(i);
            if (ch == c) {
                do {
                    ++i;
                    if (i >= len) {
                        return sb.toString();
                    }

                    ch = cs.charAt(i);
                } while (ch == c);

                sb.append(Character.toUpperCase(ch));
            } else {
                sb.append(ch);
            }
        }

        return sb.toString();
    }

    public static String escapeHtml(CharSequence cs) {
        if (null == cs) {
            return null;
        } else {
            char[] cas = cs.toString().toCharArray();
            StringBuilder sb = new StringBuilder();
            char[] var3 = cas;
            int var4 = cas.length;

            for (int var5 = 0; var5 < var4; ++var5) {
                char c = var3[var5];
                switch (c) {
                    case '"':
                        sb.append("&quot;");
                        break;
                    case '&':
                        sb.append("&amp;");
                        break;
                    case '\'':
                        sb.append("&#x27;");
                        break;
                    case '<':
                        sb.append("&lt;");
                        break;
                    case '>':
                        sb.append("&gt;");
                        break;
                    default:
                        sb.append(c);
                }
            }

            return sb.toString();
        }
    }


    public static String num2hex(int n) {
        String s = Integer.toHexString(n);
        return n <= 15 ? "0" + s : s;
    }

    public static int hex2num(String hex) {
        return Integer.parseInt(hex, 16);
    }

    private static String _formatSizeForRead(long size, double SZU) {
        if ((double) size < SZU) {
            return String.format("%d bytes", size);
        } else {
            double n = (double) size / SZU;
            if (n < SZU) {
                return String.format("%5.2f KB", n);
            } else {
                n /= SZU;
                if (n < SZU) {
                    return String.format("%5.2f MB", n);
                } else {
                    n /= SZU;
                    return String.format("%5.2f GB", n);
                }
            }
        }
    }

    public static String formatSizeForReadBy1024(long size) {
        return _formatSizeForRead(size, 1024.0D);
    }

    public static String formatSizeForReadBy1000(long size) {
        return _formatSizeForRead(size, 1000.0D);
    }

    public static String changeCharset(CharSequence cs, Charset newCharset) {
        if (cs != null) {
            byte[] bs = cs.toString().getBytes();
            return new String(bs, newCharset);
        } else {
            return null;
        }
    }

}
