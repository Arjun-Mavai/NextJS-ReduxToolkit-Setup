import { createSlice ,PayloadAction } from "@reduxjs/toolkit";

type InitialState ={
    isAuth:boolean,
    username:string,
    uid:string,
    isModerator:boolean,

}


const initialState = {
     
        isAuth : false,
        username :'',
        uid:"",
        isModerator:false
 

 
}  as InitialState


export const auth = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logOut:()=>{return initialState},
        logIn:(_ , action:PayloadAction<string>)=>{
          return {
            
                isAuth:true,
                username:action.payload ,
                uid:'ulijfkljdlf89',
                isModerator:true


            
          }  
        },
        toggleModerator:(state)=>{
            state.isModerator = !state.isModerator
        }

    }
})


  export const {logIn , logOut , toggleModerator}= auth.actions
  export default auth.reducer;

// _ or state both are the same because we are not gonna use the state here 