const cpf = document.getElementById('cpf')
const senha = document.getElementById('senha')
const senhaC = document.getElementById('senhaC')
const btnConfirmar = document.getElementById('btnConfirmar')
const formC = document.forms.formC

btnConfirmar.addEventListener('click', isEqual)

cpf.addEventListener("blur", () => {
    let value = cpf.value.replace(/[^0-9]/g, "").replace(/^([\d]{3})([\d]{3})?([\d]{3})?([\d]{2})?/, "$1.$2.$3-$4");
    if(!validaCPF((cpf.value).toString()))
    {
        cpf.value=''
        cpf.style.borderColor = "red"
        alert("CPF Inválido!")
    } 
    else
    {
        cpf.value = value;
        cpf.style.borderColor = "green"
    }
});

function validaCPF(strCPF) {
    if (strCPF.length != 11 || 
		strCPF == "00000000000" || 
		strCPF == "11111111111" || 
		strCPF == "22222222222" || 
		strCPF == "33333333333" || 
		strCPF == "44444444444" || 
		strCPF == "55555555555" || 
		strCPF == "66666666666" || 
		strCPF == "77777777777" || 
		strCPF == "88888888888" || 
		strCPF == "99999999999")
			return false;		
	add = 0;	
	for (i=0; i < 9; i ++)		
		add += parseInt(strCPF.charAt(i)) * (10 - i);	
		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)		
			rev = 0;	
		if (rev != parseInt(strCPF.charAt(9)))		
			return false;		
	add = 0;	
	for (i = 0; i < 10; i ++)		
		add += parseInt(strCPF.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(strCPF.charAt(10)))
		return false;		
	return true;   
}

function isEqual(){
    console.log("entrei")

    if(cpf.value == ''){
        alert("Preencha o CPF!")
    }
    else if(senha.value == ''){
        alert("Preencha o campo senha!");
    } 
    else if(senhaC.value == ''){
        alert("Confirme sua senha!");
    } 
    else if(senha.value != senhaC.value){
        alert("Senhas diferentes !")
    }
    else{
        formC.submit();
    }
        
    
}