package pdcbackend.dao.interfaces;

import java.sql.SQLException;
import java.util.List;
import pdcbackend.models.Venda;

public interface VendaDAO {

    public List<Venda> buscarTodas() throws SQLException;

    public void efetuarVenda(Venda venda) throws SQLException;
}
