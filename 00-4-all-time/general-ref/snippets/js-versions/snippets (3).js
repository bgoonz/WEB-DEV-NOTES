{
	comment_block: {
		prefix: "comment_block",
		body: "/**\n *\n * ${1:Block comment}\n *\n */\n\n${0}",
		description: "Comment - Block comment",
		scope: ""
	},
	comment_todo: {
		prefix: "comment_todo",
		body: "/**\n\n\tTODO:\n\t- ${1:First todo item}\n\t- ${2:Second todo item}\n\n */\n\n",
		description: "Comment - Block with To-Do list",
		scope: ""
	},
	comment_line: {
		prefix: "comment_line",
		body: "/* ${1:Comment} */\n\n${0}",
		description: "Comment - Wrapped comment line"
	},
	comment_line_dash: {
		prefix: "comment_line_dash",
		body: "\n/*--------  ${1:Dash comment line}  --------*/\n${0}",
		description: "Comment - Dash wrapped comment line"
	},
	comment_line_star: {
		prefix: "comment_line_star",
		body: "\n/*********  ${1:Dash comment line}  **********/\n${0}",
		description: "Comment - Star wrapped comment line"
	},
	comment_section: {
		prefix: "comment_section",
		body: [ "",
				"/**================================================== *",
				" * ==========  ${1:Section comment block}  ========== *",
				" * ================================================== */",
				"\n$0\n",
				"/* =======  End of ${1:Section comment block}  ======= */"
		],
		description: "Comment - Section block comment (Both header and footer)"
	},
	comment_section_begin: {
		prefix: "comment_section_begin",
		body: [ "",
				"/**================================================== *",
				" * ==========  ${1:Section comment block}  ========== *",
				" * ================================================== */",
				"\n$0\n"
		],
		description: "Comment - Section block comment begin"
	},
	comment_section_end: {
		prefix: "comment_section_end",
		body: "\n/* =======  End of ${1:Section comment block}  ======= */\n\n",
		description: "Comment - Section block comment end"
	}
}
