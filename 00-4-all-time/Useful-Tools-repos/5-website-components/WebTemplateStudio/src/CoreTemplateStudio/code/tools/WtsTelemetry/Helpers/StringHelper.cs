using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Linq;
using WtsTelemetry.Models;

namespace WtsTelemetry.Helpers
{
    public static class StringHelper
    {
        private static readonly Dictionary<string, string> displayNames = new Dictionary<string, string>
        {
            { "SplitView", "Navigation View" },
            { "TabbedPivot", "Tabbed / Pivot" },
            { "TabbedNav", "Horizontal Navigation View" },
            { "MVVMLight", "MVVM Light" },
            { "MVVMBasic", "MVVM Basic" },
            { "CaliburnMicro", "Caliburn.Micro" },
            { "NewProject", "New Project" },
            { "AddPage", "Add Page" },
            { "AddFeature", "Add Feature" },
            { "AddService", "Add Service" },
            { "AddTesting", "Add Testing" },
        };

        public static IEnumerable<QueryData> ToQueryData(this string jsonData)
        {
            var jobject = JObject.Parse(jsonData);

            return jobject["tables"][0]["rows"]
                .Children()
                .Select(c =>
                    new QueryData
                    {
                        Name = (string)c[0],
                        DisplayName = ((string)(c[0])).ToDisplayName(),
                        Value = (double)c[3]
                    });
        }

        private static string ToDisplayName(this string name)
        {
            if (displayNames.ContainsKey(name))
            {
                return displayNames[name];
            }

            return name;
        }
    }
}
