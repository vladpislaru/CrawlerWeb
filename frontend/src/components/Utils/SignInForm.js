import { useRef, useState, useContext, useEffect } from 'react'
import axios from '../../Utils/axios_main'
import Loading from "./Loading";
import LoginNav from "./../Navs/loginNav";
import AzureAwsGcp from "../../static/web_crawler_bg.jpg"
import AuthSession from "../../Utils/AuthSession";

const SignInForm = (props) => {

    const {setAuth} = useContext(AuthSession);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const emailRef = useRef();
    const [isLoading, setIsLoading]= useState(false);
    //Numele algoritmul de criptare este pastrat variabila de mediu pentru a nu fi vizibila pentru utilizatori
    //const criptare  = require(process.env.REACT_APP_CRYPTING);
  
    useEffect(() => {
      setAuth({});
      emailRef.current.focus();
    }, [])
  
    useEffect(() => {
      setErrMsg("");
    },[email, password]);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (email ==""){
        setErrMsg( "Nu ati completat adresa de email !")
        return
      }
  
      if(password ==""){
        setErrMsg( "Nu ati completat campul parola !")
        return
      }
  
        setIsLoading(true);
        await axios.post('/login',
          JSON.stringify({
            email: email,
            password: password
          }),
          {
            headers: {
              'Content-Type': 'application/json'
            },
            //withCredentials: true
          }
        ).then(response => {
          console.log(response);
          setAuth({
            email,
            familyId: response.data.user.familyId,
            name: response.data.user.name, 
            password: password,
            id: response.data.user.id,
            token: response.data.token
          })
          setIsLoading(false);
          props.setPage(2);
        }).catch(err => {
          setIsLoading(false);
  
          if( !err?.response){
            setErrMsg("SERVICIUL ESTE MOMENTAN INDISPONIBIL! ")
          }else if(err.response?.status === 404){
            setErrMsg("Adresa de email sau parola sunt gresite");
          }else if(err.response?.status === 401){
            setErrMsg("Acces neautorizat!")
          }else{
            setErrMsg("A aparut o problema cu server-ul");
            console.log(err.response.status)
          } 
          console.log(err);
        })
  
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
                <h2 className="errMsg">{(errMsg != "" ) ?  errMsg : "" }</h2>
              </div>
              <div className="formCenter">
                  <form className="formFields" onSubmit={handleSubmit}>
                  <div className="formField">
                      <label className="formFieldLabel" htmlFor="email">
                      Adresa de email
                      </label>
                      <input
                      type="email"
                      id="email"
                      className="formFieldInput"
                      placeholder="Introduceti email-ul"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      ref={emailRef}
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
                      <button className="formFieldButton" type="submit">Autentificare</button>{" "}
                      <href  className="formFieldLink" onClick={() =>  props.setPage(0)}>
                        Creazati cont
                      </href>
                  </div>
  
                  
                  </form>
              </div>
          </div>
      </>
      );
  }

export default SignInForm;