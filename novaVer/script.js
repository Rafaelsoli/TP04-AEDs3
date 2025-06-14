//////////////////////////////////////////////////////////////////////

class Bucket {
    constructor(profundidadeLocal, capacidade = 2) {
        this.profundidade = profundidadeLocal;
        this.capacidade = capacidade;
        this.itens = [];
    }

    cheio() {
        return this.itens.length >= this.capacidade;
    }

    inserir(valor) {
        this.itens.push(valor);
    }

    contem(valor) {
        return this.itens.includes(valor);
    }

    remover(valor) {
        this.itens = this.itens.filter(v => v !== valor);
    }
}

class Tabela {
    constructor(capacidadePorBucket = 2) {
        this.p = 1; // profundidade global
        this.capacidade = capacidadePorBucket;
        this.diretorio = [new Bucket(1, capacidadePorBucket), new Bucket(1, capacidadePorBucket)];
    }

    hash(valor) 
    {
        return valor % (2 ** this.p);
    }

    inserir(valor) {
        if (this.buscar(valor)) {
            console.log(`Valor ${valor} já existe na tabela. Não será inserido novamente.`);
            exibir_alerta_erro (`Valor ${valor} já está na tabela!`, "Alerta!");
            return;
        }

        let indice = this.hash(valor);
        let bucket = this.diretorio[indice];

        if (!bucket.cheio()) {
            bucket.inserir(valor);
        } else {
            this.dividirBucket(indice);
            this.inserir(valor); // reinserir após divisão
        }
    }

    dividirBucket(indice) {
        const bucketAntigo = this.diretorio[indice];
        const novaProfundidade = bucketAntigo.profundidade + 1;

        // Se a nova profundidade local ultrapassar a global, dobramos o diretório
        if (novaProfundidade > this.p) {
            this.dobrarDiretorio();
        }

        // Criamos dois novos buckets
        const bucketNovo = new Bucket(novaProfundidade, this.capacidade);
        const bucketReutilizado = new Bucket(novaProfundidade, this.capacidade);

        // Guardamos os itens antigos
        const itensAntigos = bucketAntigo.itens;
        bucketAntigo.itens = [];

        // Atualizamos profundidade local
        bucketReutilizado.profundidade = novaProfundidade;
        bucketNovo.profundidade = novaProfundidade;

        // Atualizamos o diretório: redistribui referências
        const bitmask = (1 << novaProfundidade) - 1;

        for (let i = 0; i < this.diretorio.length; i++) {
            if ((i & ((1 << (novaProfundidade - 1)) - 1)) === (indice & ((1 << (novaProfundidade - 1)) - 1))) {
                // Se o bit mais significativo novo for 0, fica no antigo
                if (((i >> (novaProfundidade - 1)) & 1) === 0) {
                    this.diretorio[i] = bucketReutilizado;
                } else {
                    this.diretorio[i] = bucketNovo;
                }
            }
        }

        // Reinserir os elementos no bucket certo
        for (let valor of itensAntigos) {
            const novoIndice = this.hash(valor);
            this.diretorio[novoIndice].inserir(valor);
        }
    }


    dobrarDiretorio() {
        this.p++;
        let tamanhoAntigo = this.diretorio.length;
        for (let i = 0; i < tamanhoAntigo; i++) {
            this.diretorio.push(this.diretorio[i]);
        }
    }

    buscar(valor) {
        let indice = this.hash(valor);
        return this.diretorio[indice].contem(valor);
    }

    remover(valor) {
        let indice = this.hash(valor);
        this.diretorio[indice].remover(valor);
    }

    mostrar() {
        console.log("Profundidade global:", this.p);
        this.diretorio.forEach((bucket, i) => {
            console.log(`Dir[${i.toString(2).padStart(this.p, '0')}] →`, bucket.itens);
        });
    }
}

//////////////////////////////////

let tabela = null;

async function criarTabela() {
    if (tabela !== null) {
        const confirmar = await exibir_confirmar("Já existe uma tabela criada. Deseja criar uma nova e descartar a atual?");
        if (!confirmar) {
            console.log("Criação de nova tabela cancelada.");
            return;
        }
    }

    const capacidade = parseInt(await exibir_input ("Insira a capacidade por bucket: "), 10);
    {
        if (isNaN(capacidade) || capacidade <= 0) {
            exibir_alerta_erro("Capacidade inválida. A tabela não foi criada.", "Erro!");
            return;
        }

        tabela = new Tabela(capacidade);
        console.log("Nova tabela criada com capacidade " + tabela.capacidade);
        // 'window.alert("Nova tabela criada com sucesso!");

        exibirDeFormaBurra (); 
    }
}

async function adicionarNaTabela() {
    if (tabela != null) {
        let valor = parseInt(await exibir_input ("Valor a ser inserido: "), 10);
        {
            // Verificação de valor nulo, vazio ou não numérico
            if (valor === null || isNaN(valor)) {
                exibir_alerta_erro("Por favor, insira um valor numérico válido.", "Erro!");
                console.log("Valor inválido inserido. Operação cancelada.");
                return;
            }

            valor = parseInt(valor, 10);
            tabela.inserir(valor);
            console.log("Valor inserido: " + valor);
            exibirDeFormaBurra ();
        }
    } else {
        console.log("Tabela inexistente");
        exibir_alerta_erro("Tabela inexistente", "Erro!");
    }
}

function exibirDeFormaBurra ()
{
    if (tabela != null)
    {
        tabela.mostrar ();

        // Isso vem antes da tabela (fixo)
        let saida = "<p id='prof'>Profundidade global: " + tabela.p + "</p>";

        tabela.diretorio.forEach((bucket, i) => 
        {
            let ocupacao = bucket.itens.length / bucket.capacidade;
            let corClasse = "verde";
            if (ocupacao >= 1) {
                corClasse = "vermelho";
            } else if (ocupacao >= 0.5) {
                corClasse = "amarelo";
            }

            saida += `<p class='tupla'> <span class="dir">Dir[${i.toString(2).padStart(tabela.p, '0')}]</span>` +
                ` → <span class="bucket ${corClasse}">` + bucket.itens.map(item => `<span class="item ${corClasse}">${item}</span>`).join(' ') +
                `</span> <span class="prof">(p=${bucket.profundidade}) (${bucket.itens.length}/${bucket.capacidade})</span></p>`;

        });

        // função hash visivel textualmente depois da tabela
        saida += `<p id="hash-func">Função hash: <strong>h(x) = x % 2<sup>${tabela.p}</sup> = x % ${2 ** tabela.p}</strong></p>`;

        document.getElementById("saida").innerHTML = saida;
    }
    else 
    {
        console.log ("Tabela inexistente");
        exibir_alerta_erro ("Tabela inexistente", "Erro!");
    }
}

function alternarTema() {
    const temaAtual = document.documentElement.getAttribute("data-theme");
    const novoTema = temaAtual === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", novoTema);
    localStorage.setItem("temaPreferido", novoTema);
  }

  // Aplicar tema salvo
  window.onload = () => {
    const temaSalvo = localStorage.getItem("temaPreferido") || "light";
    document.documentElement.setAttribute("data-theme", temaSalvo);
  };
