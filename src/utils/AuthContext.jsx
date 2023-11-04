import { createContext, useEffect , useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwriteConfig";
import { ID } from "appwrite";


const AuthContext = createContext();

export const AuthProvider = ({children})=>{

    const navigate = useNavigate();    

    const [loading,setLoading] = useState(true);
    const [user,setUser] = useState(null);

    useEffect(()=>{
        getUSerOnLoad();
    },[])


    const getUSerOnLoad = async ()=>{
        try {
            
            const accountInfo = await account.get();
            setUser(accountInfo);
            setLoading(false);

        } catch (error) {
            console.warn(error);
        }
        setLoading(false);
    }

    const handleUserLogin = async (e,credentials)=>{
        e.preventDefault();
        try {

            const response = await account.createEmailSession(credentials.email, credentials.password);
            // console.log("Logged IN",response);
            const accountInfo = await account.get();
            setUser(accountInfo);

            navigate('/');

        } catch (error) {
            console.error(error);
        }
    }

    const handleUserSignUp = async (e,credentials)=>{
        e.preventDefault();
        if(credentials.password !== credentials.password2){
            alert("Passwords do not match");
            return;
        }else{
        try {

            const response = await account.create(ID.unique(),credentials.email, credentials.password, credentials.name);
            // console.log("Signed Up",response);


            await account.createEmailSession(credentials.email, credentials.password);
            const accountInfo = await account.get();
            setUser(accountInfo);

            navigate('/');

        } catch (error) {
            console.error(error);
        }
    }
}

    const handleUserLogOut = async () =>{
        try {
            
            await account.deleteSession('current');
            setUser(null);
            setLoading(false);
            // navigate('/login');

        } catch (error) {
            console.error(error);
        }
    }

    const contextData = {
        user,
        handleUserLogin,
        handleUserSignUp,
        handleUserLogOut
    }
    
    return(
        <AuthContext.Provider value={contextData}>
            {loading? <h1>Loading...</h1> : children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=> {
    return useContext(AuthContext);
};

export default AuthContext;