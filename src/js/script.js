
document.addEventListener('DOMContentLoaded', () => {
    
    //#region Atualiza números de linhas

        const jsonInput = document.getElementById('jsonInput');
        const jsonLineNumbers = document.getElementById('jsonLineNumbers');

        jsonInput.addEventListener('input', () => updateLineNumbers(jsonInput, jsonLineNumbers));

        const xmlInput = document.getElementById('xmlInput');
        const xmlLineNumbers = document.getElementById('xmlLineNumbers');

        xmlInput.addEventListener('input', () => updateLineNumbers(xmlInput, xmlLineNumbers));

        function updateLineNumbers(textarea, lineNumbersDiv) {
            const lines = textarea.value.split('\n').length;

            lineNumbersDiv.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
            if (textarea.value) {
                lineNumbersDiv.innerHTML += '<br>';
            }
        }
    //#endregion Atualiza números de linhas

    //#region Função para carregar exemplos de arquivos (xml e json)

        // Botões de exemplo
        document.getElementById('jsonExample').addEventListener('click', () => {
            loadExample('/src/data/example.json', (data) => {
                jsonInput.value = data;
                updateLineNumbers(jsonInput, jsonLineNumbers);
            });
        });

        document.getElementById('xmlExample').addEventListener('click', () => {
            loadExample('/src/data/example.xml', (data) => {
                xmlInput.value = data;
                updateLineNumbers(xmlInput, xmlLineNumbers);
            });
        });


        function loadExample(file, callback) {
            fetch(file)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao encontrar o arquivo');
                    }
                    return response.text();
                })
                .then(data => callback(data))
                .catch(error => alert('Erro ao carregar o exemplo: ' + error));
        }

    //#endregion Função para carregar exemplos de arquivos (xml e json)

})
