export function Conteudo(){
    const conteudo = document.createElement('div');

    conteudo.innerHTML = `
    <div class="container">
        <div class="row">
            <div class="">
                <h3>XML</h3>
                <div class="console">
                    <div class="line-numbers" id="xmlLineNumbers">1</div>
                    <textarea id="xmlInput" class="form-control text-light" placeholder="Insira o XML aqui..."></textarea>
                </div>
                <div class="mt-2">
                    <button id="xmlExample" class="btn btn-outline-info  rounded-circle" title="Exemplo de XML"><i class="bi bi-filetype-xml"></i></button>
                    <button id="xmlCopy" class="btn btn-outline-success rounded-circle" title="Copiar"><i class="bi bi-copy"></i></button>
                    <button id="xmlClear" class="btn btn-outline-danger rounded-circle" title="Limpar"><i class="bi bi-x-square"></i></button>
                </div>
            </div>

            <!-- Botão de conversão entre XML e JSON -->
            <div class="text-center mt-3">
                <button id="convertXmlToJson" class="btn btn-outline-light btn-lg rounded-circle" title="Converter XML para JSON"><i class="bi bi-arrow-down-up"></i></button>
            </div>

            <div class="">
                <h3>JSON</h3>
                <div class="console">
                    <div class="line-numbers" id="jsonLineNumbers">1</div>
                    <textarea id="jsonInput" class="form-control" placeholder="Insira o JSON aqui..."></textarea>
                </div>
                <div class="mt-2">
                    <button id="jsonExample" class="btn btn-outline-info rounded-circle" title="Exemplo de JSON"><i class="bi bi-filetype-json"></i></button>
                    <button id="jsonCopy" class="btn btn-outline-success rounded-circle" title="Copiar"><i class="bi bi-copy"></i></button>
                    <button id="jsonClear" class="btn btn-outline-danger rounded-circle" title="Limpar"><i class="bi bi-x-square"></i></button>
                </div>
            </div>
        </div>
    </div> 
    `;
    return conteudo
}