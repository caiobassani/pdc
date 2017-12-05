package pdcbackend.resources;

import java.sql.SQLException;
import java.util.List;
import javax.inject.Named;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import pdcbackend.dao.FilialDAOJDBC;
import pdcbackend.dao.interfaces.FilialDAO;
import pdcbackend.errors.ErrorMessages;
import pdcbackend.models.Filial;

@Named
@Produces({MediaType.APPLICATION_JSON})
@Consumes({MediaType.APPLICATION_JSON})
@Path("/filial")
public class FilialResource {

    private FilialDAO filialDAO = new FilialDAOJDBC();

    @GET
    @Path("/buscarFiliais")
    public List<Filial> buscarFiliais() {
        try {
            return filialDAO.buscarFiliais();
        } catch (SQLException ex) {
            throw ErrorMessages.getException(ErrorMessages.FILIAL_BUSCAR);
        }
    }
}
