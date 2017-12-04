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

    public static WebApplicationException getException(String message) {
        return new WebApplicationException(Response.status(Response.Status.BAD_REQUEST).entity(new ErrorMessage(message)).build());
    }
}
