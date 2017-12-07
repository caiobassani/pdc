package pdcbackend.config;

import javax.inject.Named;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Named
@Path("/")
public class OptionsResource {
    @OPTIONS
    @Path("/status")
    public Response iAmOnline() {
        return Response.noContent().build();
    }
}
