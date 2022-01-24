
function validateForm(inputs){
    console.log(inputs)
    let incompleteFields;
    let phoneNotANumber;
    for(var i = 0; i < inputs.length;i++){
        console.log(inputs[i])
        if(inputs[i].trim() === ''){
            return false
        }
        if(i === 2 && typeof inputs[i] !== Number){
            return false
        }  
    }
}

test('Filtro de forma probando campo vacío',()=>{
    expect(validateForm([' ','input2','input3'])).toBe(false)
})

test('Filtro de forma probando formato erróneo de número telefónico',()=>{
    expect(validateForm(['input1','input2','esto no es un numero'])).toBe(false)
})