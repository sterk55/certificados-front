import Cookies from "js-cookie";

export default{

    setUserNameLogged(user){
        Cookies.set("userNameLogged", JSON.stringify(user));
    },
    getUserNameLogged(){
        if(Cookies.get("userNameLogged") == undefined){
            return "No existe"
        }else{
        return JSON.parse(Cookies.get("userNameLogged"))
    }
    },
    deleteUserNameLogged(){
        Cookies.remove("userNameLogged")
    },
    getUserNameLoggedSN(){
        return Cookies.get("userNameLogged")
    }

}