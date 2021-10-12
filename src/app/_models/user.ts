export interface User {
    exp:Number;
    Data: {
        id: String;
        username: String;
        email: String;
        password: String;
        firstName: String;
        lastName: String;
        mobile:String,
        role: [{
            item_id: Number;
            item_text: String;
        }];
    }
    
    iat:Number;
}