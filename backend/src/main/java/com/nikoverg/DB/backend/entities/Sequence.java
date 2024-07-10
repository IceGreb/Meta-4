package com.nikoverg.DB.backend.entities;

public class Sequence {
    private String value;
    private int length;
    private double molWeight;
    private String crc64;
    private String md5;

    public Sequence() {
    }

    public Sequence(String value, int length, double molWeight, String crc64, String md5) {
        this.value = value;
        this.length = length;
        this.molWeight = molWeight;
        this.crc64 = crc64;
        this.md5 = md5;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public double getMolWeight() {
        return molWeight;
    }

    public void setMolWeight(double molWeight) {
        this.molWeight = molWeight;
    }

    public String getCrc64() {
        return crc64;
    }

    public void setCrc64(String crc64) {
        this.crc64 = crc64;
    }

    public String getMd5() {
        return md5;
    }

    public void setMd5(String md5) {
        this.md5 = md5;
    }
}
