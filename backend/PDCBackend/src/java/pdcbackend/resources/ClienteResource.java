package pdcbackend.resources;

import java.sql.SQLException;
import java.util.List;
import javax.inject.Named;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import pdcbackend.dao.ClienteDAOJDBC;
import pdcbackend.dao.interfaces.ClienteDAO;
import pdcbackend.errors.ErrorMessages;
import pdcbackend.models.Cliente;

@Named
@Produces({MediaType.APPLICATION_JSON})
@Consumes({MediaType.APPLICATION_JSON})
@Path("/cliente")
public class ClienteResource {

    private final ClienteDAO clienteDAO = new ClienteDAOJDBC();

    @GET
    @Path("/buscarClientes")
    public List<Cliente> buscarClientes() {
        try {
            return clienteDAO.buscarClientes();
        } catch (SQLException ex) {
            throw ErrorMessages.getException(ErrorMessages.CLIENTE_BUSCAR_VARIOS);
        }
    }

    @GET
    @Path("/buscarClientes/{nome}")
    public List<Cliente> buscarClientes(@PathParam("nome") String nome) {
        try {
            return clienteDAO.buscarClientes(nome);
        } catch (SQLException ex) {
            throw ErrorMessages.getException(ErrorMessages.CLIENTE_BUSCAR_VARIOS);
        }
    }

    @POST
    @Path("/cadastrarCliente")
    public void cadastrarCliente(Cliente cliente) {
        try {
            Cliente clientePeloNome = clienteDAO.buscarCliente(cliente.getNome());

            if (clientePeloNome != null) {
                throw ErrorMessages.getException(ErrorMessages.CLIENTE_CADASTRAR_MESMO_NOME);
            }
            clienteDAO.cadastrarCliente(cliente);
        } catch (SQLException ex) {
            throw ErrorMessages.getException(ErrorMessages.CLIENTE_CADASTRAR);
        }
    }

    @DELETE
    @Path("/removerCliente/{idCliente}")
    public void removerCliente(@PathParam("idCliente") Integer idCliente) {
        try {
            clienteDAO.removerCliente(idCliente);
        } catch (SQLException ex) {
            throw ErrorMessages.getException(ErrorMessages.CLIENTE_REMOVER);
        }
    }

    @PUT
    @Path("/alterarCliente")
    public void alterarCliente(Cliente cliente) {
        try {
            Cliente clientePeloNome = clienteDAO.buscarCliente(cliente.getNome());
            if (clientePeloNome != null && !clientePeloNome.getIdCliente().equals(cliente.getIdCliente())) {
                throw ErrorMessages.getException(ErrorMessages.CLIENTE_ALTERAR_MESMO_NOME);
            }
            clienteDAO.alterarCliente(cliente);

        } catch (SQLException ex) {
            throw ErrorMessages.getException(ErrorMessages.CLIENTE_ALTERAR);
        }
    }
}
