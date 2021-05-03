const BaseURL = "http://localhost:5000"

const Constants = {
    authToken : "authToken",
    data: "data"
}

const Paths = {
    auth : "/auth",
    home : "/"
}

const EndPoints = {
    USER_REGISTER : "/user/register", 
    USER_LOGIN : "/user/login",
    LANDS : "/lands",
    LAND:"/land"
}

const isAuthenticated = (localStorage.getItem(Constants.authToken) != null) 

export {BaseURL , Constants , EndPoints , Paths , isAuthenticated}