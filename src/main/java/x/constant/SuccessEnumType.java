package x.constant;

public enum SuccessEnumType {

    /**
     * {"code":600,"msg":"请求成功"}
     */
    requestOk(600);

    private int status;

    SuccessEnumType(int status) {
        this.status = status;
    }

    public int getStatus() {
        return status;
    }
}
