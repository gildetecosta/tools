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
        document.getElementById("arquivo-origem").checked = false;
        document.getElementById("arquivo-destino").checked = false;
        document.getElementById("contar-linhas").checked = false;
        informarArquivoClick();
    } catch (error) {
        console.error("Erro ao limpar o TextArea:", error);
        // Optional: Handle and display the error to the user
    }
};
function gerarComando() {
    const codigos = document.getElementById("codigos");
    const resultadoComando = document.getElementById("copiar");
    const checkBoxContarLinhas = document.getElementById("contar-linhas");
    const checkBoxOutput = document.getElementById("arquivo-destino");
    const checkBoxInput = document.getElementById("arquivo-origem");
     
    const inputFileInput = document.getElementById('input-file').querySelector("#file-name");
    const inputFileOuput = document.getElementById('output-file').querySelector("#file-name");

    const linhas = codigos.value.split(/[\n\s]/).filter( l => l.trim()).map( l => '^'+l+'|ContaPai:'+l);

    let comando = "grep -E '";

    for(i=0;i < linhas.length; i++){
        comando += linhas[i] + ( i < linhas.length - 1 ? "|" : "");
    }
    
    comando += "' ";
    
    let nomeArquivo = (checkBoxInput.checked ? inputFileInput.value.trim() : "") 
    if (nomeArquivo.length > 0) {
        comando += nomeArquivo
    }

    nomeArquivo = (checkBoxOutput.checked ? inputFileOuput.value.trim() : "") 
    if (nomeArquivo.length > 0) {
        comando += ' | tee ' + nomeArquivo + (checkBoxContarLinhas.checked ? ' | wc -l' : '')
    }
    
    resultadoComando.textContent=comando
};
function informarArquivoClick() {
    const checkBoxContarLinhas = document.getElementById("contar-linhas");
    const divOutput = document.getElementById("output-file");
    const divInput = document.getElementById("input-file");
    const checkBoxOutput = document.getElementById("arquivo-destino");
    const checkBoxInput = document.getElementById("arquivo-origem");
    if (checkBoxOutput.checked == true) {
        checkBoxContarLinhas.disabled = false;
        divOutput.classList.remove("hide-file-field");
        
    } else {
        checkBoxContarLinhas.disabled = true;
        divOutput.classList.add("hide-file-field");
        divOutput.querySelector("#file-name").value = '';
    }

    if (checkBoxInput.checked == true) {
        divInput.classList.remove("hide-file-field");
        
    } else {
        divInput.classList.add("hide-file-field");
        divInput.querySelector("#file-name").value = '';
    }
};
