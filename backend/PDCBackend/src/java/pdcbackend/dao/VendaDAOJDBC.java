package pdcbackend.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import static pdcbackend.dao.DAOBaseJDBC.conn;
import pdcbackend.dao.interfaces.VendaDAO;
import pdcbackend.models.Cliente;
import pdcbackend.models.Filial;
import pdcbackend.models.Produto;
import pdcbackend.models.Venda;

public class VendaDAOJDBC extends DAOBaseJDBC implements VendaDAO {

    @Override
    public List<Venda> buscarTodas() {
        PreparedStatement stmt;
        ResultSet rs;
        List<Venda> vendas = new ArrayList();

        try {
            stmt = conn.prepareStatement("SELECT v.idVenda, v.idCliente, v.idProduto, v.idFilial, v.qtd AS qtdVenda, v.valorUnitarioVenda,"
                    + "c.nome AS nomeCliente,"
                    + "p.nome AS nomeProduto, p.valor AS valorUnitarioEstoque, p.qtdEstoque,"
                    + "f.nome AS nomeFilial "
                    + "FROM Venda v INNER JOIN Produto p ON p.idProduto = v.idProduto "
                    + "INNER JOIN Cliente c ON c.idCliente = v.idCliente "
                    + "INNER JOIN Filial f ON f.idFilial = v.idFilial");

            rs = stmt.executeQuery();

            while (rs.next()) {
                Integer idVenda = rs.getInt("idVenda");
                Integer idCliente = rs.getInt("idCliente");
                Integer idProduto = rs.getInt("idProduto");
                Integer idFilial = rs.getInt("idFilial");
                int qtdVenda = rs.getInt("qtdVenda");
                float valorUnitarioVenda = rs.getFloat("valorUnitarioVenda");
                String nomeCliente = rs.getString("nomeCliente");
                String nomeProduto = rs.getString("nomeProduto");
                float valorUnitarioEstoque = rs.getFloat("valorUnitarioEstoque");
                int qtdEstoque = rs.getInt("qtdEstoque");
                String nomeFilial = rs.getString("nomeFilial");

                Cliente cliente = new Cliente(idCliente, nomeCliente, null);

                Produto produto = new Produto(idProduto, nomeProduto, valorUnitarioEstoque, qtdEstoque);

                Filial filial = new Filial(idFilial, nomeFilial);

                vendas.add(new Venda(idVenda, cliente, produto, filial, qtdVenda, valorUnitarioVenda));
            }
            stmt.close();
        } catch (SQLException ex) {
            System.out.println("Erro ao buscar vendas: " + ex.getMessage());
        }
        return vendas;
    }

    @Override
    public boolean efetuarVenda(Venda venda) {
        PreparedStatement stmt;

        try {
            stmt = conn.prepareStatement("INSERT INTO Venda (idVenda, idCliente, idProduto, idFilial, qtd, valorUnitario) VALUES (?, ?, ?, ?, ?, ?)");

            stmt.setInt(1, venda.getIdVenda());
            stmt.setInt(2, venda.getCliente().getIdCliente());
            stmt.setInt(3, venda.getProduto().getIdProduto());
            stmt.setInt(4, venda.getFilial().getIdFilial());
            stmt.setInt(5, venda.getQtd());
            stmt.setFloat(6, venda.getValorUnitario());

            stmt.executeUpdate();

            stmt.close();
        } catch (SQLException ex) {
            System.out.println("Erro ao efetuar venda: " + ex.getMessage());

            return false;
        }
        return true;
    }

}
