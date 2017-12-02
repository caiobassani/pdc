package pdcbackend.dao.interfaces;

import java.util.List;
import pdcbackend.models.Cliente;

public interface ClienteDAO {

    public List<Cliente> buscarClientes();

    public List<Cliente> buscarClientes(String nome);

    public boolean cadastrarCliente(Cliente cliente);

    public boolean removerCliente(Integer idCliente);

    public boolean alterarCliente(Cliente cliente);
}
