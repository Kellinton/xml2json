
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

    //#region 
    //#endregion
})
