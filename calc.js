let num1 = '';
let num2 = '';
let sign = '';
let finish = false;

const digit = ['0', '00', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/', '%'];

const out = document.querySelector('.current-operand');

function clearAll() {
    num1 = '';
    num2 = '';
    sign = '';
    finish = false;
    out.textContent = 0;
}
document.querySelector('.ac').onclick = clearAll;

function deleteLast() {
    console.log('delete');
    if (finish) {
        num1 = '';
        num2 = '';
        sign = '';
        out.textContent = 0;
        finish = false;
    }
    else if(num2 !== '') {
        if (num2.length === 1) {
            num2 = num2.slice(0, -1);
            out.textContent = sign;
        } else {
            num2 = num2.slice(0, -1);
            out.textContent = num2;
        }
    }
    else if(num2 === '' && sign !== '') {
        sign = sign.slice(0, -1);
        out.textContent = num1;
    }
    else if (num1 !== '') {
        num1 = num1.slice(0, -1);
        out.textContent = num1;
        console.log('slice 1');
    }
    else {}
}
document.querySelector('.delete').onclick =  deleteLast;

document.querySelector('.buttons').onclick = (event) => {
    if(!event.target.classList.contains('btn')) return;
    if(event.target.classList.contains('ac')) return;
    if(event.target.classList.contains('delete')) return;

    out.textContent = '';
    const key = event.target.textContent;

    if(digit.includes(key)) {
        if(num2 === '' && sign === '') {
            num1 += key;
            console.log(num1, num2, sign);
            out.textContent = num1;
        }
        else if (num1 !== '' && num2 !== '' && finish) {
            num2 = key;
            finish = false;
            out.textContent = num2;
        }
        else {
            num2 += key;
            out.textContent = num2;
        }
        console.log(num1, num2, sign);
        return;
    }

    if(action.includes(key)) {
        if (!isNaN(num1)) {
            sign = key;
            out.textContent = sign;
            console.log(num1, num2, sign);
        }
        else {
            clearAll();
        }
        return;
    }

    if(key === '=') {
        if (isNaN(num1)) {
            sign = '';
            num1 = '';
            out.textContent = 0;
        }
        else {
            if(num2 === '') num2 = num1;
            switch (sign) {
                case "+":
                    num1 = (+num1) + (+num2);
                    break;
                case "-":
                    num1 = num1 - num2;
                    break;
                case "X":
                    num1 = num1 * num2;
                    break;
                case "/":
                    if(num2 === '0') {
                        out.textContent = 'ERROR!';
                        num1 = '';
                        num2 = '';
                        sign = '';
                        return;
                    }
                    num1 = parseFloat((num1 / num2).toFixed(2));
                    break;
                case "%":
                    num1 = parseFloat(((num1 / 100) * num2).toFixed(2));
                    break;
            }
            finish = true;
            out.textContent = num1;
        }
        
        
    }
}