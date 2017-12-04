package pdcbackend.dao.interfaces;

import java.sql.SQLException;
import java.util.List;
import pdcbackend.models.Cliente;

public interface ClienteDAO {

    public List<Cliente> buscarClientes() throws SQLException;

    public List<Cliente> buscarClientes(String nome) throws SQLException;

    public Cliente buscarCliente(String nome) throws SQLException;

    public void cadastrarCliente(Cliente cliente) throws SQLException;

    public void removerCliente(Integer idCliente) throws SQLException;

    public void alterarCliente(Cliente cliente) throws SQLException;
}
