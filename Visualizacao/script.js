function renderHash(data) {
    document.getElementById("global-depth").innerText =
      "Profundidade Global: " + data.globalDepth;
  
    const container = document.getElementById("hash-table-container");
    container.innerHTML = ""; // limpa anterior
  
    for (const prefixo in data.buckets) {
      const bucket = data.buckets[prefixo];
  
      const row = document.createElement("div");
      row.className = "hash-row";
  
      const dir = document.createElement("div");
      dir.className = "directory";
      dir.textContent = prefixo;
  
      const arrow = document.createElement("div");
      arrow.className = "arrow";
      arrow.textContent = "→";
  
      const bucketDiv = document.createElement("div");
      bucketDiv.className = "bucket";
  
      const depth = document.createElement("div");
      depth.className = "local-depth";
      depth.textContent = `p'=${bucket.localDepth || 2}`;
  
      const values = document.createElement("div");
      values.className = "values";
  
      const keys = bucket.values || bucket;
      for (let i = 0; i < keys.length; i++) {
        const val = document.createElement("div");
        val.className = "value";
        val.textContent = keys[i];
        values.appendChild(val);
      }
  
      bucketDiv.appendChild(depth);
      bucketDiv.appendChild(values);
  
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
      console.log("Número inserido:", valor);
      input.value = "";
    } else {
      alert("Digite um número válido.");
    }
  }
  
  // Dados de exemplo
  const exemplo = {
    globalDepth: 2,
    buckets: {
      "00": { localDepth: 2, values: [4, 24, 16] },
      "01": { localDepth: 2, values: [9] },
      "10": { localDepth: 2, values: [6, 22, 10] },
      "11": { localDepth: 2, values: [7, 31] }
    }
  };
  
  renderHash(exemplo);
  