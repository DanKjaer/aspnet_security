using service;

namespace api.GraphQL.Types;

[GraphQLName("Query")]
public class QueryGql
{
    public UserGql? GetMe([Service] UserService service, [GlobalState(GlobalStateKeyss.Session)] SessionData? session)
    {
        if (session == null) return null;
        var user = service.GetById(session.UserId);
        if(user == null) return null;
        return UserGql.FromModel(user);
    }

    public IEnumerable<PostGql> GetPosts([Service] PostService service)
    {
        return service.GetAll().Select(PostGql.FromModel);
    }