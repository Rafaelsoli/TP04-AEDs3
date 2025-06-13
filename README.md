# ![Ícone](https://static.wikia.nocookie.net/minecraft_gamepedia/images/a/aa/Golden_Carrot_JE4_BE2.png/revision/latest/thumbnail/width/40/height/40?cb=20200430031437) Relatório do TP04-AEDs3

> 🧠 **Algoritimos e Estrutura de Dados III** — Trabalho Prático 04

## 📌 O que o trabalho de vocês faz?
> Este projeto é uma simulação visual e interativa de uma Tabela Hash Extensível, desenvolvida com o objetivo de auxiliar no aprendizado de estruturas de dados dinâmicas.
> Ele permite a inserção de números através de uma interface web simples, exibindo em tempo real como esses valores são distribuídos entre os buckets, conforme a lógica da hash extensível. A interface mostra a profundidade global, os ponteiros do diretório e o conteúdo    de cada cesto (bucket), além da profundidade local de cada um.
> A ideia é demonstrar como a tabela reage ao crescimento de dados, realizando divisões de buckets e aumentando a profundidade quando necessário — tudo de forma visual, didática e sem depender de execução em terminal.
> O projeto é baseado no código Java original do Prof. Marcos Kutova, mas adaptado para funcionar diretamente no navegador, usando HTML, CSS e JavaScript.

## 👨‍💻 Nomes dos Participantes
- Bruno Rafael Santos Oliveira
- Matheus Eduardo Campos Soares
- Thiago Pereira de Oliveira

## 🌐 Link para o site
- https://tp04-aeds3.vercel.app/
  
## 🧱 Estrutura do Projeto

📦 raiz/
├── 📁 novaVer/
│ ├── 📄 index.html → Interface principal da aplicação
│ ├── 🎨 style.css → Estilos visuais da aplicação
│ ├── ⚙️ script.js → Lógica da tabela hash extensível
│ └── 🚨 alertas.js → Alertas e mensagens auxiliares
│
├── 📝 readme.md → Documentação do projeto (você está aqui!)
├── 💬 commitar.bat → Script para facilitar commits no Git
├── 📜 license → Licença de uso do projeto
└── 🎥 video.mp4 → Demonstração da aplicação em vídeo


## 🧪 Experiência

### ✅ Vocês implementaram todos os requisitos?
- [✅] Sim, nós implementamos todos os requistios.

### 🧩 Houve alguma operação mais difícil?
- [✅] Sim, a operação que se mostrou mais desafiadora foi a divisão dos buckets. Esse processo exige uma atenção especial à forma como os dados são redistribuídos entre os buckets após a divisão, garantindo que a estrutura da tabela hash extensível seja mantida corretamente.

### 🧱 Vocês enfrentaram algum desafio na implementação?
- [✅] Com certeza, enfrentamos desafios significativos durante a implementação, especialmente relacionados à divisão dos buckets. Foi necessário um cuidado extra para evitar erros que pudessem comprometer a integridade da estrutura, como a duplicação ou perda de dados.

### 🎯 Os resultados foram alcançados?
- [✅] Sim, todos os objetivos do projeto foram alcançados com sucesso. A tabela hash extensível funciona conforme o esperado.

## ✅ Checklist de Requisitos

- [✅] A visualização interativa da Tabela Hash Extensível foi criada?
- [✅] Há um vídeo de até 2 minutos demonstrando o uso da visualização?
- [✅] O trabalho está funcionando corretamente?
- [✅] O trabalho está completo?
- [✅] O trabalho é original e não a cópia de um trabalho de um colega?

  
## 📎 Observações Finais
>A construção deste projeto foi um exercício desafiador e gratificante. A ideia principal era transformar o conceito da **Tabela Hash Extensível** em uma **experiência visual clara e interativa**, acessível diretamente no navegador.

>**O maior desafio foi encontrar uma forma de visualização que fosse, ao mesmo tempo, intuitiva e fiel ao funcionamento interno da estrutura.** A representação de diretórios binários apontando para buckets, com profundidades locais variáveis e duplicações visuais, >exigiu bastante tentativa e erro até atingir uma interface limpa, funcional e responsiva.

>Optou-se por usar apenas **HTML, CSS e JavaScript puro**, tanto para reforçar os fundamentos quanto para facilitar o entendimento do código por estudantes e curiosos.

Além disso:
- A **interação direta** com o usuário (inserindo números manualmente) simula bem a dinâmica dos dados em uma tabela real.
- O visual com buckets agrupados e cores suaves visa transmitir as mudanças estruturais de forma didática e sem poluição visual.
- A **profundidade global** e as **divisões de cestos** foram tratadas com cuidado para refletirem as regras da técnica de forma precisa.

📚 O projeto foi inspirado na versão em Java do Prof. Marcos Kutova, mas aqui foi completamente adaptado para o ambiente web, com foco em aprendizado visual.


