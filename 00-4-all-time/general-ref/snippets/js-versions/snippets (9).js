{
	SEQUELIZE_HAS_ONE_MIXINS: {
		prefix: "sequelizeHasOne",
		body: [
			"// Has one ${1:Model}",
			"get${1:Model}: Sequelize.HasOneGetAssociationMixin<${2:TInstance}>;",
			"set${1:Model}: Sequelize.HasOneSetAssociationMixin<${2:TInstance}, ${4:TInstancePrimaryKey}>;",
			"create${1:Model}: Sequelize.HasOneCreateAssociationMixin<${3:TAttributes}>;"
		],
		description: "Sequelize hasOne mixins"
	},
	SEQUELIZE_HAS_MANY_MIXINS: {
		prefix: "sequelizeHasMany",
		body: [
			"// Has many ${1:Model}",
			"get${1:Model}s: Sequelize.HasManyGetAssociationsMixin<${2:TInstance}>;",
			"set${1:Model}s: Sequelize.HasManySetAssociationsMixin<${2:TInstance}, ${4:TInstancePrimaryKey}>;",
			"add${1:Model}s: Sequelize.HasManyAddAssociationsMixin<${2:TInstance}, ${4:TInstancePrimaryKey}>;",
			"add${1:Model}: Sequelize.HasManyAddAssociationMixin<${2:TInstance}, ${4:TInstancePrimaryKey}>;",
			"create${1:Model}: Sequelize.HasManyCreateAssociationMixin<${3:TAttributes}, ${2:TInstance}>;",
			"remove${1:Model}: Sequelize.HasManyRemoveAssociationMixin<${2:TInstance}, ${4:TInstancePrimaryKey}>;",
			"remove${1:Model}s: Sequelize.HasManyRemoveAssociationsMixin<${2:TInstance}, ${4:TInstancePrimaryKey}>;",
			"has${1:Model}: Sequelize.HasManyHasAssociationMixin<${2:TInstance}, ${4:TInstancePrimaryKey}>;",
			"has${1:Model}s: Sequelize.HasManyHasAssociationsMixin<${2:TInstance}, ${4:TInstancePrimaryKey}>;",
			"count${1:Model}s: Sequelize.HasManyCountAssociationsMixin;"
		],
		description: "Sequelize hasMany mixins"
	},
	SEQUELIZE_BELONGS_TO_MIXINS: {
		prefix: "sequelizeBelongsTo",
		body: [
			"// Belongs to ${1:Model}",
			"get${1:Model}: Sequelize.BelongsToGetAssociationMixin<${2:TInstance}>;",
			"set${1:Model}: Sequelize.BelongsToSetAssociationMixin<${2:TInstance}, ${4:TInstancePrimaryKey}>;",
			"create${1:Model}: Sequelize.BelongsToCreateAssociationMixin<${3:TAttributes}>;"
		],
		description: "Sequelize belongsTo mixins"
	},
	SEQUELIZE_BELONGS_TO_MANY_MIXINS: {
		prefix: "sequelizeBelongsToMany",
		body: [
			"// Belongs to many ${1:Model}",
			"get${1:Model}s: Sequelize.BelongsToManyGetAssociationsMixin<${2:TInstance}>;",
			"set${1:Model}: Sequelize.BelongsToManySetAssociationsMixin<${2:TInstance}, ${4:TInstancePrimaryKey}, ${5:TJoinTableAttributes}>;",
			"add${1:Model}s: Sequelize.BelongsToManyAddAssociationsMixin<${2:TInstance}, ${4:TInstancePrimaryKey}, ${5:TJoinTableAttributes}>;",
			"add${1:Model}: Sequelize.BelongsToManyAddAssociationMixin<${2:TInstance}, ${4:TInstancePrimaryKey}, ${5:TJoinTableAttributes}>;",
			"create${1:Model}: Sequelize.BelongsToManyCreateAssociationMixin<${3:TAttributes}, ${2:TInstance}, ${5:TJoinTableAttributes}>;",
			"remove${1:Model}: Sequelize.BelongsToManyRemoveAssociationMixin<${2:TInstance}, ${4:TInstancePrimaryKey}>;",
			"remove${1:Model}s: Sequelize.BelongsToManyRemoveAssociationsMixin<${2:TInstance}, ${4:TInstancePrimaryKey}>;",
			"has${1:Model}: Sequelize.BelongsToManyHasAssociationMixin<${2:TInstance}, ${4:TInstancePrimaryKey}>;",
			"has${1:Model}s: Sequelize.BelongsToManyHasAssociationsMixin<${2:TInstance}, ${4:TInstancePrimaryKey}>;",
			"count${1:Model}: Sequelize.BelongsToManyCountAssociationsMixin;"
		],
		description: "Sequelize belongsToMany mixins"
	},
	SEQUELIZE_MODEL: {
		prefix: "sequelizeModel",
		body: [
			"interface ${1:Model}Attributes {",
			"\t// TODO: Add model attributes",
			"\t$0",
			"}",
			"",
			"interface ${1:Model}Instance extends ${2:Sequelize}.Instance<${1:Model}Attributes>, ${1:Model}Attributes {",
			"\t// TODO: Add instance methods",
			"}",
			"",
			"const ${1:Model}: Sequelize.Model<${1:Model}Instance, ${1:Model}Attributes> = ${3:sequelize}.define(\"${4:model}\", {",
			"\t// TODO: Add model definition",
			"});"
		],
		description: "Create a Sequelize model"
	}
}
