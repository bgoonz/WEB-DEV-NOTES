﻿// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
// See the LICENSE file in the project root for more information.

using System.Collections.Generic;
using Microsoft.Templates.Cli.Models;

namespace Microsoft.Templates.Cli.Services.Contracts
{
    public interface IMessageService
    {
        void SendMessage(string message);

        void SendError(string error);

        void SendErrors(IEnumerable<string> errors);

        void SendResult<T>(MessageType type, T item);
    }
}
