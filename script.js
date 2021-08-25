window.addEventListener('DOMContentLoaded', () => {
    const billTotal = document.getElementById('bill-input'),
        peoples = document.getElementById('number-of-persons'),
        tipPrice = document.getElementById('tip-price'),
        totalPerPerson = document.getElementById('total-price'),
        percentBlocks = document.querySelectorAll('.percent-block'),
        resetBtn = document.querySelector('.btn-reset');

    let total = 0, tip = 0, peoplesAmount = 0;


    const showRes = () => {
        if (total > 0 && tip > 0 && peoplesAmount > 0) {
            let res = ((total * tip /100) /peoplesAmount).toFixed(2);
            tipPrice.innerHTML = `$${res}`;
            let resTotal = (+total/peoplesAmount + +res).toFixed(2);
            totalPerPerson.innerHTML = `$${resTotal}`;
        } else {
            tipPrice.innerHTML = `$0.00`;
            totalPerPerson.innerHTML = `$0.00`;
        }
    }

    const toggleZero = (elem, inputClass, textElem, success) => {
        if (+elem.value <= 0 || isNaN(+elem.value)) {
            textElem.classList.add('show');
            textElem.classList.remove('hide');
            elem.classList.add(inputClass);
            elem.classList.remove(success);
        } else {
            textElem.classList.add('hide')
            textElem.classList.remove('show');
            elem.classList.remove(inputClass);
            elem.classList.add(success);
        }
    }    
    

    const clearSelected = () => {
        percentBlocks.forEach((block) => {
            block.classList.contains('selected') ? block.classList.remove('selected') : null;
        })
    }

    toggleZero(billTotal, 'zero-input', document.querySelectorAll('.zero')[0], 'success');
    toggleZero(peoples, 'zero-input', document.querySelectorAll('.zero')[1], 'success');
    clearSelected();
    
        billTotal.addEventListener('input', () => {
            total = +billTotal.value;
            toggleZero(billTotal, 'zero-input', document.querySelectorAll('.zero')[0], 'success');

            showRes();
        });

        peoples.addEventListener('input', () => {
            peoplesAmount = +peoples.value;
            toggleZero(peoples, 'zero-input', document.querySelectorAll('.zero')[1], 'success');
            showRes();
        })

        percentBlocks.forEach(block => block.addEventListener('click', (e) => {
            let target = e.target;
            clearSelected();
            
            switch(target.tagName) {
                case 'DIV':
                    target.classList.add('selected');
                    tip = +target.innerHTML.replace('%', '');
                    showRes();
                    break;
                case 'INPUT':
                    target.classList.add('success');


            }
        }))

        document.getElementById('percent-input').addEventListener('input', (e) => {
            tip = +e.target.value;
            showRes();
        })


        resetBtn.addEventListener('click', () => {
            billTotal.value = 0;
            clearSelected();
            peoples.value = 0;
            percentBlocks[5].value = '';
            toggleZero(billTotal, 'zero-input', document.querySelectorAll('.zero')[0], 'success');
            toggleZero(peoples, 'zero-input', document.querySelectorAll('.zero')[1], 'success');
            total = 0;
            peoplesAmount = 0;
            tip = 0;

            showRes();

        });
});