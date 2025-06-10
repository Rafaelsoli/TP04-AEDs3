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

    hash(valor) {
        return valor & ((1 << this.p) - 1); // últimos p bits
    }

    inserir(valor) {
        if (this.buscar(valor)) {
            console.log(`Valor ${valor} já existe na tabela. Não será inserido novamente.`);

            Swal.fire (`Valor ${valor} já está na tabela!`, "", "warning");
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

// Pede input ao usuário usando SweetAlert2
function solicitarInput (mensagem, placeholder = "", tipo = "text") 
{
    return Swal.fire ({
        title: mensagem,
        input: tipo,
        inputPlaceholder: placeholder,
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancelar",
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then (resultado => 
    {
        console.log("Resultado do Swal:", resultado);
        if (resultado.isConfirmed) 
        {
            return resultado.value;
        }

        return null;
    });
}


//////////////////////////////////

let tabela = null;

async function criarTabela () 
{
    if (tabela !== null) 
    {
        const confirmar = window.confirm("Já existe uma tabela criada. Deseja criar uma nova e descartar a atual?");
        if (!confirmar) 
        {
            console.log("Criação de nova tabela cancelada.");
            return;
        }
    }

    const resposta = await solicitarInput ("Insira a capacidade por bucket:");

    if (resposta === null)
    {
        console.log ("Usuário cancelou o input.");
        return;
    }

    if (resposta.trim() === "" || isNaN(resposta))
    {
        await Swal.fire ("Capacidade inválida. A tabela não foi criada.", "", "error");
        return;
    }

    const capacidade = parseInt(resposta, 10);

    if (capacidade <= 0)
    {
        await Swal.fire ("Capacidade inválida. A tabela não foi criada.", "", "error");
        return;
    }

    tabela = new Tabela(capacidade);
    console.log("Nova tabela criada com capacidade " + tabela.capacidade);
    await Swal.fire ("Nova tabela criada com sucesso!", "", "success");
}



async function adicionarNaTabela() {
    if (tabela != null) {
        let valor = await solicitarInput ("Valor a ser inserido:");

        // Verificação de valor nulo, vazio ou não numérico
        if (valor === null || valor.trim() === "" || isNaN(valor)) {
            Swal.fire ("Por favor, insira um valor numérico válido.", "", "warning");
            console.log("Valor inválido inserido. Operação cancelada.");
            return;
        }

        valor = parseInt(valor, 10);
        tabela.inserir(valor);
        console.log("Valor inserido: " + valor);
    } else {
        console.log("Tabela inexistente");
        Swal.fire ("Tabela inexistente", "", "error");
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
            // Tabela em si
            saida += `<p class='tupla'> <span class="dir">Dir[${i.toString(2).padStart(tabela.p, '0')}]</span>` +
            
            
            ` → <span class="bucket">${JSON.stringify(bucket.itens)}</span></p>`;
        });

        // Algo a ser anexado depois da tabela
        saida += "";

        document.getElementById("saida").innerHTML = saida;
    }
    else 
    {
        console.log ("Tabela inexistente");
        Swal.fire  ("Tabela inexistente", "", "error");
    }
}