package pdcbackend.dao;

import pdcbackend.dao.interfaces.FilialDAO;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import pdcbackend.models.Filial;

public class FilialDAOJDBC extends DAOBaseJDBC implements FilialDAO {

    @Override
    public List<Filial> buscarFiliais() {
        PreparedStatement stmt;
        ResultSet rs;
        List<Filial> filiais = new ArrayList();

        try {
            stmt = conn.prepareStatement("SELECT idFilial, nome FROM Filial ");
            rs = stmt.executeQuery();
            while (rs.next()) {
                Integer idFilial = rs.getInt("idFilial");
                String nomeFilial = rs.getString("nome");
                Filial filial = new Filial(idFilial, nomeFilial);
                filiais.add(filial);
            }
            stmt.close();
        } catch (SQLException ex) {
            System.out.println("Erro ao buscar filiais: " + ex.getMessage());
        }
        return filiais;

    }

}
