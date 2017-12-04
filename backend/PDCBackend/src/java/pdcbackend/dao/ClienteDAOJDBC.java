package pdcbackend.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import pdcbackend.dao.interfaces.ClienteDAO;
import pdcbackend.models.Cliente;
import pdcbackend.models.Filial;

public class ClienteDAOJDBC extends DAOBaseJDBC implements ClienteDAO {

    public ClienteDAOJDBC() {
    }

    @Override
    public List<Cliente> buscarClientes() {
        PreparedStatement stmt;
        ResultSet rs;
        List<Cliente> clientes = new ArrayList();

        try {
            stmt = conn.prepareStatement("SELECT c.idCliente,c.nome AS nomeCliente,f.idFilial,f.nome AS nomeFilial FROM Cliente c INNER JOIN FILIAL f ON c.idFilial = f.idFilial");
            rs = stmt.executeQuery();

            while (rs.next()) {
                Integer idCliente = rs.getInt("idCliente");
                String nomeCliente = rs.getString("nomeCliente");
                Integer idFilial = rs.getInt("idFilial");
                String nomeFilial = rs.getString("nomeFilial");

                Filial filial = new Filial(idFilial, nomeFilial);

                clientes.add(new Cliente(idCliente, nomeCliente, filial));
            }
            stmt.close();
        } catch (SQLException ex) {
            System.out.println("Erro ao buscar clientes: " + ex.getMessage());
        }
        return clientes;
    }

    @Override
    public List<Cliente> buscarClientes(String nome) {
        PreparedStatement stmt;
        ResultSet rs;
        List<Cliente> clientes = new ArrayList();

        try {
            stmt = conn.prepareStatement("SELECT c.idCliente,c.nome AS nomeCliente,f.idFilial,f.nome AS nomeFilial FROM Cliente c INNER JOIN FILIAL f ON c.idFilial = f.idFilial WHERE c.nome LIKE ? ");
            stmt.setString(1, nome + "%");
            rs = stmt.executeQuery();

            while (rs.next()) {
                Integer idCliente = rs.getInt("idCliente");
                String nomeCliente = rs.getString("nomeCliente");
                Integer idFilial = rs.getInt("idFilial");
                String nomeFilial = rs.getString("nomeFilial");

                Filial filial = new Filial(idFilial, nomeFilial);

                clientes.add(new Cliente(idCliente, nomeCliente, filial));
            }
            stmt.close();
        } catch (SQLException ex) {
            System.out.println("Erro ao buscar clientes: " + ex.getMessage());
        }
        return clientes;
    }

    @Override
    public Cliente buscarCliente(String nome) {
        PreparedStatement stmt;
        ResultSet rs;
        Cliente cliente = null;

        try {
            stmt = conn.prepareStatement("SELECT c.idCliente,c.nome AS nomeCliente,f.idFilial,f.nome AS nomeFilial FROM Cliente c INNER JOIN FILIAL f ON c.idFilial = f.idFilial WHERE c.nome = ?");
            stmt.setString(1, nome);
            rs = stmt.executeQuery();

            if (rs.next()) {
                Integer idCliente = rs.getInt("idCliente");
                String nomeCliente = rs.getString("nomeCliente");
                Integer idFilial = rs.getInt("idFilial");
                String nomeFilial = rs.getString("nomeFilial");

                Filial filial = new Filial(idFilial, nomeFilial);

                cliente = new Cliente(idCliente, nomeCliente, filial);
            }
            stmt.close();
        } catch (SQLException ex) {
            System.out.println("Erro ao buscar cliente: " + ex.getMessage());
        }
        return cliente;
    }
    
    @Override
    public boolean cadastrarCliente(Cliente cliente) {
        PreparedStatement stmt;
        try {
            stmt = conn.prepareStatement("INSERT INTO Cliente (nome,idFilial) VALUES (?,?) ");
            stmt.setString(1, cliente.getNome());
            stmt.setInt(2, cliente.getFilial().getIdFilial());

            stmt.executeUpdate();

            stmt.close();
        } catch (SQLException ex) {
            System.out.println("Erro ao cadastrar cliente: " + ex.getMessage());
            return false;
        }
        return true;
    }

    @Override
    public boolean removerCliente(Integer idCliente) {
        PreparedStatement stmt;
        try {
            stmt = conn.prepareStatement("DELETE FROM Cliente WHERE idCliente = ?");
            stmt.setInt(1, idCliente);

            stmt.executeUpdate();

            stmt.close();
        } catch (SQLException ex) {
            System.out.println("Erro ao remover cliente: " + ex.getMessage());

            return false;
        }
        return true;

    }

    @Override
    public boolean alterarCliente(Cliente cliente) {
        PreparedStatement stmt;
        try {
            stmt = conn.prepareStatement("UPDATE Cliente SET nome = ? WHERE idCliente = ?");
            stmt.setString(1, cliente.getNome());
            stmt.setInt(2, cliente.getIdCliente());

            stmt.executeUpdate();

            stmt.close();
        } catch (SQLException ex) {
            System.out.println("Erro ao cadastrar cliente: " + ex.getMessage());

            return false;
        }
        return true;
    }
}
