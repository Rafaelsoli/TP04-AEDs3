import aed3.HashExtensivel;
import aed3.RegistroHashExtensivel;

import java.io.*;

public class ParNumero implements RegistroHashExtensivel<ParNumero> {
    private int numero;
    private short TAMANHO = 8;

    public ParNumero() {
        this(-1);
    }

    public ParNumero(int numero) {
        this.numero = numero;
    }

    public int getNumero() {
        return numero;
    }

    @Override
    public int hashCode() {
        return Math.abs(Integer.hashCode(numero));
    }

    public short size() {
        return this.TAMANHO;
    }

    public String toString() {
        return String.valueOf(this.numero);
    }

    public byte[] toByteArray() throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        DataOutputStream dos = new DataOutputStream(baos);
        dos.writeInt(numero);
        byte[] bs = baos.toByteArray();

        byte[] bs2 = new byte[TAMANHO];
        for (int i = 0; i < TAMANHO; i++) bs2[i] = ' ';
        for (int i = 0; i < bs.length && i < TAMANHO; i++) bs2[i] = bs[i];

        return bs2;
    }

    public void fromByteArray(byte[] ba) throws IOException {
        ByteArrayInputStream bais = new ByteArrayInputStream(ba);
        DataInputStream dis = new DataInputStream(bais);
        this.numero = dis.readInt();
    }

    public static int hash(int numero) {
        return Math.abs(Integer.hashCode(numero));
    }
}
