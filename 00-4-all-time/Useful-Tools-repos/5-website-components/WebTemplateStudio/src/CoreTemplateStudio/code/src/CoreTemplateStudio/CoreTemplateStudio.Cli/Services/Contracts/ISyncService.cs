// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
// See the LICENSE file in the project root for more information.

using System;
using System.Threading.Tasks;
using Microsoft.Templates.Cli.Models;
using Microsoft.Templates.Core.Locations;

namespace Microsoft.Templates.Cli.Services.Contracts
{
    public interface ISyncService
    {
        Task<SyncModel> ProcessAsync(string path, string fullPath, string platform, string language);
    }
}
