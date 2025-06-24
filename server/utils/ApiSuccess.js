class ApiSuccess{
    constructor(statuscode,message,data){
        this.statuscode = statuscode;
        this.success = true;
        this.message = message;
        this.data = data;
    }
}

export default ApiSuccess;