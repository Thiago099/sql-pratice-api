module.exports = (app, sql_builder) => {
    sql_builder(app, 'table', 'action', 
    [
        "action_parameter",
    ]);
}