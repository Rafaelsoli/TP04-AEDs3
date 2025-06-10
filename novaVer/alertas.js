function exibir_alerta(mensagem, titulo) 
{
  
  Swal.fire({
    title: titulo,
    text: mensagem,
    icon: 'success',
    confirmButtonText: 'OK'
  });
  
};

function exibir_alerta_erro(mensagem, titulo) 
{
  
  Swal.fire({
    title: titulo,
    text: mensagem,
    icon: 'error',
    confirmButtonText: 'OK'
  });
  
};

//////////////////////////////////////////////////////////////////////////////////////

function exibir_alerta_info(mensagem, titulo) 
{
  
  Swal.fire({
    title: titulo,
    text: mensagem,
    icon: 'info',
    confirmButtonText: 'OK'
  });
  
};

//////////////////////////////////////////////////////////////////////////////////////

async function exibir_confirmar(mensagem, titulo = "Confirmação")
{
  const resultado = await Swal.fire({
    title: titulo,
    text: mensagem,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não',
    allowOutsideClick: false,
    allowEscapeKey: false
  });

  return resultado.isConfirmed;
}

//////////////////////////////////////////////////////////////////////////////////////

async function exibir_input(mensagem) {  
  const resultado = await Swal.fire({
    title: mensagem,
    input: 'text',
    showCancelButton: true,
    confirmButtonText: 'Enviar',
    cancelButtonText: 'Cancelar',
    showLoaderOnConfirm: true,
    preConfirm: (valor) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          /*if (valor === 'exemplo') {
            Swal.showValidationMessage('Esse valor não é permitido!');
          }*/
          resolve(valor);
        }, 1000);
      });
    },
    allowOutsideClick: () => !Swal.isLoading()
  });

  return resultado.value;
}