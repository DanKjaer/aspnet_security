namespace api.GraphQL.Types;

[GraphQLName("Post")]
public class PostGql
{
    public int Id { get; set; }
    public int? AuthorId { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }


    [GraphQLIgnore]
    public static PostGql FromModel(Post model)
    {
        return new PostGql()
        {
            Id = model.Id,
            Content = model.Content,
            Title = model.Title,
            AuthorId = model.AuthorId
        };
    }
}