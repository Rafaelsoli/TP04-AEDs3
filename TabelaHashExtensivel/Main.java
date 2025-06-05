import java.util.Scanner;
import java.io.File;
import aed3.HashExtensivel;


public class Main {
    public static void main(String[] args) {
        Scanner console = new Scanner(System.in);
        HashExtensivel<ParNumero> hash;
        String nomeArquivo = "numeros";

        try {
            File d = new File("dados");
            if (!d.exists()) d.mkdir();

            hash = new HashExtensivel<>(
                ParNumero.class.getConstructor(), 
                4, 
                "dados/" + nomeArquivo + ".hash_d.db", 
                "dados/" + nomeArquivo + ".hash_c.db"
            );

            int opcao;
            do {
                System.out.println("\nMENU");
                System.out.println("1 - Inserir número");
                System.out.println("2 - Buscar número");
                System.out.println("3 - Excluir número");
                System.out.println("4 - Imprimir estrutura");
                System.out.println("0 - Sair");

                try {
                    opcao = Integer.parseInt(console.nextLine());
                } catch (NumberFormatException e) {
                    opcao = -1;
                }

                switch (opcao) {
                    case 1:
                        System.out.print("Digite um número inteiro: ");
                        int n = Integer.parseInt(console.nextLine());
                        hash.create(new ParNumero(n));
                        break;
                    case 2:
                        System.out.print("Número a buscar: ");
                        int b = Integer.parseInt(console.nextLine());
                        System.out.println("Resultado: " + hash.read(ParNumero.hash(b)));
                        break;
                    case 3:
                        System.out.print("Número a excluir: ");
                        int x = Integer.parseInt(console.nextLine());
                        hash.delete(ParNumero.hash(x));
                        break;
                    case 4:
                        hash.print();
                        break;
                    case 0:
                        break;
                    default:
                        System.out.println("Opção inválida.");
                }

            } while (opcao != 0);

        } catch (Exception e) {
            e.printStackTrace();
        }

        console.close();
    }
}
