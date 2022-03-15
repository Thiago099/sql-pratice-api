module.exports = (app, sql_builder) => {
    sql_builder(app, 'table', 'entity', 
    [
            "verb_entity",
            {
                field: "child",
                table: "generalization",
            }
        ]
    )
}