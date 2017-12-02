package pdcbackend.dao.interfaces;

import java.util.List;
import pdcbackend.models.Venda;

public interface VendaDAO {

    public List<Venda> buscarTodas();

    public boolean efetuarVenda(Venda venda);
}
