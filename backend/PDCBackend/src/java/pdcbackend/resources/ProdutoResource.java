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
import javax.ws.rs.core.MediaType;
import pdcbackend.dao.ProdutoDAOJDBC;
import pdcbackend.dao.interfaces.ProdutoDAO;
import pdcbackend.models.ErrorMessage;
import pdcbackend.models.Produto;

@Named
@Produces({MediaType.APPLICATION_JSON})
@Consumes({MediaType.APPLICATION_JSON})
@Path("/produto")
public class ProdutoResource {

    private final ProdutoDAO produtoDAO = new ProdutoDAOJDBC();

    @GET
    @Path("/buscarProdutos")
    public List<Produto> buscarClientes(String nome) {
        return produtoDAO.buscarProdutos(nome);
    }

    @POST
    @Path("/cadastrarProduto")
    public ErrorMessage cadastrarCliente(Produto produto) {
        if (!produtoDAO.cadastrarProduto(produto)) {
            return new ErrorMessage("Erro ao cadastrar produto!");
        }
        return null;
    }

    @DELETE
    @Path("/removerProduto/{idProduto}")
    public ErrorMessage removerCliente(@PathParam("idProduto") Integer idProduto) {
        if (!produtoDAO.removerProduto(idProduto)) {
            return new ErrorMessage("Erro ao remover produto!");
        }
        return null;
    }

    @PUT
    @Path("/alterarProduto")
    public ErrorMessage alterarCliente(Produto produto) {
        if (!produtoDAO.alterarProduto(produto)) {
            return new ErrorMessage("Erro ao alterar produto!");
        }
        return null;
    }
}
