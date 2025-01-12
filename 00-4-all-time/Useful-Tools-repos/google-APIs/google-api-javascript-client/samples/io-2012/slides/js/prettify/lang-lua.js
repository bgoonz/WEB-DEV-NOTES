PR.registerLangHandler(
  PR.createSimpleLexer(
    [
      ["pln", /^[\t\n\r \xa0]+/, null, "\t\n\r �\xa0"],
      [
        "str",
        /^(?:"(?:[^"\\]|\\[\S\s])*(?:"|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$))/,
        null,
        "\"'",
      ],
    ],
    [
      ["com", /^--(?:\[(=*)\[[\S\s]*?(?:]\1]|$)|[^\n\r]*)/],
      ["str", /^\[(=*)\[[\S\s]*?(?:]\1]|$)/],
      [
        "kwd",
        /^(?:and|break|do|else|elseif|end|false|for|function|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,
        null,
      ],
      ["lit", /^[+-]?(?:0x[\da-f]+|(?:\.\d+|\d+(?:\.\d*)?)(?:e[+-]?\d+)?)/i],
      ["pln", /^[_a-z]\w*/i],
      ["pun", /^[^\w\t\n\r \xa0][^\w\t\n\r "'+=\xa0-]*/],
    ]
  ),
  ["lua"]
);
