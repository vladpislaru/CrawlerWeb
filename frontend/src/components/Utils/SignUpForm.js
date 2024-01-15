import { useRef, useState, useContext, useEffect } from 'react'
import axios from '../../Utils/axios_main'
import Loading from "./Loading";
import LoginNav from "./../Navs/loginNav";
import AzureAwsGcp from "../../static/web_crawler_bg.jpg"
import AuthSession from "../../Utils/AuthSession";


const SignUpForm = (props) => {
    const nameRef = useRef();
    const errMsgRef = useRef();
    const {auth, setAuth} = useContext(AuthSession);
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [hasAgreed, setHasAgreed] = useState(false); 
    const [errMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    //=========REGEX TEST==========
    // const EMAIL_REGEX = /[\w._+-%]+@[\w.-]+\.[a-zA-Z]{2,3}/;
    // const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{5,20}$/;
    // const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[!#$%])(?=.*[a-z])(?=.*[0-9]).{7,20}$/;
    const REGEX_EXPR = {
      USERNAME: /^[a-zA-Z][a-zA-Z0-9-_]{5,20}/,
      PASSWORD: /^(?=.*[A-Z])(?=.*[!#$%])(?=.*[a-z])(?=.*[0-9]).{7,20}/
    }
  
    //La prima incarcare in DOM se face focus pe campul de nume
    useEffect(() => {
      setAuth({});
      nameRef.current.focus();
    }, []);
  
    //La modificarea uneia dintre valori se sterge mesajul de eroare
    useEffect(() => {
      setErrMsg('');
    }, [name, password, email, hasAgreed]);
  
    const handleSubmit= async (e)=> {
      e.preventDefault();
  
      //Verifcari standard ale campurilor
      if (email ==""){
        setErrMsg("Nu ati completat adresa de Email !")
        
        return
      }
  
      if(password ==""){
        setErrMsg("Nu ati completat adresa de Parola !")
        return
      }
  
      if(name ==""){
        setErrMsg("Nu ati completat Numele de utilizator !")
        return
      }
  
      if(hasAgreed !== true){
        setErrMsg("Nu ati acceptat termenii si conditiile !")
        return
      }
  
      if(password.length < 8){
        setErrMsg("Parola trebuie sa contina minim 8 caractere !");
        return
      }
  
      
      setIsLoading(true);
      try{
        const response = await axios.post('/register', 
          JSON.stringify({
            name: name,
            email: email,
            password: password
          }),
          {
            headers: {
              'Content-Type': 'application/json'
            },
            //withCredentials: true
          }
          
        )
  
        //const data = await response.json();
  
        console.log(response);
        
        setAuth({
          email, 
          name,
          password: password,
          id: response.data.id
        })
        setIsLoading(false);
        props.setPage(1);
        
      }catch (err){
        console.log(err)
        setIsLoading(false);
  
        if(!err?.response){
          console.log(err?.response)
          setErrMsg("SERVICIUL ESTE MOMENTAN INDISPONIBIL! ")
        }else if ( err.response?.status === 409){
          setErrMsg("Aceasta adresa de email este deja inregistrata !");
        }else {
         
          setErrMsg("A aparut o problema cu server-ul");
        }
      }
      
    }
  
    
    return (
      <>
        {isLoading ? <Loading/> : ""}
        <div className="appAside" >
            <img src={AzureAwsGcp}></img>
        </div>
        <div className="appForm">
            <LoginNav 
              onAutentificare= {() => props.setPage(1)}
              onInregistrare= {() => props.setPage(0)}
            />
            <div>
              <h3 className="errMsg">{(errMsg !== "" ) ?  errMsg : "" }</h3>
            </div>
            <div className="formCenter">
                <form onSubmit={(e) => handleSubmit(e)} className="formFields">
                <div className="formField">
                    <label className="formFieldLabel" htmlFor="name">
                    Nume
                    </label>
                    <input
                    type="text"
                    id="name"
                    autoComplete="off"
                    className="formFieldInput"
                    placeholder="Introduceti numele de utilizator"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value) }
                    ref={nameRef}
                    />
                </div>
                <div className="formField">
                    <label className="formFieldLabel" htmlFor="password">
                    Parola
                    </label>
                    <input
                    type="password"
                    id="password"
                    className="formFieldInput"
                    placeholder="Introduceti parola"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="formField">
                    <label className="formFieldLabel" htmlFor="email">
                    Adresa de email
                    </label>
                    <input
                    type="email"
                    id="email"
                    autoComplete="off"
                    className="formFieldInput"
                    placeholder="Introduceti email-ul"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
  
                <div className="formField">
                    <label className="formFieldCheckboxLabel">
                    <input
                        className="formFieldCheckbox"
                        type="checkbox"
                        name="hasAgreed"
                        value={hasAgreed}
                        onChange={(e) => setHasAgreed(e.target.checked)}
                    />{" "}
                    Sunt de acord cu {" "}
                    <a href="null" className="formFieldTermsLink">
                        termenii si conditiile
                    </a>
                    </label>
                </div>
  
                <div className="formField">
                    <button className="formFieldButton">Inregistrare</button>{" "}
                    <href  className="formFieldLink" onClick={() =>  props.setPage(1)}>
                      Sunt deja membru
                    </href>
                    
                </div>
                </form>
            </div>
        </div>
      </>
    );
    
  }

export default SignUpForm;
  