let bucketSize = null;
let globalDepth = 1;
let directory = {};

function createBucket(localDepth) {
  return {
    localDepth,
    values: [],
  };
}

function hash(value) {
  return value.toString(2).padStart(32, '0');
}

function getPrefix(value, depth) {
  return hash(value).slice(32 - depth);
}

function doubleDirectory() {
  globalDepth++;
  const newDirectory = {};
  for (const prefix in directory) {
    newDirectory["0" + prefix] = directory[prefix];
    newDirectory["1" + prefix] = directory[prefix];
  }
  directory = newDirectory;
}

function splitBucket(prefix) {
  const oldBucket = directory[prefix];
  const oldDepth = oldBucket.localDepth;
  const newDepth = oldDepth + 1;

  const bucket1 = createBucket(newDepth);
  const bucket2 = createBucket(newDepth);

  // Redistribuir os valores do bucket antigo entre os dois novos
  for (const val of oldBucket.values) {
    const newPrefix = getPrefix(val, newDepth);
    if (newPrefix.endsWith("0")) {
      bucket1.values.push(val);
    } else {
      bucket2.values.push(val);
    }
  }

  // Atualizar os ponteiros do diretório que apontavam para o bucket antigo
  for (const dirPrefix in directory) {
    if (directory[dirPrefix] === oldBucket) {
      const comparisonBits = dirPrefix.slice(32 - newDepth);
      directory[dirPrefix] = comparisonBits.endsWith("0") ? bucket1 : bucket2;
    }
  }
}

function insert(value) {
  while (true) {
    let prefix = getPrefix(value, globalDepth);
    let bucket = directory[prefix];

    if (!bucket) {
      console.error("Bucket indefinido para prefixo:", prefix);
      return;
    }

    if (bucket.values.length < bucketSize) {
      bucket.values.push(value);
      break;
    }

    if (bucket.localDepth === globalDepth) {
      doubleDirectory();
    }

    splitBucket(prefix);
  }

  renderHash();
}

function renderHash() {
  document.getElementById("global-depth").innerText =
    "Profundidade Global: " + globalDepth;

  const container = document.getElementById("hash-table-container");
  container.innerHTML = "";

  const printed = new Set();

  for (const prefix in directory) {
    const bucket = directory[prefix];

    const row = document.createElement("div");
    row.className = "hash-row";

    const dir = document.createElement("div");
    dir.className = "directory";
    dir.textContent = prefix;

    const arrow = document.createElement("div");
    arrow.className = "arrow";
    arrow.textContent = "→";

    const bucketDiv = document.createElement("div");
    bucketDiv.className = "bucket";

    if (!printed.has(bucket)) {
      printed.add(bucket);

      const depth = document.createElement("div");
      depth.className = "local-depth";
      depth.textContent = bucket.localDepth;

      const valuesDiv = document.createElement("div");
      valuesDiv.className = "values";

      for (const val of bucket.values) {
        const valDiv = document.createElement("div");
        valDiv.className = "value";
        valDiv.textContent = val;
        valuesDiv.appendChild(valDiv);
      }

      bucketDiv.appendChild(depth);
      bucketDiv.appendChild(valuesDiv);
    }

    row.appendChild(dir);
    row.appendChild(arrow);
    row.appendChild(bucketDiv);

    container.appendChild(row);
  }
}

function inserirNumero() {
  const input = document.getElementById("numero-input");
  const valor = parseInt(input.value);
  if (!isNaN(valor)) {
    insert(valor);
    input.value = "";
  } else {
    alert("Digite um número válido.");
  }
}

function iniciar() {
  const capInput = document.getElementById("capacidade-input");
  const cap = parseInt(capInput.value);
  if (!isNaN(cap) && cap > 0) {
    bucketSize = cap;
    globalDepth = 1;
    directory = {
      "0": createBucket(1),
      "1": createBucket(1),
    };
    document.getElementById("inserir-container").style.display = "flex";
    document.getElementById("resetar-container").style.display = "flex";
    document.querySelector(".setup-section").style.display = "none";
    renderHash();
  } else {
    alert("Digite uma capacidade válida.");
  }
}

function resetar() {
  bucketSize = null;
  globalDepth = 1;
  directory = {};
  document.getElementById("hash-table-container").innerHTML = "";
  document.getElementById("global-depth").innerText = "Profundidade Global: ";
  document.getElementById("capacidade-input").value = "";
  document.getElementById("numero-input").value = "";
  document.querySelector(".setup-section").style.display = "flex";
  document.getElementById("inserir-container").style.display = "none";
  document.getElementById("resetar-container").style.display = "none";
}
