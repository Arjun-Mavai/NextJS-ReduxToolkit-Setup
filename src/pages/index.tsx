import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

 import type { NextPage } from "next";
import { fetchData, increment, selectAuthState, setAuthState } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState, wrapper } from '@/store/store';
import { useEffect } from 'react';
import App from 'next/app';
   


const Home: NextPage = () => {
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch ();

   const { products, loading } = useSelector((state: AppState) => state.data);
   const { value } = useSelector((state:AppState)=>state.counter)

  useEffect(() => {

    console.log(`Dispatching action to fetch client side data`)
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  
   
  return (
    <div className='flex   gap-4 items-center flex-col h-screen mt-8'>
      <div className='border-2 p-4 rounded-md bg-gradient-to-r from-red-400 to bg-amber-400 bg-clip-text text-transparent text-4xl font-mono font-bold'>{authState ? " User Logged in" : "User Not Logged In "}
      <button className=' bg-pink-300 text-black py-2 px-4 rounded-md shadow-md'
        onClick={() =>
          authState
            ? dispatch(setAuthState(false))
            : dispatch(setAuthState(true))
        }
      >
        {authState ? "Logout" : "LogIn"}
      </button>

  <div>
    <h2>Counter State in redux toolkit</h2>
    Count : {value}
    <button onClick={()=>{dispatch(increment())}}  className='bg-green-400 text-black ml-4 p-2  rounded-md'>Count+1</button>
  </div>

      </div> 
<div >

  
  <h1 className='text-4xl font-bold'>Products Details : fetched through APIs</h1>
      <ul>
          <h1>Product Images</h1>
        {products.map((product:any) => (
          <div key={product.id}>
          <li key={product.id}>{product.title}-{product.price} </li>
        
        <div className='grid grid-cols-3 gap-4 rounded-full ml-8 '>
           
         {product.images.map((imgUrl, imgIndex) => (
            <Image
              key={imgIndex}
              src={imgUrl}
              alt={`Image ${imgIndex + 1}`}
              width={90} // Set appropriate width
              height={90} // Set appropriate height
              //  layout='responsive'
              style={{}}
            />
          ))}
    
        </div>
          </div>
        ))}
      </ul>
</div>

       
    </div>
  );
};



export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      // we can set the initial state from here
      // we are setting to false but you can run your custom logic here
      await store.dispatch(setAuthState(false)); 
       console.log("State on server", store.getState());
      return {
        props: {
          authState: false,
        },
      };
    }
);

export default Home;
