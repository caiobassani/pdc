package pdcbackend.errors;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import pdcbackend.models.ErrorMessage;

public class ErrorMessages {

    public static String CLIENTE_BUSCAR_VARIOS = "Erro ao buscar clientes.";
    public static String CLIENTE_BUSCAR = "Erro ao buscar cliente.";
    public static String CLIENTE_CADASTRAR_MESMO_NOME = "Já existe outro cliente com este nome.";
    public static String CLIENTE_CADASTRAR = "Erro ao cadastrar cliente.";
    public static String CLIENTE_REMOVER = "Erro ao remover cliente.";
    public static String CLIENTE_ALTERAR = "Erro ao alterar cliente.";
    public static String CLIENTE_ALTERAR_MESMO_NOME = "Já existe outro cliente com este nome.";
    public static String PRODUTO_BUSCAR_VARIOS = "Erro ao buscar produtos.";
    public static String PRODUTO_CADASTRAR = "Erro ao cadastrar produto.";
    public static String PRODUTO_CADASTRAR_MESMO_NOME = "Já existe outro produto com este nome.";
    public static String PRODUTO_REMOVER = "Erro ao remover produto.";
    public static String PRODUTO_ALTERAR_MESMO_NOME = "Já existe outro produto com este nome.";
    public static String PRODUTO_SEM_ESTOQUE = "Quantidade indisponível.";
    public static String VENDA_BUSCAR_TODAS = "Erro ao buscar vendas.";
    public static String VENDA_EFETUAR = "Erro ao efetuar a venda.";
    public static String FILIAL_BUSCAR = "Erro ao buscar as filiais.";

    public static WebApplicationException getException(String message) {
        return new WebApplicationException(Response.status(Response.Status.BAD_REQUEST).entity(new ErrorMessage(message)).build());
    }
}
