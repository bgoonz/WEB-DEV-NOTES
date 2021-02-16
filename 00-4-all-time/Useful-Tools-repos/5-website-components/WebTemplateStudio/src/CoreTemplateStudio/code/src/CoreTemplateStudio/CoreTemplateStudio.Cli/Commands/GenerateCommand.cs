﻿// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
// See the LICENSE file in the project root for more information.

using System.Collections.Generic;
using CommandLine;
using Microsoft.Templates.Cli.Commands.Contracts;

namespace Microsoft.Templates.Cli.Commands
{
    [Verb("generate", HelpText = "Generate user selection.")]
    public class GenerateCommand : ICommand
    {
        [Option('d', "data", Required = true, HelpText = "Generation data in json format")]
        public IEnumerable<string> GenerationDataJson { get; set; }
    }
}
