﻿// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
// See the LICENSE file in the project root for more information.

using System.Threading.Tasks;

namespace Microsoft.Templates.Cli.Commands.Contracts
{
    public interface ICommandDispatcher
    {
        Task<int> DispatchAsync<T>(T command)
            where T : ICommand;
    }
}
