const copyToClipboard = async () => {
    try {
        const element = document.getElementById("copiar");
        await navigator.clipboard.writeText(element.textContent);
        // Optional: Provide feedback or perform additional actions upon successful copy
    } catch (error) {
        console.error("Falha para copiar para o clipboard:", error);
        // Optional: Handle and display the error to the user
    }
};
function limparInput() {
    try {
        document.getElementById("codigos").value = "";
        // document.getElementById("contar-linhas").checked = false;
        // document.getElementById("contar-linhas").disabled = true;
        document.getElementById("informar-arquivo").checked = false;
        informarArquivoClick();
    } catch (error) {
        console.error("Erro ao limpar o TextArea:", error);
        // Optional: Handle and display the error to the user
    }
};
function gerarComando() {
    const codigos = document.getElementById("codigos");
    const contarLinhas = document.getElementById("contar-linhas");
    const informarArquivo = document.getElementById("informar-arquivo");
     
    var linhas = codigos.value.split(/[\n\s]/).filter( l => l.trim()).map( l => '^'+l+'|ContaPai:'+l);
    comando = "grep -E '";
    for(i=0;i < linhas.length; i++){
        comando += linhas[i] + ( i < linhas.length - 1 ? "|" : "");
    }
    
    comando += "'";
    
    nomeArquivo = (informarArquivo.checked ? document.getElementById('file-name').value : "") 
    if (nomeArquivo.length > 0) {
        comando += ' > ' + nomeArquivo + (contarLinhas.checked ? ' | wc -l' : '')
    }
    
    document.getElementById("copiar").textContent=comando
};
function informarArquivoClick() {
    var contarLinhas = document.getElementById("contar-linhas");
    var inputFile = document.getElementById("input-file");
    const informarArquivo = document.getElementById("informar-arquivo");
    if (informarArquivo.checked == true) {
        contarLinhas.disabled = false;
        inputFile.classList.remove("input-file");
        
    } else {
        contarLinhas.disabled = true;
        inputFile.classList.add("input-file");
        inputFile.querySelector("#file-name").value = '';
    }
};
