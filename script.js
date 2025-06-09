// Funções dos AFDs com rastreamento de passos
function afdA(cadeia, logSteps = true) {
    let estado = 'q0';
    const steps = [];
    
    if (logSteps) {
        steps.push(`Início: Estado = ${estado}`);
    }
    
    for (let i = 0; i < cadeia.length; i++) {
        const simbolo = cadeia[i];
        
        if (!['0', '1'].includes(simbolo)) {
            if (logSteps) {
                steps.push(`Erro: Símbolo inválido '${simbolo}' encontrado. Apenas 0 ou 1 são permitidos.`);
            }
            return { aceito: false, steps };
        }
        
        const estadoAnterior = estado;
        
        if (estado === 'q0') {
            if (simbolo === '0') estado = 'q0';
            else if (simbolo === '1') estado = 'q1';
        } else if (estado === 'q1') {
            if (simbolo === '0') estado = 'q2';
            else estado = 'q3';
        } else if (estado === 'q2') {
            if (simbolo === '0') estado = 'q0';
            else estado = 'q3';
        } else if (estado === 'q3') {
            break;
        }
        
        if (logSteps) {
            steps.push(`Passo ${i+1}: Símbolo '${simbolo}' | ${estadoAnterior} → ${estado}`);
        }
    }
    
    const aceito = estado === 'q0' || estado === 'q2';
    if (logSteps) {
        steps.push(`Fim: Estado final = ${estado} → ${aceito ? 'ACEITO' : 'REJEITADO'}`);
    }
    
    return { aceito, steps };
}

function afdB(cadeia, logSteps = true) {
    let estado = 'q0_par';
    const steps = [];
    
    if (logSteps) {
        steps.push(`Início: Estado = ${estado}`);
    }
    
    for (let i = 0; i < cadeia.length; i++) {
        const simbolo = cadeia[i];
        
        if (!['a', 'b'].includes(simbolo)) {
            if (logSteps) {
                steps.push(`Erro: Símbolo inválido '${simbolo}' encontrado. Apenas a ou b são permitidos.`);
            }
            return { aceito: false, steps };
        }
        
        const estadoAnterior = estado;
        
        if (estado === 'q0_par') {
            if (simbolo === 'a') estado = 'q0_impar';
            else if (simbolo === 'b') estado = 'q1_par';
        } else if (estado === 'q0_impar') {
            if (simbolo === 'a') estado = 'q0_par';
            else if (simbolo === 'b') estado = 'q1_impar';
        } else if (estado === 'q1_par') {
            if (simbolo === 'a') estado = 'q1_impar';
            else if (simbolo === 'b') estado = 'q1_par';
        } else if (estado === 'q1_impar') {
            if (simbolo === 'a') estado = 'q1_par';
            else if (simbolo === 'b') estado = 'q1_impar';
        }
        
        if (logSteps) {
            steps.push(`Passo ${i+1}: Símbolo '${simbolo}' | ${estadoAnterior} → ${estado}`);
        }
    }
    
    const aceito = estado === 'q1_par';
    if (logSteps) {
        steps.push(`Fim: Estado final = ${estado} → ${aceito ? 'ACEITO' : 'REJEITADO'}`);
    }
    
    return { aceito, steps };
}

function testarAFD(tipo) {
    const cadeia = document.getElementById('cadeia').value;
    const stepsContainer = document.getElementById('steps');
    const resultadoContainer = document.getElementById('resultado');
    
    // Limpa resultados anteriores
    stepsContainer.innerHTML = '';
    resultadoContainer.textContent = '';
    
    let resultado;
    if (tipo === 'a') {
        resultado = afdA(cadeia);
    } else {
        resultado = afdB(cadeia);
    }
    
    // Exibe os passos
    resultado.steps.forEach(step => {
        const stepElement = document.createElement('p');
        stepElement.textContent = step;
        stepsContainer.appendChild(stepElement);
    });
    
    // Exibe o resultado final
    resultadoContainer.textContent = resultado.aceito ? 
        '✅ Cadeia ACEITA pelo AFD!' : 
        '❌ Cadeia REJEITADA pelo AFD!';
    resultadoContainer.style.color = resultado.aceito ? 'green' : 'red';
    
    // Atualiza diagrama (opcional)
    atualizarDiagrama(tipo, resultado.steps);
}

function atualizarDiagrama(tipo, steps) {
    // Implementação para destacar os estados no diagrama SVG
    // conforme a execução passo a passo
}
