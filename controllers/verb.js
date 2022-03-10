module.exports = (app, sql_builder) => {
    sql_builder(app, 'table', 'verb',
    sub_tables = ['verb_parameter','verb_entity']);
}