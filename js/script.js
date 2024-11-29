var dados = []

// Função para apagar um registro
function ApagaRegistro(Id) {
    let _confirm = confirm("Deseja realmente excluir este registro?")

    if (_confirm) {
        for(let i = 0; i < dados.length; i++) {
            if (dados[i].Id == Id) {
                dados.splice(i, 1) // Apaga somente o índice selecionado para apagar
            }
        }

        PopulaTabela()
    }
}

// Função para editar um registro
function EditaRegistro(Id) {
    $("#modalRegistro").modal("show")

    dados.forEach(function(item) {
        if (item.Id == Id) {
            $("#hdId").val(item.Id)
            $("#Nome").val(item.Nome)
            $("#Sobrenome").val(item.Sobrenome)
            $("#Telefone").val(item.Telefone)
            $("#Email").val(item.Email)
            $("#Instagram").val(item.Instagram)
        }
    })
}

// Função para ler/carregar todos os registros
function PopulaTabela() {
    if (Array.isArray(dados)) {

        localStorage.setItem("__dados__", JSON.stringify(dados)) // Converte os dados para string (O localStorage aceita apenas texto)

        $("#tblDados tbody").html("") // Limpa todo "corpo" da tabela para reescrever os dados atualizados
        
        // Percorre todo array de dados
        dados.forEach(function (item) {
            
            // Template String
            $("#tblDados tbody").append(`<tr>
                <td>${item.Id}</td>
                <td>${item.Nome}</td>
                <td>${item.Sobrenome}</td>
                <td><a style="text-decoration:none; color: var(--bs-table-color-state,var(--bs-table-color-type,var(--bs-table-color)));" href="https://wa.me/${item.Telefone}" target="_blank">${item.Telefone}</a></td>
                <td><a style="text-decoration:none; color: var(--bs-table-color-state,var(--bs-table-color-type,var(--bs-table-color)));" href="mailto:${item.Email}" target="_blank">${item.Email}</a></td>
                <td><a style="text-decoration:none; color: var(--bs-table-color-state,var(--bs-table-color-type,var(--bs-table-color)));" href="https://www.instagram.com/${item.Instagram}" target="_blank">${item.Instagram}</a></td>
                <td><button type="button" class="btn btn-primary" onClick="javascript:EditaRegistro(${item.Id});"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
</svg></button></td>
                <td><button type="button" class="btn btn-danger" onClick="javascript:ApagaRegistro(${item.Id});"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></button></td>
            </tr>`)
        })
    }
}

// Função executada ao abrir ou recarregar a página web
$(function () {
    
    // Executa ao carregar a tela
    dados = JSON.parse(localStorage.getItem("__dados__"))

    // Verifica se tem dados no localStorage
    if (dados) {
        PopulaTabela()
    }

    // Ações ao ser pressionado o botão salvar
    $("#btnSalvar").click(function() {
        let _Id = $("#hdId").val()
        let Nome = $("#Nome").val()
        let Sobrenome = $("#Sobrenome").val()
        let Telefone = $("#Telefone").val()
        let Email = $("#Email").val()
        let Instagram = $("#Instagram").val()

        // Verifica se é inserção de um novo registro ou edição de um já existente
        if (!_Id || _Id == "0"){
            let registro = {}
            registro.Nome = Nome
            registro.Sobrenome = Sobrenome
            registro.Telefone = Telefone 
            registro.Email = Email
            registro.Instagram = Instagram

            registro.Id = dados.length + 1
            dados.push(registro)
        }
        else {
            dados.forEach(function(item) {
                if (item.Id == _Id) {
                    item.Nome = Nome
                    item.Sobrenome = Sobrenome
                    item.Telefone = Telefone
                    item.Email = Email
                    item.Instagram = Instagram
                }
            })
        }

        alert("Registro salvo com sucesso!")
        $("#modalRegistro").modal("hide")

        // Limpeza dos campos do cadastro de aluno
        $("#hdId").val("0")
        $("#Nome").val("")
        $("#Sobrenome").val("")
        $("#Telefone").val("")
        $("#Email").val("")
        $("#Instagram").val("")

        PopulaTabela()
    })
})