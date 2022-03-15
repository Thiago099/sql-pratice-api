"use strict";
module.exports = (app, sql_builder) => {
    sql_builder(app, 'table', 'entity', [
        "verb_entity",
        {
            field: "child",
            table: "generalization",
        }
    ]);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL2VudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUUsRUFBRTtJQUNsQyxXQUFXLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQ2xDO1FBQ1EsYUFBYTtRQUNiO1lBQ0ksS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsZ0JBQWdCO1NBQzFCO0tBQ0osQ0FDSixDQUFBO0FBQ0wsQ0FBQyxDQUFBIn0=