// 705.484.450.52  070.987.720-03

class ValidaCPF {
    constructor (cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: false,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, ''),
        });
    }

    sequencia() {
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }

    geraNovoCpf() {
        const cpfParcial = this.cpfLimpo.slice(0, -2);
        const digito1 = ValidaCPF.geraDigito(cpfParcial);
        const digito2 = ValidaCPF.geraDigito(cpfParcial + digito1);
        this.novoCPF = cpfParcial + digito1 + digito2;
    }

    static geraDigito(cpfParcial) {
        let total = 0
        let reverso = cpfParcial.length + 1;
        
        for(let stringNum of cpfParcial) {
            // console.log(stringNum, typeof stringNum)
            total += reverso * Number(stringNum);
            reverso--;
        }

        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0';
    }

    valida() {
        if(!this.cpfLimpo) return false;
        if(typeof this.cpfLimpo !== 'string') return false;
        if(this.cpfLimpo.length !== 11) return false;
        if(this.sequencia()) return false;
        this.geraNovoCpf();
        return this.novoCPF === this.cpfLimpo;
    }
}

const validacpf = new ValidaCPF('070.987.720-03')

if (validacpf.valida()) {
    console.log('CPF válido');
} else {
    console.log('CPF inválido');
}