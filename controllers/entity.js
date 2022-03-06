module.exports = (app, sql_builder) => {
    sql_builder(app, 'table', 'entity', 
    sub_tables = [
        "verb_entities",
        {
            field: "child",
            table:"generalization"
        }
    ]);
}