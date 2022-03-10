module.exports = (app, sql_builder) => {
    sql_builder(app, 'table', 'entity', 
    sub_tables = [
        "verb_entity",
        {
            field: "child",
            table:"generalization"
        }
    ]
    )
}