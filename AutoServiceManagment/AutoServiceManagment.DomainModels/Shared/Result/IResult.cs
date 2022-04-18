using System;
using System.Collections.Generic;
using System.Text;

namespace AutoServiceManagment.DomainModels.Shared.Result
{
    public interface IResult
    {
        bool Success { get; }
        string Message { get; }
    }
}
