package pdcbackend.dao.interfaces;

import java.sql.SQLException;
import java.util.List;
import pdcbackend.models.Produto;

public interface ProdutoDAO {

    public List<Produto> buscarProdutos() throws SQLException;

    public List<Produto> buscarProdutos(String nome) throws SQLException;

    public Produto buscarProduto(Integer id) throws SQLException;

    public Produto buscarProduto(String nome) throws SQLException;

    public void cadastrarProduto(Produto produto) throws SQLException;

    public void removerProduto(Integer idProduto) throws SQLException;

    public void alterarProduto(Produto produto) throws SQLException;

}
