package pdcbackend.resources;

import java.sql.SQLException;
import java.util.List;
import javax.inject.Named;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import pdcbackend.dao.ProdutoDAOJDBC;
import pdcbackend.dao.VendaDAOJDBC;
import pdcbackend.dao.interfaces.ProdutoDAO;
import pdcbackend.dao.interfaces.VendaDAO;
import pdcbackend.errors.ErrorMessages;
import pdcbackend.models.Produto;
import pdcbackend.models.Venda;

@Named
@Produces({MediaType.APPLICATION_JSON})
@Consumes({MediaType.APPLICATION_JSON})
@Path("/venda")
public class VendaResource {

    VendaDAO vendaDAO = new VendaDAOJDBC();
    ProdutoDAO produtoDAO = new ProdutoDAOJDBC();

    @GET
    @Path("/buscarVendas")
    public List<Venda> buscarVendas() {
        try {
            return vendaDAO.buscarTodas();
        } catch (SQLException ex) {
            throw ErrorMessages.getException(ErrorMessages.VENDA_BUSCAR_TODAS);
        }
    }

    @POST
    @Path("/efetuarVenda")
    public void efetuarVenda(Venda venda) {
        Produto produto;
        int novaQuantidade;
        try {
            produto = produtoDAO.buscarProduto(venda.getProduto().getIdProduto());

            if (produto.getQtdEstoque() > venda.getQtd()) {
                novaQuantidade = produto.getQtdEstoque() - venda.getQtd();

                produto.setQtdEstoque(novaQuantidade);

                produtoDAO.alterarProduto(produto);

                vendaDAO.efetuarVenda(venda);

            } else {
                throw ErrorMessages.getException(ErrorMessages.PRODUTO_SEM_ESTOQUE);
            }
        } catch (SQLException ex) {
            throw ErrorMessages.getException(ErrorMessages.VENDA_EFETUAR);
        }
    }
}
