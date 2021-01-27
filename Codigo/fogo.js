const arrayPixelsFogo = [];
const larguraFogo = 40;
const alturaFogo = 40;
const paletaCoresFogo = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

function iniciar(){
    criarEstruturaDadosFogo();
    criarOrigemFogo();
    renderizarFogo();

    setInterval(calcularPropagacaoFogo, 50);
}

function criarEstruturaDadosFogo(){
    const numeroDePixels = larguraFogo * alturaFogo;

    for(let i = 0; i < numeroDePixels; i++){
        arrayPixelsFogo[i] = 0;
    }
}

function calcularPropagacaoFogo(){
    for(let coluna = 0; coluna < larguraFogo; coluna++){
        for(let linha = 0; linha < alturaFogo; linha ++){
            const indexPixel = coluna + (larguraFogo * linha);

            atualizarIntensidadeFogoPorPixel(indexPixel);
        }
    }

    renderizarFogo();
}

function atualizarIntensidadeFogoPorPixel(indexPixelAtual){
    const indexPixelAbaixo = indexPixelAtual + larguraFogo;

    if(indexPixelAbaixo >= larguraFogo * alturaFogo){
        return
    }

    const decair = Math.floor(Math.random() * 3);
    const intensidadeFogoPixelAbaixo = arrayPixelsFogo[indexPixelAbaixo];
    const novaIntensidadeFogo = intensidadeFogoPixelAbaixo - decair >= 0 ? intensidadeFogoPixelAbaixo - decair : 0;

    arrayPixelsFogo[indexPixelAtual - decair] = novaIntensidadeFogo;
}

function renderizarFogo(){
    const debug = false;

    let html = '<table cellpadding=0 cellspacing=0>';

    for(let linha = 0; linha < alturaFogo; linha++){
        html += '<tr>';

        for(let coluna = 0; coluna < larguraFogo; coluna++){
            const indexPixel = coluna + (larguraFogo * linha);
            const intensidadeFogo = arrayPixelsFogo[indexPixel];

            if(debug === true){
                html += '<td>';
                html += `<div class="index-pixel">${indexPixel}</div>`;
                html += intensidadeFogo;
                html += '</td>';
            }else{
                const cor = paletaCoresFogo[intensidadeFogo];
                const corString = `${cor.r},${cor.g},${cor.b}`;

                html += `<td class="pixel" style="background-color: rgb(${corString})">`;
                html += '</td>';
            }
            
        }

        html += '</tr>';
    }

    html += '</table>';

    document.querySelector("#fogoCanvas").innerHTML = html;
}

function criarOrigemFogo(){
    for(let coluna = 0; coluna <= larguraFogo; coluna++){
        const overflowIndexPixel = larguraFogo * alturaFogo;
        const indexPixel = (overflowIndexPixel - larguraFogo) + coluna;

        arrayPixelsFogo[indexPixel] = 36;
    }
}

iniciar();