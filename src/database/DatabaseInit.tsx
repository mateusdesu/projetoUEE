import { DatabaseConnection } from "./DatabaseConnection";

var db:any = null;

export default class DatabaseInit{
    constructor(){
        db = DatabaseConnection.getConnection();
        db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
        console.log('Foreign keys turned on'));

        this.InitDb();
    }

    private InitDb(){
        var sql = '' //implement SQL query; 
        
        
        db.transaction((tr:any) => {tr.executeSql(sql)}, //in case of more than 1 query, execute inside a for lace
        (error: any) =>{
            console.log("error call back: "+ JSON.stringify(error));
        },
        () => {
            console.log("database was succesfully created!");
        }
        );        
    }
}