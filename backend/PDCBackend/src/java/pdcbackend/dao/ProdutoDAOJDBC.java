package pdcbackend.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import static pdcbackend.dao.DAOBaseJDBC.conn;
import pdcbackend.dao.interfaces.ProdutoDAO;
import pdcbackend.models.Produto;

public class ProdutoDAOJDBC extends DAOBaseJDBC implements ProdutoDAO {

    @Override
    public List<Produto> buscarProdutos(String nome) {
        PreparedStatement stmt;
        ResultSet rs;
        List<Produto> produtos = new ArrayList();

        try {
            stmt = conn.prepareStatement("SELECT idProduto, nome, valor, qtdEstoque FROM Produto WHERE nome LIKE ? ");
            stmt.setString(1, nome + "%");
            rs = stmt.executeQuery();

            while (rs.next()) {
                Integer idProduto = rs.getInt("idProduto");
                String nomeProduto = rs.getString("nome");
                float valor = rs.getFloat("valor");
                Integer qtdEstoque = rs.getInt("qtdEstoque");

                produtos.add(new Produto(idProduto, nomeProduto, valor, qtdEstoque));
            }
            stmt.close();
        } catch (SQLException ex) {
            System.out.println("Erro ao buscar produtos: " + ex.getMessage());
        }
        return produtos;
    }

    @Override
    public boolean cadastrarProduto(Produto produto) {
        PreparedStatement stmt;

        try {
            stmt = conn.prepareStatement("INSERT INTO Produto (nome, valor, qtdEstoque) VALUES (?, ?,  ?)");

            stmt.setString(1, produto.getNome());
            stmt.setFloat(2, produto.getValor());
            stmt.setInt(3, produto.getQtdEstoque());

            stmt.executeUpdate();

            stmt.close();
        } catch (SQLException ex) {
            System.out.println("Erro ao cadastrar produto: " + ex.getMessage());

            return false;
        }
        return true;
    }

    @Override
    public boolean removerProduto(Integer idProduto) {
        PreparedStatement stmt;

        try {
            stmt = conn.prepareStatement("DELETE FROM Produto WHERE idProduto = ?");

            stmt.setInt(1, idProduto);

            stmt.executeUpdate();

            stmt.close();
        } catch (SQLException ex) {
            System.out.println("Erro ao remover produto: " + ex.getMessage());

            return false;
        }
        return true;
    }

    @Override
    public boolean alterarProduto(Produto produto) {
        PreparedStatement stmt;
        try {
            stmt = conn.prepareStatement("UPDATE Produto SET nome = ?, valor = ?, qtdEstoque = ? WHERE idProduto = ?");
            stmt.setString(1, produto.getNome());
            stmt.setFloat(2, produto.getValor());
            stmt.setInt(3, produto.getQtdEstoque());

            stmt.executeUpdate();

            stmt.close();
        } catch (SQLException ex) {
            System.out.println("Erro ao alterar produto: " + ex.getMessage());

            return false;
        }
        return true;
    }

    @Override
    public Produto buscarProduto(Integer idProduto) {
        Produto produto = null;
        PreparedStatement stmt;
        ResultSet rs = null;

        try {
            stmt = conn.prepareStatement("SELECT idProduto, nome, valor, qtdEstoque FROM Produto WHERE idProduto = ?");
            stmt.setInt(1, idProduto);

            stmt.executeQuery();

            if (rs.next()) {
                Integer id = rs.getInt("idProduto");
                String nome = rs.getString("nome");
                float valor = rs.getFloat("valor");
                int qtdEstoque = rs.getInt("qtdEstoque");

                produto = new Produto(id, nome, valor, qtdEstoque);
            }
        } catch (SQLException ex) {
            System.out.println("Erro ao buscar produto: " + ex.getMessage());
        }
        return produto;
    }
}
