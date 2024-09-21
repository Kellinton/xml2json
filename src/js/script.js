
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

    //#region Função para converter XML em JSON
        

        document.getElementById('convertXmlToJson').addEventListener('click', () => {
            const xmlText = xmlInput.value;


            if (xmlText.trim() === '') {
                alert('Por favor, insira um XML válido.');
                return;
            }

            try {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, "application/xml");


                const parseError = xmlDoc.getElementsByTagName("parsererror");
                if (parseError.length) {
                    alert('Erro ao converter XML. Verifique se o XML está bem formado.');
                    return;
                }

                const json = xmlToJson(xmlDoc);
                jsonInput.value = JSON.stringify(json, null, 2);
                updateLineNumbers(jsonInput, jsonLineNumbers);
            } catch (e) {
                alert('Erro ao converter XML para JSON.');
            }
        });

        // Função para converter XML para JSON
        function xmlToJson(xml) {
            let obj = {};

            if (xml.nodeType === 1) { // Elemento

                if (xml.attributes.length > 0) {
                    obj["@attributes"] = {};
                    for (let j = 0; j < xml.attributes.length; j++) {
                        const attribute = xml.attributes.item(j);
                        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                    }
                }
            } else if (xml.nodeType === 3) { // Texto
                const value = xml.nodeValue.trim();
                if (value) {
                    return value; 
                }
            }

            if (xml.hasChildNodes()) {
                for (let i = 0; i < xml.childNodes.length; i++) {
                    const item = xml.childNodes.item(i);
                    const nodeName = item.nodeName;

                    if (item.nodeType !== 3 || item.nodeValue.trim() !== '') {
                        const childObj = xmlToJson(item);
                        if (typeof (obj[nodeName]) === "undefined") {
                            obj[nodeName] = childObj;
                        } else {
                            if (typeof (obj[nodeName]) === "object") {
                                if (Array.isArray(obj[nodeName])) {
                                    obj[nodeName].push(childObj);
                                } else {
                                    obj[nodeName] = [obj[nodeName]];
                                    obj[nodeName].push(childObj);
                                }
                            } else {
                                obj[nodeName] = [obj[nodeName], childObj];
                            }
                        }
                    }
                }
            }


            for (let key in obj) {
                if (typeof obj[key] === "object" && obj[key] !== null) {
                    if (obj[key].hasOwnProperty("#text")) {
                        obj[key] = obj[key]["#text"];
                    } else {
                        for (let subKey in obj[key]) {
                            if (typeof obj[key][subKey] === "object" && obj[key][subKey].hasOwnProperty("#text")) {
                                obj[key][subKey] = obj[key][subKey]["#text"];
                            }
                        }
                    }
                }
            }

            return obj;
        }

    //#endregion Função para converter XML em JSON

})
