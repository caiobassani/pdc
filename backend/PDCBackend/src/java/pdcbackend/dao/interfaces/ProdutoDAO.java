package pdcbackend.dao.interfaces;

import java.util.List;
import pdcbackend.models.Produto;

public interface ProdutoDAO {

    public List<Produto> buscarProdutos(String nome);

    public boolean cadastrarProduto(Produto cliente);

    public boolean removerProduto(Integer idProduto);

    public boolean alterarProduto(Produto cliente);

}
