module.exports = (app, sql_builder) => {
    sql_builder(app, 'table', 'verb',
    ['verb_parameter','verb_entity']);
}