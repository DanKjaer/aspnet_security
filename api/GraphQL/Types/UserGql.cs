using infrastructure.DataModels;

namespace api.GraphQL.Types;

[GraphQLName("User")]
public class UserGql
{
    public int Id { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string? AvatarUrl { get; set; }
    public bool IsAdmin { get; set; }

    public static UserGql FromModel(User model)
    {
        return new UserGql()
        {
            Email = model.Email,
            AvatarUrl = model.AvatarUrl,
            FullName = model.FullName,
            IsAdmin = model.IsAdmin,
            Id = model.Id,
        };
    }
}