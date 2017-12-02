package pdcbackend.dao.interfaces;

import java.util.List;
import pdcbackend.models.Produto;

public interface ProdutoDAO {

    public List<Produto> buscarProdutos();

    public List<Produto> buscarProdutos(String nome);

    public Produto buscarProduto(Integer id);

    public boolean cadastrarProduto(Produto produto);

    public boolean removerProduto(Integer idProduto);

    public boolean alterarProduto(Produto produto);

}
