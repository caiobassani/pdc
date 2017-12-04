package pdcbackend.resources;

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
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import pdcbackend.dao.ClienteDAOJDBC;
import pdcbackend.dao.interfaces.ClienteDAO;
import pdcbackend.models.Cliente;
import pdcbackend.models.ErrorMessage;

@Named
@Produces({MediaType.APPLICATION_JSON})
@Consumes({MediaType.APPLICATION_JSON})
@Path("/cliente")
public class ClienteResource {

    private final ClienteDAO clienteDAO = new ClienteDAOJDBC();

    @GET
    @Path("/buscarClientes")
    public List<Cliente> buscarClientes() {
        return clienteDAO.buscarClientes();
    }

    @GET
    @Path("/buscarClientes/{nome}")
    public List<Cliente> buscarClientes(@PathParam("nome") String nome) {
        return clienteDAO.buscarClientes(nome);
    }

    @POST
    @Path("/cadastrarCliente")
    public ErrorMessage cadastrarCliente(Cliente cliente) {
        Cliente clientePeloNome = clienteDAO.buscarCliente(cliente.getNome());
        if (clientePeloNome != null) {
            throw new WebApplicationException();
        }
        if (!clienteDAO.cadastrarCliente(cliente)) {
            return new ErrorMessage("Erro ao cadastrar cliente!");
        }
        return null;
    }

    @DELETE
    @Path("/removerCliente/{idCliente}")
    public ErrorMessage removerCliente(@PathParam("idCliente") Integer idCliente) {
        if (!clienteDAO.removerCliente(idCliente)) {
            return new ErrorMessage("Erro ao remover cliente!");
        }
        return null;
    }

    @PUT
    @Path("/alterarCliente")
    public ErrorMessage alterarCliente(Cliente cliente) {
        if (!clienteDAO.alterarCliente(cliente)) {
            return new ErrorMessage("Erro ao alterar cliente!");
        }
        return null;
    }
}
