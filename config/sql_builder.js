module.exports = (app, type ,name, sub_tables = null) => {
    const connection = require('./mysql');
    switch(type)
    {
        case 'table':
            {
                async function sub_query_get(id){
                   let result = {}
                   if(sub_tables == null) 
                   {
                       return result
                   }
                   // loop trough all sub_tables
                   for(let i = 0; i < sub_tables.length; i++)
                   {
                       result[sub_tables[i]] = await new Promise((resolve, reject) =>{
                           connection.query(`SELECT * FROM ${sub_tables[i]} WHERE ${sub_tables[i]}.id_${name} = ?`,
                           [id],
                           (err, rows) => {
                               if(err) reject(err);
                               if(rows === undefined) resolve(null);
                               rows.forEach(element => {
                                   delete element[`id_${name}`];
                               });
                               resolve(rows);
                               }
                           );
                       });
                   }
                   return result;
               }
               app.get(`/${name}/:id`,(req, res) => {
                   connection.query(
                       `SELECT * FROM ${name} WHERE id = ?`,
                       [req.params.id],
                       async (err, results) => {
                           if (err) {
                               res.send(err)
                               return;
                           }
                           // return message if results is empety
                           if (results.length === 0) {
                               res.status(404).send({
                                   message: `No ${name} with id ${req.params.id}`
                               })
                               return;
                           }
                           const sub_query = await sub_query_get(req.params.id)
                           res.json({...results[0], ...sub_query});
                       }
                   );
               });
               app.get(`/${name}`,  (req, res) => {
                   connection.query(`SELECT * FROM ${name}`, async (err, results) => {
                       if (err) {
                           res.send(err)
                           return;
                       }
                       // loop trough all result using for loop
                       for(let i = 0; i < results.length; i++)
                       {
                           const sub_query = await sub_query_get(results[i].id)
                           results[i] = {...results[i], ...sub_query};
                       }
                       res.json(results);
                   });
               });
               app.post(`/${name}/`,async (req, res) => {
                   let id = 0
                   data = JSON.parse(JSON.stringify(req.body))
                   
                   if(sub_tables != null)
                   {
                       for(let i = 0; i < sub_tables.length; i++)
                       {
                           delete data[sub_tables[i]];
                       }
                   }
                   
                   if(req.body.id == 0){
                       delete data.id
                       id = await new Promise((resolve, reject) =>{
                       connection.query(
                           `INSERT INTO ${name} SET ?`,
                           data,
                           (err, result) => {
                               if (err) {
                                   res.send(err)
                                   reject(err);
                                   return;
                               }
                               resolve(result.insertId);
                               res.send(result)
                           }
                       );
                   })
                   }else{
                       id = req.body.id
                       connection.query(
                           `UPDATE ${name} SET ? WHERE id = ?`,
                           [data, req.body.id],
                           (err, result) => {
                               if (err) {
                                   res.send(err)
                                   return;
                               }
                               res.send(result)
                           }
                       );
                   }
                   if(sub_tables == null)
                   {
                       return;
                   }
                   // loop trough all sub_tables
                   for(let i = 0; i < sub_tables.length; i++)
                   {
                       for(let j = 0; j < req.body[sub_tables[i]].length; j++)
                       {
                           let row = req.body[sub_tables[i]][j];
                           if(row.id == 0)
                           {
                               delete row.id
                               console.log(row)
                               row[`id_${name}`] = id;
                               connection.query(`INSERT INTO ${sub_tables[i]} SET ?`, row, (err, rows) => {
                                   if(err) throw err;
                               });
                           }
                           else
                           {
                               if(row.delete == true)
                               {
                                   connection.query(`DELETE FROM ${sub_tables[i]} WHERE id = ?`, row.id, (err, rows) => {
                                       if(err) throw err;
                                   });
                               }else{
                               row[`id_${name}`] = id;
                               connection.query(`UPDATE ${sub_tables[i]} SET ? WHERE id = ?`, [row, row.id], (err, rows) => {
                                   if(err) throw err;
                               })
                               }
                           }
                       }
                   }
               });
               //delete
               app.delete(`/${name}/:id`, (req, res) => {
                   sub_tables.forEach(element => {
                       connection.query(
                           `DELETE FROM ${element} WHERE id_${name} = ?`,
                           [req.params.id],
                           (err, result) => {
                               if (err) {
                                   res.send(err)
                                   return;
                               }
                           }
                       );
                   });
                   connection.query(
                       `DELETE FROM ${name} WHERE id = ?`,
                       [req.params.id],
                       (err, result) => {
                           if (err) {
                               res.send(err)
                               return;
                           }
                           res.send(result)
                       }
                   );
               });
            }
        break
        case 'query':{
            app.get(`/${name}`, (req, res) => {
                connection.query(sub_tables, (err, results) => {
                    if (err) {
                        res.send(err)
                        return;
                    }
                    res.json(results);
                });
            });
        }
        break;
    }
    
}