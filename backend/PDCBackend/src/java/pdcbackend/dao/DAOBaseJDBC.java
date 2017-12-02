package pdcbackend.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import pdcbackend.config.DBConfig;

public class DAOBaseJDBC {

    protected static Connection conn;

    static {
        try {
            Class.forName(DBConfig.NOME_DRIVER);
            conn = DriverManager.getConnection(DBConfig.BD_URL, DBConfig.BD_LOGIN, DBConfig.BD_SENHA);
        } catch (ClassNotFoundException e) {
            System.out.println("Não foi possível encontrar o driver banco de dados.");

            System.exit(1);
        } catch (SQLException ex) {
            System.out.println("Não foi possível se conectar ao banco de dados.");

            System.exit(1);
        }
    }
}
