using service;
using service.Services;


namespace api.GraphQL.Types;

[GraphQLName("Mutation")]
public class MutationGql
{
    public CredentialsGql.ILoginResultGql Login(CredentialsGql input, [Service] AccountService accountService,
        [Service] JwtService jwtService)
    {
        var user = accountService.Authenticate(input.ToModel());
        if (user == null) return new CredentialsGql.InvalidCredentialsGql { Message = "Invalid credentials" };
        var session = SessionData.FromUser(user);
        var token = jwtService.IssueToken(session);
        return new CredentialsGql.TokenResultGql { Token = token };
    }
    
}