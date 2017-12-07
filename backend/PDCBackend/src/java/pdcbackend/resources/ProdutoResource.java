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
import pdcbackend.dao.ProdutoDAOJDBC;
import pdcbackend.dao.interfaces.ProdutoDAO;
import pdcbackend.errors.ErrorMessages;
import pdcbackend.models.Produto;

@Named
@Produces({MediaType.APPLICATION_JSON})
@Consumes({MediaType.APPLICATION_JSON})
@Path("/produto")
public class ProdutoResource {

    private final ProdutoDAO produtoDAO = new ProdutoDAOJDBC();

    @GET
    @Path("/buscarProdutos/{nome}")
    public List<Produto> buscarProdutos(@PathParam("nome") String nome) {
        try {
            return produtoDAO.buscarProdutos(nome);
        } catch (SQLException ex) {
            throw ErrorMessages.getException(ErrorMessages.PRODUTO_BUSCAR_VARIOS);
        }
    }

    @GET
    @Path("/buscarProdutos")
    public List<Produto> buscarProdutos() {
        try {
            return produtoDAO.buscarProdutos();
        } catch (SQLException ex) {
            throw ErrorMessages.getException(ErrorMessages.PRODUTO_BUSCAR_VARIOS);
        }
    }

    @POST
    @Path("/cadastrarProduto")
    public void cadastrarProduto(Produto produto) {
        try {
            Produto produtoPeloNome = produtoDAO.buscarProduto(produto.getNome());

            if (produtoPeloNome != null) {
                throw ErrorMessages.getException(ErrorMessages.PRODUTO_CADASTRAR_MESMO_NOME);
            }

            produtoDAO.cadastrarProduto(produto);
        } catch (SQLException ex) {
            throw ErrorMessages.getException(ErrorMessages.PRODUTO_CADASTRAR);
        }
    }

    @DELETE
    @Path("/removerProduto/{idProduto}")
    public void removerProduto(@PathParam("idProduto") Integer idProduto) {
        try {
            produtoDAO.removerProduto(idProduto);
        } catch (SQLException ex) {
            if (ex.getErrorCode() == 1451) {
                throw ErrorMessages.getException(ErrorMessages.PRODUTO_CHAVE_ESTRANGEIRA);
            }
            throw ErrorMessages.getException(ErrorMessages.PRODUTO_REMOVER);
        }
    }

    @PUT
    @Path("/alterarProduto")
    public void alterarProduto(Produto produto) {
        try {
            Produto produtoPeloNome = produtoDAO.buscarProduto(produto.getNome());

            if (produtoPeloNome != null && !produtoPeloNome.getIdProduto().equals(produto.getIdProduto())) {
                throw ErrorMessages.getException(ErrorMessages.PRODUTO_ALTERAR_MESMO_NOME);
            }

            produtoDAO.alterarProduto(produto);
        } catch (SQLException ex) {
            throw ErrorMessages.getException(ErrorMessages.PRODUTO_ALTERAR);
        }
    }
}
