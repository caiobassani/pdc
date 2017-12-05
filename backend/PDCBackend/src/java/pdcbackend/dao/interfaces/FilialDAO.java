package pdcbackend.dao.interfaces;

import java.sql.SQLException;
import java.util.List;
import pdcbackend.models.Filial;

public interface FilialDAO {

    public List<Filial> buscarFiliais() throws SQLException;

}
