-using HotChocolate.AspNetCore;
using HotChocolate.Execution;

namespace api.GraphQL;

public class HttpRequestInterceptor : DefaultHttpRequestInterceptor
{
    public override ValueTask OnCreateAsync(HttpContext context, IRequestExecutor requestExecutor, IQueryRequestBuilder requestBuilder,
        CancellationToken cancellationToken)
    {
        var session = context.GetSessionData();
        requestBuilder.SetGlobalState(GlobalStateKeyss.Session, session);
        return base.OnCreateAsync(context, requestExecutor, requestBuilder, cancellationToken);
    }